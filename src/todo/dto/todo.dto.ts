export class CreateTodoDto {
  readonly title: string;
  readonly completed: boolean;
  readonly userId: string;
  readonly createdAt: Date
  readonly id?: string;
}
