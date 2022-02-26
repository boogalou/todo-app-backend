import express, { Express } from 'express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { ILogger } from './logger/logger.interface';
import { TYPES } from './types';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { UserController } from './user/user.controller';
import { DatabaseService } from './Database/database.service';
import { ConfigService } from './config/config.service';
import { AuthMiddleware } from './common/auth.middleware';
import { TodoController } from './todo/todo.controller';
import cors from 'cors';

@injectable()
export class App {
  public app: Express;
  public server: Server;
  public PORT: string | number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.ExceptionFilter) private exceptionFilter: IExceptionFilter,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ConfigService) private configService: ConfigService,
    @inject(TYPES.DatabaseService) private databaseService: DatabaseService,
    @inject(TYPES.TodoController) private todoController: TodoController,
    ) {

    this.app = express();
    this.PORT = this.configService.get('PORT');
  }

  useMiddleware(): void {
    this.app.use(cors({
      credentials: true,
      origin: 'https://todo-react-app-pied.vercel.app'
    }))
    this.app.use(json());
    this.app.use(cookieParser());
    const authMiddleware = new AuthMiddleware(this.configService.get('JWT_ACCESS'));
    this.app.use(authMiddleware.execute.bind(authMiddleware));
  }

  useRoutes(): void {
    this.app.use('/api', [
      this.userController.router,
      this.todoController.router
    ]);

  }

  useExceptionFilters(): void {
    this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter));
  }


  public async init(): Promise<void> {
    try {
      this.useMiddleware();
      this.useRoutes();
      this.useExceptionFilters();
      await this.databaseService.connect();
      this.server = this.app.listen(this.PORT, () =>
        this.logger.log(`server was started on http://localhost:${this.PORT}`),
      );
    } catch (err) {
      this.logger.error(err);
    }
  }

}