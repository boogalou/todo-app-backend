import { UserEntity } from './user.entity';
import { IUserModel } from './user.model.interface';

export interface IUserRepo {
  create: (user: UserEntity) => Promise<IUserModel>
  find: (query: string) => Promise<IUserModel |null>
  findById: (id: string) => Promise<IUserModel |null>
}