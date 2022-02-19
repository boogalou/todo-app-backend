import { IUserRepository } from './types/user.repository.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { UserEntity } from './user.entity';
import UserModel from './user.model';
import { Model } from 'mongoose';
import { IUserModel } from './types/user.model.interface';
import { ITodoModel } from '../todo/types/todo.model.interface';
import TodoModel from '../todo/todo.model';

@injectable()
export class UserRepository implements IUserRepository {
  userModel: Model<IUserModel>


  constructor() {
    this.userModel = UserModel
  }

  async create({ name, email, password }: UserEntity): Promise<IUserModel> {
    const newUser = await this.userModel.create({
      name,
      email,
      password
    });
    return newUser;
  }

  async find(query: string): Promise<IUserModel | null> {
    const result = await this.userModel.findOne({ email: query } );
    return result;
  }

  async findLink(activateLink: string): Promise<IUserModel | null> {
    const response = await this.userModel.findOne({activateLink});
    return  response
  }

  async findById(id: string): Promise<IUserModel | null> {
    const result = await this.userModel.findById({id: id });
    return result;
  }
}