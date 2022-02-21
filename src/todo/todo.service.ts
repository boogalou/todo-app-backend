import { CreateTodoDto } from './dto/todo.dto';
import { ITodoService } from './types/todo.service.interface';
import { inject, injectable } from 'inversify';
import { TodoEntity } from './todo.entity';
import { TYPES } from '../types';
import { ITodoRepository } from './types/todo.repository.interface';
import { ResponseTodo } from './types/response.todo.interface';


@injectable()
export class TodoService implements ITodoService {

  constructor(
    @inject(TYPES.TodoRepository) private todoRepository: ITodoRepository,
  ) {
  }

  async create(payload: CreateTodoDto): Promise<ResponseTodo | null> {
    console.log('service:', payload);
    if (!payload) return null;
    const todoEntity = new TodoEntity(payload.title, payload.completed, payload.userId);
    const newTodo = await this.todoRepository.create(todoEntity);

    return newTodo ;
  }

  delete(todoId: string): Promise<unknown> {
    console.log(todoId);

    const response = this.todoRepository.find(todoId);
    return response;
  }

  async update(todoId: string, todoCompleted: boolean): Promise<unknown> {
    console.log(todoId, todoCompleted);
    const response = await this.todoRepository.findByIdAdnUp(todoId, todoCompleted );
    return response;
  }


  async findAll(userID: string): Promise<ResponseTodo[]> {
    const response = await this.todoRepository.findAll(userID);
    return response;
  }


}
