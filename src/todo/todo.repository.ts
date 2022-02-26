import { ITodoRepository } from './types/todo.repository.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { CreateTodoDto } from './dto/todo.dto';
import { Model } from 'mongoose';
import { ITodoModel } from './types/todo.model.interface';
import TodoModel from './todo.model';
import { ResponseTodo } from './types/response.todo.interface';

@injectable()
export class TodoRepository implements ITodoRepository {
  todoModel: Model<ITodoModel>

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    ) {
    this.todoModel = TodoModel;

  }

  async create(payload: CreateTodoDto): Promise<ResponseTodo> {
    console.log('created paylad>>', payload);
    const newTodo = await this.todoModel.create({
      title: payload.title,
      completed: payload.completed,
      user: payload.userId,
      createdAt: Date.now()
    });
    return newTodo;
  }

  async find(todoId: string): Promise<void> {
   await this.todoModel.findByIdAndDelete({_id: todoId});
  }

  async findByIdAdnUp(todoId: string, todoCompleted: boolean): Promise<void> {
    await this.todoModel.findByIdAndUpdate(todoId, { completed: todoCompleted });
  }

  async findAll(userID: string): Promise<ResponseTodo[]> {
    const response = await this.todoModel.find({user: userID})
    return response;

  }
}