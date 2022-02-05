import { IUserService } from './user.service.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { UserEntity } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.iterface';
import { IUserRepo } from './user.repository.interface';
import { ITokenService } from '../token/token.service.inteface';
import 'reflect-metadata';


@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepo) private userRepository: IUserRepo,
    @inject(TYPES.TokenService) private tokenService: ITokenService,
  ) {
  }

  async registration({name, email, password}: UserRegistrationDto): Promise<{ accessToken: string, refreshToken: string, user: UserEntity } | null> {
    const newUser = new UserEntity(name, email);
    debugger
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const existUser = await this.userRepository.find(email);
    debugger
    if (existUser) {
      return null;
    } else {
      const createdUser = await this.userRepository.create(newUser);
      const tokens = this.tokenService.generateToken(newUser);
      await this.tokenService.saveToken(createdUser.id, tokens.refreshToken);
      return {...tokens, user: newUser};
    }
  }

  async login({email, password}: UserLoginDto): Promise<{ accessToken: string, refreshToken: string, user: UserEntity } | null> {
    const user = await this.userRepository.find(email);
    if (!user) return null;

    const newUser = new UserEntity(user.email, user.name, user.password);
    const result = await newUser.comparePassword(password);
    if (!result) return null;

    const tokens = this.tokenService.generateToken(newUser);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {...tokens, user: newUser};
  }

  async logout(refreshToken: string): Promise<boolean> {
    const token = this.tokenService.removeToken(refreshToken);
    return token;
  }

  async activate(link: string): Promise<boolean> {
    return true;
  }

  async refresh(): Promise<void> {
  }
}
