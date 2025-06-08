import { TopicController } from '@/controllers/topic.controller';
import { GetAllQueryDto } from '@/dtos/common.dto';
import { CreateTopicDto, CreateTopicEvaluationDto, GetTopicAllDto } from '@/dtos/topics.dto';
import { AuthMiddleware, isTeacherOrAdmin } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class TopicRoute implements Routes {
  public path = '/topics';
  public router = Router();
  public topic = new TopicController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, ValidationMiddleware(GetAllQueryDto, 'query'), this.topic.getTopics);
    this.router.get(`${this.path}/:courseId/course`, ValidationMiddleware(GetTopicAllDto, 'query'), this.topic.getTopicsByCourseId);
    this.router.get(`${this.path}/:userId/user`, ValidationMiddleware(GetTopicAllDto, 'query'), this.topic.getTopicsByUser);
    this.router.get(`${this.path}/:id`, this.topic.getTopicById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateTopicDto), this.topic.createTopic);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.topic.deleteTopic);
    this.router.delete(`${this.path}/:id/force`, AuthMiddleware, this.topic.destroyTopic);
    this.router.put(`${this.path}/:id/restore`, AuthMiddleware, this.topic.restoreTopic);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateTopicDto, 'body', true), this.topic.updateTopic);

    this.router.get(`${this.path}/:id/evaluations`, AuthMiddleware, this.topic.getTopicEvaluations);
    this.router.post(
      `${this.path}/:id/evaluations`,
      isTeacherOrAdmin,
      ValidationMiddleware(CreateTopicEvaluationDto, 'body'),
      this.topic.createTopicEvaluation,
    );
    this.router.put(
      `${this.path}/:id/evaluations/:evaluationId`,
      isTeacherOrAdmin,
      ValidationMiddleware(CreateTopicEvaluationDto, 'body'),
      this.topic.updateTopicEvaluation,
    );
    this.router.delete(`${this.path}/:id/evaluations/:evaluationId`, isTeacherOrAdmin, this.topic.deleteTopicEvaluation);
  }
}
