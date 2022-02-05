import { ITokenModel } from './token.model.interface';

export interface ITokenRepo {
  create: (userID: string, refreshToken: string) => Promise<ITokenModel & { _id: any; }>
  find: (userID: string) => Promise<ITokenModel | null> ;
  removeToken: (refreshToken: string) => Promise<boolean>;
}