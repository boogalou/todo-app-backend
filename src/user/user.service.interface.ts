import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserEntity } from './user.entity';

export interface IUserService {
  registration: (dto: UserRegistrationDto) => Promise<{newUser: UserEntity, accessToken: string, refreshToken: string} | null> ;
  login: (dto: UserLoginDto) => Promise<boolean>;
  logout: () => Promise<boolean>;
  activate: (link: string) => Promise<boolean>;
  refresh: () => void;
}
