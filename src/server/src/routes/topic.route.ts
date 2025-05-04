import { TopicController } from '@/controllers/topic.controller';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class TopicRoute implements Routes {
  public path = '/topics';
  public router = Router();
  public course = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.course.getTopics);
    this.router.get(`${this.path}/:id`, this.course.getTopicById);
    this.router.post(`${this.path}`, AuthMiddleware, this.course.createTopic);
    this.router.put(`${this.path}/delete/:id`, AuthMiddleware, this.course.deleteTopic);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.course.destroyTopic);
    this.router.put(`${this.path}/:id`, AuthMiddleware, this.course.updateTopic);
  }
}
