import { UserService } from '@services/users.service';
import { CreateUserDto, CreateUserGithubDto, LoginUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { RequestWithUser } from '@interfaces/auth.interface';
import { User } from '@interfaces/users.interface';
import { AuthService } from '@services/auth.service';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { logger } from '@/utils/logger';

const decodeToken = async (token: string, secret: string) => {
  const bytes = CryptoJS.AES.decrypt(token, secret);
  const originalToken = bytes.toString(CryptoJS.enc.Utf8);
  return originalToken;
};

export class AuthController {
  public auth = Container.get(AuthService);
  public user = Container.get(UserService);

  public loginWithGithub = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { accessToken, uid, email }: CreateUserGithubDto = req.body;

      const resDecode = await decodeToken(accessToken, process.env.SECRET_KEY);

      const tokenRes = await axios.get('https://api.github.com/user', {
        headers: { Authorization: `Bearer ${resDecode}` },
      });

      logger.info(`[TOKEN GITHUB: ] ${resDecode}`);

      if (!tokenRes.data) {
        return new HttpException(401, 'Unauthorized');
      }

      const { tokenData, findUser } = await this.auth.loginWithGithub({ userBody: tokenRes.data, email, uid });

      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, accessToken: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: CreateUserDto = req.body;
      const signUpUserData: User = await this.auth.signup(userData);

      res.status(201).json({ data: signUpUserData, message: 'signup' });
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: LoginUserDto = req.body;
      const { tokenData, findUser } = await this.auth.login(userData);

      // res.setHeader('Set-Cookie', [cookie]);
      res.status(200).json({ data: findUser, accessToken: tokenData, message: 'login' });
    } catch (error) {
      next(error);
    }
  };

  public getInfoUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const findUserData: User = await this.user.findUserById(userData.id);

      res.status(200).json({ data: findUserData, message: 'get info user' });
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const userData: User = req.user;
      const logOutUserData: User = await this.auth.logout(userData);

      // res.setHeader('Set-Cookie', ['Authorization=; Max-age=0']);
      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}
