import { ITokenRepo } from './token.repo.interface';
import { injectable } from 'inversify';
import { Model } from 'mongoose';
import TokenModel from './token.model';
import { ITokenModel } from './token.model.interface';

@injectable()
export class TokenRepo implements ITokenRepo {
  model: Model<ITokenModel>;

  constructor() {
    this.model = TokenModel;
  }

 async create(userID: string, refreshToken: string): Promise<ITokenModel & { _id: any; }> {
   const token = await this.model.create({userID, refreshToken});
   return token;
 }

  async find( userID: string): Promise<ITokenModel | null>   {
    const tokenData = await this.model.findOne({id: userID});
    return tokenData;
  }

  async removeToken(refreshToken: string): Promise<boolean> {
    const tokenData = await this.model.deleteOne({ refreshToken });
    return !!tokenData;
  }

}