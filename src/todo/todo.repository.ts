import { ITodoRepository } from './types/todo.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { CreateTodoDto } from './dto/todo.dto';
import { Model } from 'mongoose';
import { ITodoModel } from './types/todo.model.interface';
import TodoModel from './todo.model';
import { TodoResponse } from './types/todo.response.interface';


@injectable()
export class TodoRepository implements ITodoRepository {
  model: Model<ITodoModel>

  constructor(

    @inject(TYPES.ILogger) private logger: ILogger,
    ) {
    this.model = TodoModel;
  }

  async create({title, completed}: CreateTodoDto): Promise<TodoResponse> {
    console.log(title, completed);
    const newTodo = await this.model.create({ title, completed })
    return newTodo;
  }

  async find(todoId: string): Promise<unknown> {
    console.log(todoId);
    const response = this.model.findByIdAndDelete({_id: todoId});
    console.log(response);
    return response
  }

  async findByIdAdnUp(todoId: string, todoCompleted: boolean): Promise<unknown> {
    const response = await this.model.findByIdAndUpdate(todoId, { completed: todoCompleted });
    return response;
  }

  async findAll(): Promise<CreateTodoDto[]> {
    const response = await this.model.find()
    return response;

  }
}