import { NextFunction, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';

export const RoleMiddleware = (allowedRoles: string[]) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { role } = req.user;

      if (!allowedRoles.includes(role)) {
        next(new HttpException(403, 'You do not have permission to perform this action'));
      }

      next();
    } catch (error) {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  };
};

export const checkSimilarUser = () => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id: userId } = req.user;
      const { hostId } = req.body;

      if (userId !== hostId) {
        next(new HttpException(403, 'You can only create or modify your own house posts'));
      }

      next();
    } catch (error) {
      next(new HttpException(401, 'Authentication error'));
    }
  };
};
