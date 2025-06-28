import { GeminiController } from '@/controllers/gemini.controller';
import { Routes } from '@/interfaces/routes.interface';
import { Router } from 'express';

export class GeminiRoute implements Routes {
  public path = '/gemini';
  public router = Router();
  public gemini = new GeminiController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/text`, this.gemini.generateText);
    this.router.post(`${this.path}/evaluate-code`, this.gemini.evaluateCode);
    this.router.get(`${this.path}/test`, this.gemini.testEvaluateCode);
  }
}
