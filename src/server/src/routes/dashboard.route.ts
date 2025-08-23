import { DashboardController } from '@/controllers/dashboard.controller';
import { GetCodeActivityDto } from '@/dtos/courses.dto';
import { Routes } from '@/interfaces/routes.interface';
import { isAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class DashboardRoute implements Routes {
  public path = '/dashboard';
  public router = Router();
  public dashboard = new DashboardController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/code-activity`, isAdmin, ValidationMiddleware(GetCodeActivityDto, 'query'), this.dashboard.getCodeActivity);
    this.router.get(`${this.path}/tags`, isAdmin, this.dashboard.getTags);
    this.router.get(`${this.path}/framework`, isAdmin, this.dashboard.getFramework); 
    this.router.get(`${this.path}/course-types`, isAdmin, this.dashboard.getCourseTypes); 
  }
}
