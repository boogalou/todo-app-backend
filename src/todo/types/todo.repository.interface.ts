import { CreateTodoDto } from '../dto/todo.dto';
import { TodoEntity } from '../todo.entity';
import { ResponseTodo } from './response.todo.interface';


export interface ITodoRepository {

  create: (payload: CreateTodoDto) => Promise<ResponseTodo>;
  find: (todoId: string) => Promise<unknown>
  findByIdAdnUp: (todoId: string, todoCompleted: boolean) => Promise<unknown>
  findAll: (userID: string) => Promise<ResponseTodo[]>
}