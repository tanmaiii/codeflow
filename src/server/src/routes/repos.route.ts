import { ReposController } from '@/controllers/repos.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { CreateRepoDto, UpdateRepoDto } from '@/dtos/repo.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class ReposRoute implements Routes {
  public path = '/repos';
  public router = Router();
  public repos = new ReposController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, AuthMiddleware, ValidationMiddleware(GetAllQueryDto, 'query'), this.repos.getRepos);
    this.router.get(`${this.path}/:id`, AuthMiddleware, this.repos.getRepoById);
    this.router.get(`${this.path}/topic/:id`, AuthMiddleware, this.repos.getByTopic);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateRepoDto, 'body'), this.repos.createRepo);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(UpdateRepoDto, 'body'), this.repos.updateRepo);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.repos.deleteRepo);
    this.router.delete(`${this.path}/:id/force`, AuthMiddleware, this.repos.destroyRepo);
  }
}
