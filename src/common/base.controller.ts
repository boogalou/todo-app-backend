import { Response, Router } from 'express';
import { ILogger } from '../logger/logger.interface';
import { injectable } from 'inversify';
import { IControllerRoute } from './route.interface';

export { Router } from 'express';

@injectable()
export abstract class BaseController {
  private readonly _router: Router;

  constructor(private logger: ILogger) {
    this._router = Router();
  }


  get router(): Router {
    return this._router;
  }

  public send<T>(res: Response, code: number, message: T): Response {
    res.type('application/json');
    return res.status(200).json(message);
  }

  public ok<T>(res: Response, message: T): Response {
    return this.send<T>(res, 200, message);
  }

  public created(res: Response): Response {
    return res.sendStatus(201);
  }

  protected bindRoutes(routes: IControllerRoute[]): void {
    for (const route of routes) {
      const middleware = route.middlewares?.map((middleware) => middleware.fn.bind(middleware));
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}