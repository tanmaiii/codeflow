import { TopicController } from '@/controllers/topic.controller';
import { CreateTopicDto, GetTopicByUserDto } from '@/dtos/topics.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';
import { GetAllQueryDto } from '@/dtos/common.dto';

export class TopicRoute implements Routes {
  public path = '/topics';
  public router = Router();
  public topic = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`,  ValidationMiddleware(GetAllQueryDto, 'query'), this.topic.getTopics);
    this.router.get(`${this.path}/:courseId/course`, ValidationMiddleware(GetAllQueryDto, 'query'), this.topic.getTopicsByCourseId);
    this.router.get(`${this.path}/:userId/user`, ValidationMiddleware(GetTopicByUserDto, 'query'), this.topic.getTopicsByUser);
    this.router.get(`${this.path}/:id`, this.topic.getTopicById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTopicDto), this.topic.createTopic);
    this.router.put(`${this.path}/delete/:id`, AuthMiddleware, this.topic.deleteTopic);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.topic.destroyTopic);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateTopicDto, 'body', true), this.topic.updateTopic);
  }
}
