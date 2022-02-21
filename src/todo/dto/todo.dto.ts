import { IUserModel } from '../../user/types/user.model.interface';

export class CreateTodoDto {
  readonly title: string;
  readonly completed: boolean;
  readonly userId: IUserModel;
  readonly createdAt: Date
  readonly id?: string;
}
