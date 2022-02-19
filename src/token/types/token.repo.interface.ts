import { ITokenModel } from './token.model.interface';

export interface ITokenRepo {
  create: (userID: string, refreshToken: string) => Promise<ITokenModel>
  findID: (arg: string) => Promise<ITokenModel | null> ;
  findToken: (refreshToken: string) => Promise<ITokenModel | null> ;
  removeToken: (refreshToken: string) => Promise<unknown>;
}