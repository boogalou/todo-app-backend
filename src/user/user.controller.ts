import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from '../common/base.controller';
import { IUserController } from './types/user.controller.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { IUserService } from './types/user.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { HttpError } from '../errors/http-error';
import { IConfigService } from '../config/config.iterface';
import { ValidateMiddleware } from '../common/validate.middleware';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.UserService) private readonly userService: IUserService,
    @inject(TYPES.ConfigService) private readonly configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/registration',
        method: 'post',
        func: this.registration,
        middlewares:  [new ValidateMiddleware(UserRegistrationDto)],
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares:  [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: '/logout',
        method: 'post',
        func: this.logout,
        middlewares: [],
      },
      {
        path: '/activate/:link',
        method: 'get',
        func: this.activate,
        middlewares: [],
      },
      {
        path: '/refresh',
        method: 'get',
        func: this.refresh,
        middlewares: [],
      },
    ]);
  }

  public async registration(req: Request<{}, {}, UserRegistrationDto>, res: Response, next: NextFunction): Promise<void> {
    const {name, email, password} = req.body;
    const response = await this.userService.registration({ name, email, password });
    res.cookie('refreshToken', response?.tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    if (!response) {
      return next(new HttpError(401, 'Пользователь с таким email уже существует'));
    }

    this.send(res, 201, response);
  }

  public async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    const {email, password} = req.body;

    const loginData = await this.userService.login({email, password});
    res.cookie('refreshToken', loginData?.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
    console.log('login:', loginData);
    this.send(res, 200, loginData)
    if (!loginData) {
      return next(new HttpError(401, 'Пользователь с таким email не найден'));
    }
  }

  public async logout({ cookies }: Request<{}, {}>, res: Response, next: NextFunction) {
    const {refreshToken} = cookies;
    const  token = await this.userService.logout(refreshToken);
    console.log(token);
    res.clearCookie('refreshToken');
    return this.ok(res, 200);
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const {refreshToken} = req.cookies;
      const tokenData = await this.userService.refreshToken(refreshToken);
      if (!tokenData) {
        return null
      }
      res.cookie('refreshToken', tokenData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true
      });
      this.send(res, 200, tokenData);
    } catch (err) {
      console.log(err);
    }
  }

  public async activate(req: Request, res: Response, next: NextFunction) {
    try {
      const activateLink = req.params.link;
      const response = await this.userService.activate(activateLink);
      const redirectLink = this.configService.get('CLIENT_URL');
      res.redirect(redirectLink)
    } catch (err) {
      console.log(err);
    }
  }
}
