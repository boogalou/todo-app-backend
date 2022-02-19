import { IUserService } from './types/user.service.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { inject, injectable } from 'inversify';
import { UserEntity } from './user.entity';
import { TYPES } from '../types';
import { IConfigService } from '../config/config.iterface';
import { IUserRepository } from './types/user.repository.interface';
import { ITokenService } from '../token/types/token.service.inteface';
import 'reflect-metadata';
import { HttpError } from '../errors/http-error';
import { JwtPayload } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { IEmailService } from '../email/email.service.interface';
import { IUserModel } from './types/user.model.interface';


@injectable()
export class UserService implements IUserService {

  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UserRepo) private userRepository: IUserRepository,
    @inject(TYPES.TokenService) private tokenService: ITokenService,
    @inject(TYPES.EmailService) private emailService: IEmailService,
  ) {
  }

  async registration({
                       name,
                       email,
                       password
                     }: UserRegistrationDto): Promise<{ tokens: Record<string, string>, user:  IUserModel } | null> {
    const newUser = new UserEntity(name, email);
    const salt = this.configService.get('SALT');
    await newUser.setPassword(password, Number(salt));
    const activateLink = v4();
    await this.emailService.sendMailForActivation(email, `${this.configService.get('API_URL')}api/activate/${activateLink}`)
    const existUser = await this.userRepository.find(email);
    debugger
    if (existUser) {
      return null;
    } else {
      const createdUser = await this.userRepository.create(newUser);

      const tokens = this.tokenService.generateToken(newUser);
      await this.tokenService.saveToken(createdUser.id, tokens.refreshToken);
      return {tokens, user: createdUser};
    }
  }

  async login({
                email,
                password
              }: UserLoginDto): Promise<{ accessToken: string, refreshToken: string, user: UserEntity } | null> {
    const user = await this.userRepository.find(email);
    if (!user) return null;

    const newUser = new UserEntity(user.email, user.name, user._id, user.password);
    const result = await newUser.comparePassword(password);
    if (!result) return null;

    const tokens = this.tokenService.generateToken(newUser);
    await this.tokenService.saveToken(user.id, tokens.refreshToken);

    return {...tokens, user: newUser};
  }

  async logout(refreshToken: string): Promise<unknown> {
    const token = this.tokenService.removeToken(refreshToken);
    return token;
  }

  async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string, user: UserEntity } | null> {
    if (!refreshToken) {
      throw new HttpError(401, 'Unauthorized');
    }

    const userData = this.tokenService.validateRefreshToken(refreshToken) as JwtPayload;
    const tokenFromDb = await this.tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw new HttpError(401, 'Unauthorized');
    }
    const user = await this.userRepository.find(userData.email);
    if (!user) {
      return null;
    }
    const newUser = new UserEntity(user.name, user.email, user.id);
    const tokens = this.tokenService.generateToken(newUser);
    await this.tokenService.saveToken(newUser.id!, tokens.refreshToken);
    console.log('userService response:' ,{...tokens, newUser});
    return {...tokens, user: newUser};
  }

  async activate(activateLink: string): Promise<void> {
    const user = await this.userRepository.findLink(activateLink);
    if (!user) {
      throw new HttpError(400, 'Error while trying to activate');
    }

    user.isActivated = true;
    await user.save();
  }
}
