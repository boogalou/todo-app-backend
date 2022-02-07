import { NextFunction, Request, Response } from 'express';

export interface IMiddleware {
  fn: (req: Request, res: Response, next: NextFunction) => void;
}
