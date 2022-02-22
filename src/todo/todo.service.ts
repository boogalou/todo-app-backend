import { CreateTodoDto } from './dto/todo.dto';
import { ITodoService } from './types/todo.service.interface';
import { inject, injectable } from 'inversify';
import { TodoEntity } from './todo.entity';
import { TYPES } from '../types';
import { ITodoRepository } from './types/todo.repository.interface';
import { ResponseTodo } from './types/response.todo.interface';
import { ITodoModel } from './types/todo.model.interface';


@injectable()
export class TodoService implements ITodoService {

  constructor(
    @inject(TYPES.TodoRepository) private todoRepository: ITodoRepository,
  ) {
  }

  async create(payload: CreateTodoDto): Promise<ResponseTodo | null> {
    if (!payload) return null;
    const todoEntity = new TodoEntity(payload.title, payload.completed, payload.userId);
    const newTodo = await this.todoRepository.create(todoEntity);

    return newTodo ;
  }

  delete(todoId: string): void {
    this.todoRepository.find(todoId);
  }

  async update(todoId: string, todoCompleted: boolean): Promise<void> {
     await this.todoRepository.findByIdAdnUp(todoId, todoCompleted);
  }


  async findAll(userID: string): Promise<ResponseTodo[]> {
    const response = await this.todoRepository.findAll(userID);
    return response;
  }


}
