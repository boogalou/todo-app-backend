import { UserEntity } from '../../user/user.entity';
import { JwtPayload } from 'jsonwebtoken';
import { ITokenModel } from './token.model.interface';

export interface ITokenService {

  generateToken: (payload: UserEntity) => Tokens;
  saveToken: (userID: string, refreshToken: string) => void;
  removeToken: (refreshToken: string) => Promise<unknown>
  validateAccessToken: (token: string) => string | JwtPayload;
  validateRefreshToken: (token: string) => string | JwtPayload;
  findToken: (arg: string) => Promise<ITokenModel | null>
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}
