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
        path: '/todos/create/:id',
        method: 'post',
        func: this.create,
        middlewares: [new AuthGuard()],
      },
      {
        path: 'todos/delete/:id',
        method: 'delete',
        func: this.delete,
        middlewares: [new AuthGuard()],
      },
      {
        path: 'todos/update/:id',
        method: 'patch',
        func: this.update,
        middlewares: [new AuthGuard()],
      },
      {
        path: '/todos',
        method: 'get',
        func: this.getAll,
        middlewares: [new AuthGuard()],
      },
    ]);
  }

  async create(
    req: Request<{},{}, CreateTodoDto>,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const userID = Object.values(req.params).filter(String).join();
      console.log('controller', userID);
      const payload = req.body;
      if (!payload) {
        this.send(res, 401, `Непрдвиденный сбой`);
      }
      const newTodo = await this.todoService.create( payload, userID );
      if (newTodo) {
        this.send(res, 201, { newTodo });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const todoId = req.params.id as string;
      const response = await this.todoService.delete(todoId);
      this.send(res, 201, {response});
    } catch (err) {
      console.log(err);
    }
  }

  async update(req: Request, res: Response, next: NextFunction
  ): Promise<void> {
    try {
      const todoId = req.params.id;
      const todoCompleted = req.body.completed as boolean;
      const response = await this.todoService.update(todoId, todoCompleted);
      this.send(res, 201, {response});
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const userID = req.body.id;
      console.log('userID:', userID);
      const response = await this.todoService.findAll(userID);
      console.log(response);
      this.send(res, 200, {todos: response});
    } catch (err) {
      console.log(err);
    }
  }

}