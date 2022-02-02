import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ConfigService } from '../config/config.service';
import { TYPES } from '../types';
import { sign, } from 'jsonwebtoken';
import { ITokenService, Tokens } from './token.service.inteface';
import { IUserRepo } from '../user/user.repository.interface';

@injectable()
export class TokenService implements ITokenService {

  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigService,
    @inject(TYPES.UserRepo) private userRepo: IUserRepo,
  ) {}

  generateToken (payload: Record<string, string>): Tokens {
    const accessToken = sign(payload, this.configService.get('JWT_ACCESS'));
    const refreshToken = sign(payload, this.configService.get('JWT_REFRESH'));

    return {accessToken, refreshToken};
  }

  async saveToken (email: string, refreshToken: string) {
    const tokenData = await this.userRepo.find(email);
    if (tokenData) {
      console.log(tokenData);
      // tokenData.refreshToken = refreshToken;
      return tokenData.save()
    }
  }
}
