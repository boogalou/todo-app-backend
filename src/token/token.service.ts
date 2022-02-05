import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ConfigService } from '../config/config.service';
import { TYPES } from '../types';
import { sign, } from 'jsonwebtoken';
import { ITokenService, Tokens } from './token.service.inteface';
import { UserEntity } from '../user/user.entity';
import { ITokenRepo } from './token.repo.interface';

@injectable()
export class TokenService implements ITokenService {

  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigService,
    @inject(TYPES.TokenRepo) private tokenRepo: ITokenRepo,
  ) {
  }

  generateToken({name, email, password}: UserEntity): Tokens {
    const accessToken = sign({name, email, password}, this.configService.get('JWT_ACCESS'));
    const refreshToken = sign({name, email}, this.configService.get('JWT_REFRESH'));
    return {accessToken, refreshToken};
  }

  async saveToken(userID: string, refreshToken: string) {
    const tokenData = await this.tokenRepo.find(userID);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    }
    const token = await this.tokenRepo.create(userID, refreshToken);
  }

  async removeToken(refreshToken: string): Promise<boolean> {
    const tokenData = await this.tokenRepo.removeToken(refreshToken);
    return tokenData
  }
}
