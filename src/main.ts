import 'reflect-metadata';
import { App } from './App';
import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerService } from './logger/logger.service';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { ExceptionFilter } from './errors/exception.filter';
import { IUserController } from './user/user.controller.interface';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { IUserService } from './user/user.service.interface';
import { IConfigService } from './config/config.iterface';
import { ConfigService } from './config/config.service';
import { DatabaseService } from './Database/database.service';
import { IUserRepo } from './user/user.repository.interface';
import { UserRepo } from './user/user.repo';
import { TokenService } from './token/token.service';
import { ITokenService } from './token/token.service.inteface';
import { ITokenRepo } from './token/token.repo.interface';
import { TokenRepo } from './token/token.repo';
import { IEmailService } from './email/email.service.interface';
import { EmailService } from './email/email.service';

export const appBindingsContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
  bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
  bind<IUserController>(TYPES.UserController).to(UserController);
  bind<IUserService>(TYPES.UserService).to(UserService)
  bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
  bind<DatabaseService>(TYPES.DatabaseService).to(DatabaseService).inSingletonScope();
  bind<IUserRepo>(TYPES.UserRepo).to(UserRepo).inSingletonScope()
  bind<ITokenService>(TYPES.TokenService).to(TokenService).inSingletonScope()
  bind<ITokenRepo>(TYPES.TokenRepo).to(TokenRepo).inSingletonScope()
  bind<IEmailService>(TYPES.EmailService).to(EmailService).inSingletonScope()


  bind<App>(TYPES.Application).to(App);
});

export interface MainRturnType {
  appContainer: Container;
  app: App;
}

function main(): MainRturnType {
  const appContainer = new Container();
  appContainer.load(appBindingsContainer);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();

  return {appContainer, app};
}

export const { appContainer, app } = main();