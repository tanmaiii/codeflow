import { UploadController } from '@/controllers/upload.controller';
import UploadMiddleware from '@/middlewares/upload.middlewate';
import { Routes } from '@interfaces/routes.interface';
import { AuthMiddleware } from '@middlewares/auth.middleware';
import { Router } from 'express';

export class UploadRoute implements Routes {
  public router = Router();
  public upload = new UploadController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/upload', AuthMiddleware, UploadMiddleware, this.upload.upload);
  }
}
