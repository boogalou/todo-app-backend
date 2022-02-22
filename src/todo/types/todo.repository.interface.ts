import { CreateTodoDto } from '../dto/todo.dto';
import { ResponseTodo } from './response.todo.interface';
import { Query } from 'mongoose';
import { ITodoModel } from './todo.model.interface';


export interface ITodoRepository {

  create: (payload: CreateTodoDto) => Promise<ResponseTodo | null>;
  find: (todoId: string) => Promise<void>
  findByIdAdnUp: (todoId: string, todoCompleted: boolean) => Promise<void>
  findAll: (userID: string) => Promise<ResponseTodo[]>
}