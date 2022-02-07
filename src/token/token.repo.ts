import { ITokenRepo } from './token.repo.interface';
import { injectable } from 'inversify';
import mongoose, { Model } from 'mongoose';
import TokenModel from './token.model';
import { ITokenModel } from './token.model.interface';

@injectable()
export class TokenRepo implements ITokenRepo {
  model: Model<ITokenModel>;

  constructor() {
    this.model = TokenModel;
  }

  async create(userID: string, refreshToken: string): Promise<ITokenModel> {
    const token = await this.model.create({userID, refreshToken});
    return token;
  }

  async findID(userID: string): Promise<ITokenModel | null> {
    const tokenData = await this.model.findOne({id: userID});
    return tokenData;
  }

  async findToken(token: string): Promise<ITokenModel | null> {
    const tokenData = await this.model.findOne({token});
    return tokenData;
  }

  async removeToken(refreshToken: string): Promise<unknown> {
    const tokenData = await this.model.deleteOne({refreshToken});
    return tokenData;
  }

}