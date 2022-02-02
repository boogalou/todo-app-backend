import { IUserService } from './user.service.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { UserEntity } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.iterface';
import { IUserRepo } from './user.repository.interface';
import { ITokenService, Tokens } from '../token/token.service.inteface';
import 'reflect-metadata'


@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepo) private userRepository: IUserRepo,
    @inject(TYPES.TokenService) private tokenService: ITokenService,
  ) {
  }

  async registration({name, email, password}: UserRegistrationDto):  Promise<{newUser: UserEntity, accessToken: string, refreshToken: string} | null> {
    const newUser = new UserEntity(email, name);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const existUser = await this.userRepository.find(email);
    if (existUser) return null;
    const createdUser = await this.userRepository.create(newUser);
    const tokens = this.tokenService.generateToken({name: createdUser.name, email: createdUser.email });
    await this.tokenService.saveToken(createdUser.email, tokens.refreshToken);

    console.log('tokens:', tokens, 'newUser:', newUser);

    return {...tokens, newUser, };
  }

  async login({email, password}: UserLoginDto): Promise<boolean> {
    console.log(email, password);
    const user = await this.userRepository.find(email);
    if (!user) {
      return false;
    } else {
      const loginUser = new UserEntity(user.email, user.name, user.password);
     const result = await loginUser.comparePassword(password)
    }

    return true;
  }

  async logout(): Promise<boolean> {
    return true;
  }

  async activate(link: string): Promise<boolean> {
    return true;
  }

  async refresh(): Promise<void> {
  }
}
