import { CreateTodoDto } from '../dto/todo.dto';
import { TodoResponse } from './todo.response.interface';


export interface ITodoRepository {

  create: (todoData: CreateTodoDto) => Promise<TodoResponse>;
  find: (todoId: string) => Promise<unknown>
  findByIdAdnUp: (todoId: string, todoCompleted: boolean) => Promise<unknown>
  findAll: () => Promise<CreateTodoDto[]>
}