import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { ConfigService } from '../config/config.service';
import { TYPES } from '../types';
import { JwtPayload, sign, verify } from 'jsonwebtoken';
import { ITokenService, Tokens } from './types/token.service.inteface';
import { UserEntity } from '../user/user.entity';
import { ITokenRepo } from './types/token.repo.interface';
import { ITokenModel } from './types/token.model.interface';


@injectable()
export class TokenService implements ITokenService {

  constructor(
    @inject(TYPES.ConfigService) private configService: ConfigService,
    @inject(TYPES.TokenRepo) private tokenRepo: ITokenRepo,
  ) {
  }

  async saveToken(userID: string, refreshToken: string) {
    const tokenData = await this.tokenRepo.findID(userID);
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save();
    }
    const token = await this.tokenRepo.create(userID, refreshToken);
  }

  async removeToken(refreshToken: string): Promise<unknown> {
    const tokenData = await this.tokenRepo.removeToken(refreshToken);
    return tokenData;
  }

  async findToken(refreshToken: string): Promise<ITokenModel | null> {
    const tokenData = await this.tokenRepo.findToken(refreshToken);
    return tokenData;
  }

  generateToken({name, email, password}: UserEntity): Tokens {
    const accessToken = sign({name, email, password}, this.configService.get('JWT_ACCESS'));
    const refreshToken = sign({name, email,}, this.configService.get('JWT_REFRESH'));
    return {accessToken, refreshToken};
  }

  validateAccessToken(token: string): string | JwtPayload {
    const tokenData = verify(token, this.configService.get('JWT_ACCESS'));
    return tokenData;
  }

  validateRefreshToken(token: string): string | JwtPayload {
    const tokenData = verify(token, this.configService.get('JWT_REFRESH'));
    return tokenData;
  }
}
