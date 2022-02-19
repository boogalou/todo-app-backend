import { IsBoolean, IsEmpty, IsOptional } from 'class-validator';
import { IUserModel } from '../../user/types/user.model.interface';

export class CreateTodoDto {

  @IsOptional()
  readonly id?: string;

  @IsEmpty()
  readonly title: string;

  @IsBoolean()
  readonly completed: boolean;

  @IsEmpty()
  readonly user: IUserModel;

  @IsEmpty()
  readonly createdAt: Date

}
