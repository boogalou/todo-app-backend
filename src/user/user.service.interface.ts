import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from './user.entity';

export interface IUserService {
  registration: (dto: UserRegistrationDto) => Promise<{ accessToken: string, refreshToken: string, user: UserEntity} | null> ;
  login: (dto: UserLoginDto) => Promise<{ accessToken: string, refreshToken: string, user: UserEntity} | null> ;
  logout: (refreshToken: string) => Promise<boolean>;
  activate: (link: string) => Promise<boolean>;
  refresh: () => void;
}
