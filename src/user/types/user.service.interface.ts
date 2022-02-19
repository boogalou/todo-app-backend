import { UserRegistrationDto } from '../dto/user-registration.dto';
import { UserLoginDto } from '../dto/user-login.dto';
import { UserEntity } from '../user.entity';
import { IUserModel } from './user.model.interface';

export interface IUserService {
  registration: (dto: UserRegistrationDto) => Promise<{ tokens: Record<string, string>, user: IUserModel} | null> ;
  login: (dto: UserLoginDto) => Promise<{ accessToken: string, refreshToken: string, user: UserEntity} | null> ;
  logout: (refreshToken: string) => Promise<unknown>;
  refreshToken: (token: string) => Promise<{accessToken: string; refreshToken: string, user: UserEntity} | null>;
  activate: (link: string) => Promise<void>;

}
