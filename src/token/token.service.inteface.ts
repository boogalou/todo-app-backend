import { UserEntity } from '../user/user.entity';

export interface ITokenService {

  generateToken: (payload: UserEntity) => Tokens;
  saveToken: (userID: string, refreshToken: string) => void;
  removeToken: (refreshToken: string) => Promise<boolean>
}

export type Tokens = {
  accessToken: string;
  refreshToken: string;
}
