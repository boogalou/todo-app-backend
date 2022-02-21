import { ITodoRepository } from './types/todo.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { CreateTodoDto } from './dto/todo.dto';
import { Model } from 'mongoose';
import { ITodoModel } from './types/todo.model.interface';
import TodoModel from './todo.model';
import { ResponseTodo } from './types/response.todo.interface';
import { IUserModel } from '../user/types/user.model.interface';


@injectable()
export class TodoRepository implements ITodoRepository {
  todoModel: Model<ITodoModel>

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    ) {
    this.todoModel = TodoModel;

  }

  async create(payload: CreateTodoDto): Promise<ResponseTodo> {
    const newTodo = await this.todoModel.create({
      title: payload.title,
      completed: payload.completed,
      user: payload.userId,
      createdAt: Date.now()
    });
    console.log('todo.repository:', newTodo);
    return newTodo;
  }

  async find(todoId: string): Promise<unknown> {
    console.log(todoId);
    const response = this.todoModel.findByIdAndDelete({_id: todoId});
    console.log(response);
    return response
  }

  async findByIdAdnUp(todoId: string, todoCompleted: boolean): Promise<unknown> {
    const response = await this.todoModel.findByIdAndUpdate(todoId, { completed: todoCompleted });
    return response;
  }

  async findAll(userID: string): Promise<ResponseTodo[]> {
    const response = await this.todoModel.find({user: userID})
    return response;

  }
}