import { IMiddleware } from './middleware.interface';
import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      verify(token, this.secret, (err, payload) => {
        if (err) {
          console.error(err);
          next();
        } else if (payload) {
          const tokenData = decode(token) as { email: string };
          req.user = tokenData.email;
          next();
        }
      });
    } else {
      next();
    }
  }
}
