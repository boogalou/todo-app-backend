import { IUserRepo } from './user.repository.interface';
import { injectable } from 'inversify';
import 'reflect-metadata';
import { UserEntity } from './user.entity';
import UserModel from './user.model';
import { Model } from 'mongoose';
import { IUserModel } from './user.model.interface';

@injectable()
export class UserRepo implements IUserRepo {
  model: Model<IUserModel>

  constructor() {
    this.model = UserModel
  }

  async create({name, email, password}: UserEntity): Promise<IUserModel> {
    const newUser = await this.model.create({
      name,
      email,
      password
    });
    return newUser;
  }

  async find(query: string): Promise<IUserModel | null> {
    const result = await this.model.findOne({ email: query } );
    return result;
  }

  async findLink(activateLink: string): Promise<IUserModel | null> {
    const response = await this.model.findOne({activateLink});
    return  response
  }

  async findById(id: string): Promise<IUserModel | null> {
    const result = await this.model.findById({id: id });
    return result;
  }
}