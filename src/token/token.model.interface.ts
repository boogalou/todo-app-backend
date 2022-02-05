import { IUserModel } from '../user/user.model.interface';
import { Document } from 'mongoose';

export interface ITokenModel extends Document {
  user: IUserModel | string;
  refreshToken: string;
}