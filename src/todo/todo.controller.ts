import { BaseController } from '../common/base.controller';
import { ITodoController } from './types/todo.controller.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { NextFunction, Request, Response, } from 'express';
import { ExceptionFilter } from '../errors/exception.filter';
import { CreateTodoDto } from './dto/todo.dto';
import { TodoService } from './todo.service';

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
        path: '/create',
        method: 'post',
        func: this.create,
        middlewares: [],
      },
      {
        path: '/delete/:id',
        method: 'delete',
        func: this.delete,
        middlewares: [],
      },
      {
        path: '/update/:id',
        method: 'patch',
        func: this.update,
        middlewares: [],
      },
      {
        path: '/todos/',
        method: 'get',
        func: this.getAll,
        middlewares: [],
      },
    ]);
  }

  async create(
    req: Request<{}, {}, CreateTodoDto>,
    res: Response,
    next: NextFunction): Promise<void> {
    try {
      const todoData = req.body;
      if (!todoData) {
        this.send(res, 401, `Непрдвиденный сбой`);
      }
      const newTodo = await this.todoService.create(todoData);
      this.send(res, 201, {...newTodo});
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
      const todoId = req.params.id as string;
      const todoCompleted = req.body.completed as boolean;
      const response = await this.todoService.update(todoId, todoCompleted)
      this.send(res, 201, {response});
    } catch (err) {
      console.log(err);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const response = await this.todoService.findAll();
      this.send(res, 201, {response});
    } catch (err) {
      console.log(err);
    }
  }

}