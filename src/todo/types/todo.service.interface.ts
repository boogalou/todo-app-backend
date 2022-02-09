import { CreateTodoDto } from '../dto/todo.dto';

export interface ITodoService {

  create: (payload: CreateTodoDto) => Promise<CreateTodoDto | null>
  delete: (payload: string) => Promise<unknown>
  update: (todoId: string, todoCompleted: boolean) => Promise<unknown>
  findAll: () => Promise<CreateTodoDto[]>

}