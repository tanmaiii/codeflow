import { SECRET_KEY } from '@config';
import { DB } from '@database';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '@interfaces/auth.interface';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

const getAuthorization = (req: Request) => {
  const cookie = req.cookies['Authorization'];
  if (cookie) return cookie;

  const header = req.header('Authorization');
  if (header) return header.split('Bearer ')[1];

  return null;
};

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);

    if (Authorization) {
      const decodedToken: DataStoredInToken = verify(Authorization, SECRET_KEY) as DataStoredInToken;
      if (decodedToken === undefined) return next();
      const findUser = await DB.Users.findByPk(decodedToken.user.id);

      if (findUser) {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export const isAdmin = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);
    if (Authorization) {
      const decodedToken: DataStoredInToken = verify(Authorization, SECRET_KEY) as DataStoredInToken;
      if (decodedToken === undefined) return next();
      const findUser = await DB.Users.findByPk(decodedToken.user.id);

      if (findUser && findUser.role === 'admin') {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export const isUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = getAuthorization(req);
    if (Authorization) {
      const decodedToken: DataStoredInToken = verify(Authorization, SECRET_KEY) as DataStoredInToken;
      if (decodedToken === undefined) return next();
      const findUser = await DB.Users.findByPk(decodedToken.user.id);

      if (findUser && findUser.role === 'user') {
        req.user = findUser;
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};
