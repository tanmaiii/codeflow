import { GeminiController } from '@/controllers/gemini.controller';
import { CodeEvaluationDto } from '@/dtos/gemini.dto';
import { Routes } from '@/interfaces/routes.interface';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Router } from 'express';

export class GeminiRoute implements Routes {
  public path = '/gemini';
  public router = Router();
  public gemini = new GeminiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/text`, AuthMiddleware, this.gemini.generateText);
    this.router.post(`${this.path}/evaluate`, AuthMiddleware, ValidationMiddleware(CodeEvaluationDto), this.gemini.evaluateCode);
    this.router.post(`${this.path}/refresh-config`, AuthMiddleware, this.gemini.refreshConfig);
    this.router.get(`${this.path}/test`, AuthMiddleware, this.gemini.testEvaluateCode);
  }
}
