import { CreateTodoDto } from '../dto/todo.dto';
import { ResponseTodo } from './response.todo.interface';

export interface ITodoService {

  create: (payload: CreateTodoDto) => Promise<ResponseTodo | null>
  delete: (payload: string) => Promise<unknown>
  update: (todoId: string, todoCompleted: boolean) => Promise<unknown>
  findAll: (userID: string) => Promise<ResponseTodo[]>

}