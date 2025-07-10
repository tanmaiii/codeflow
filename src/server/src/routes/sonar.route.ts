import { SonarController } from '@/controllers/sonar.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class SonarRoute implements Routes {
  public path = '/sonar';
  public router = Router();
  public sonar = new SonarController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.sonar.createProject);
  }
}
