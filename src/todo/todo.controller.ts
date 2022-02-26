import { BaseController } from '../common/base.controller';
import { ITodoController } from './types/todo.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response, } from 'express';
import { ExceptionFilter } from '../errors/exception.filter';
import { TodoService } from './todo.service';
import { AuthGuard } from '../common/auth.guard';
import { CreateTodoDto } from './dto/todo.dto';

@injectable()
export class TodoController extends BaseController implements ITodoController {

  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.TodoService) private todoService: TodoService,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: ExceptionFilter,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/todos/newTodo',
        method: 'post',
        func: this.create,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/todos/delete/:id',
        method: 'delete',
        func: this.delete,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/todos/update',
        method: 'patch',
        func: this.update,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/todos/:id',
        method: 'get',
        func: this.getAll,
        middlewares: [new AuthGuard()],
      },
    ]);
  }

  async create(req: Request<{}, {}, CreateTodoDto>, res: Response, next: NextFunction): Promise<void> {
    try {
      const payload = req.body;
      if (!payload) {
        this.send(res, 401, `Непрдвиденный сбой`);
      }
      const newTodo = await this.todoService.create(payload);
      if (newTodo) {
        this.send(res, 201, newTodo);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const todoId = Object.values(req.params)[0]
      const response = await this.todoService.delete(todoId);
      this.send(res, 201, {response});
    } catch (err) {
      console.log(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {_id, completed} = req.body.payload;
      await this.todoService.update(_id, completed);
      this.send(res, 201, {message: 'ok'});
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      console.log(req.params);
      const userID = Object.values(req.params).join('');
      console.log(userID);
      const response = await this.todoService.findAll(userID);
      console.log(response);
      this.send(res, 200, response);
    } catch (err) {
      console.log(err);
    }
  }

}