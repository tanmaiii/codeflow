import { GetAllQueryDto } from '@/dtos/common.dto';
import { AuthMiddleware, isAdmin, isUserOrAdmin } from '@/middlewares/auth.middleware';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto, UpdateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { Router } from 'express';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidationMiddleware(GetAllQueryDto, 'query'), this.user.getUsers);
    this.router.get(`${this.path}/:id`, this.user.getUserById);
    this.router.post(`${this.path}`, isAdmin, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.put(`${this.path}/:id`, isUserOrAdmin, ValidationMiddleware(UpdateUserDto, 'body', true), this.user.updateUser);
    this.router.put(`${this.path}/:id/delete`, isAdmin, this.user.deleteUser);
    this.router.delete(`${this.path}/:id`, isAdmin, this.user.destroyUser);
  }
}
