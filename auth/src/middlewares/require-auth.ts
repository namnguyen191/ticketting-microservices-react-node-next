import { Request, Response, NextFunction } from 'express';
import { NotAuthorizeError } from '../errors/not-authorize-error';


export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // If the user is not login, throw NotAuthorizeError
  if (!req.currentUser) {
    throw new NotAuthorizeError();
  }

  next();
};
