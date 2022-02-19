import { NextFunction, Response, Request } from "express";
import { IMiddleware } from "./middleware.interface";


export class AuthGuard implements IMiddleware {

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    } else {
      res.status(401).json({ message: `Вы не авторизовыны` })
    }
  }
}