import { UserEntity } from './user.entity';
import { IUserModel } from './user.model.interface';

export interface IUserRepo {
  create: (user: UserEntity) => Promise<IUserModel>
  find: (email: string) => Promise<IUserModel |null>
}