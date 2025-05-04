import { GroupController } from '@/controllers/group.controller';
import { CreateGroupDto } from '@/dtos/groups.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class GroupRoute implements Routes {
  public path = '/groups';
  public router = Router();
  public groupController = new GroupController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.groupController.getGroups);
    this.router.get(`${this.path}/pagination`, this.groupController.getGroupsWithPagination);
    this.router.get(`${this.path}/:id`, this.groupController.getGroupById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateGroupDto), this.groupController.createGroup);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateGroupDto), this.groupController.updateGroup);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.groupController.deleteGroup);
    this.router.delete(`${this.path}/:id/destroy`, AuthMiddleware, this.groupController.destroyGroup);
  }
}
