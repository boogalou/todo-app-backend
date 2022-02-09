import { CreateTodoDto } from './dto/todo.dto';
import { ITodoService } from './types/todo.service.interface';
import { inject, injectable } from 'inversify';
import { TodoEntity } from './todo.entity';
import { TYPES } from '../types';
import { ITodoRepository } from './types/todo.repository.interface';


@injectable()
export class TodoService implements ITodoService {

  constructor(
    @inject(TYPES.TodoRepository) private todoRepository: ITodoRepository,
  ) {
  }

  async create(payload: CreateTodoDto): Promise<CreateTodoDto | null> {
    if (!payload) return null;
    const todoEntity = new TodoEntity(payload.title, payload.completed);
    const newTodo = await this.todoRepository.create(todoEntity);
    return newTodo;
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


  async findAll(): Promise<CreateTodoDto[]> {
    const response = await this.todoRepository.findAll();
    return response;
  }


}