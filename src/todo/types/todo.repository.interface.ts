import { CreateTodoDto } from '../dto/todo.dto';
import { TodoEntity } from '../todo.entity';
import { ITodoModel } from './todo.model.interface';


export interface ITodoRepository {

  create: (payload: TodoEntity, userID: string) => Promise<ITodoModel>;
  find: (todoId: string) => Promise<unknown>
  findByIdAdnUp: (todoId: string, todoCompleted: boolean) => Promise<unknown>
  findAll: (userID: string) => Promise<CreateTodoDto[]>
}