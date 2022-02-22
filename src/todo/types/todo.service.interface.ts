import { CreateTodoDto } from '../dto/todo.dto';
import { ResponseTodo } from './response.todo.interface';

export interface ITodoService {

  create: (payload: CreateTodoDto) => Promise<ResponseTodo | null>
  delete: (payload: string) => void
  update: (todoId: string, todoCompleted: boolean) => Promise<void>
  findAll: (userID: string) => Promise<ResponseTodo[]>

}