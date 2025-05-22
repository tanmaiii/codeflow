import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Comment } from '@interfaces/comments.interface';
import { CommentService } from '@services/comment.service';
import { RequestWithUser } from '@/interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { HttpException } from '@/exceptions/HttpException';

export class CommentController {
  public comment = Container.get(CommentService);

  public getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllCommentsData: Comment[] = await this.comment.findAllComment();

      res.status(200).json({ data: findAllCommentsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentId: string = req.params.id;
      const findOneCommentData: Comment = await this.comment.findCommentById(commentId);

      res.status(200).json({ data: findOneCommentData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createComment = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentData: Partial<Comment> = req.body;
      const userData: User = req.user;
      const createCommentData: Comment = await this.comment.createComment({
        ...commentData,
        authorId: userData.id,
      });

      res.status(201).json({ data: createCommentData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentId: string = req.params.id;
      const commentData: Comment = req.body;

      if (commentId === commentData.parentId) throw new HttpException(400, 'CommentId and ParentId are the same');

      const updateCommentData: Comment = await this.comment.updateComment(commentId, commentData);

      res.status(200).json({ data: updateCommentData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const commentId: string = req.params.id;
      const deleteCommentData: Comment = await this.comment.deleteComment(commentId);

      res.status(200).json({ data: deleteCommentData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
