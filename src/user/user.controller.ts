import 'reflect-metadata';
import { inject, injectable } from 'inversify';
import { NextFunction, Request, Response } from 'express';

import { BaseController } from '../common/base.controller';
import { IUserController } from './user.controller.interface';
import { TYPES } from '../types';
import { ILogger } from '../logger/logger.interface';
import { UserRegistrationDto } from './dto/user-registration.dto';
import { IUserService } from './user.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { HttpError } from '../errors/http-error';

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private readonly loggerService: ILogger,
    @inject(TYPES.UserService) private readonly userService: IUserService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: '/registration',
        method: 'post',
        func: this.registration,
        middlewares: []
      },
      {
        path: '/login',
        method: 'post',
        func: this.login,
        middlewares: [],
      },
      {
        path: '/logout',
        method: 'post',
        func: this.logout,
        middlewares: [],
      },
      {
        path: '/activate/:link',
        method: 'post',
        func: this.activate,
        middlewares: [],
      },
    ]);
  }

  public async registration(req: Request<{}, {}, UserRegistrationDto>, res: Response, next: NextFunction): Promise<void> {
    const {name, email, password} = req.body;
    const user = await this.userService.registration({name, email, password});
    if (!user) {
      return next(new HttpError(401, 'Пользователь с таким email уже существует'))
    }
    this.send(res, 200, user);
  }

  public async login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    const {email, password} = req.body;
    const user = await this.userService.login({email, password});
    if (!user) {
      return next(new HttpError(401, 'Пользователь с таким email не найден'))
    }
  }

  public async logout() {
  }

  public async activate() {
  }

  public async refresh() {
  }
}