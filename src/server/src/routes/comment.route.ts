import { CommentController } from '@controllers/comment.controller';
import { CreateCommentDto } from '@dtos/comment.dto';
import { AuthMiddleware } from '@/middlewares/auth.middleware';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@interfaces/routes.interface';
import { Router } from 'express';

export class CommentRoute implements Routes {
  public path = '/comments';
  public router = Router();
  public comment = new CommentController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.comment.getComments);
    this.router.get(`${this.path}/:id`, this.comment.getCommentById);
    this.router.post(`${this.path}`, AuthMiddleware, ValidationMiddleware(CreateCommentDto), this.comment.createComment);
    this.router.delete(`${this.path}/:id`, AuthMiddleware, this.comment.deleteComment);
    this.router.put(`${this.path}/:id`, AuthMiddleware, ValidationMiddleware(CreateCommentDto,'body', true), this.comment.updateComment);
  }
}
