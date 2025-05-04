import { RequestWithUser } from '@/interfaces/auth.interface';
import { Comment } from '@/interfaces/comments.interface';
import { Post, PostCreate } from '@/interfaces/posts.interface';
import { User } from '@/interfaces/users.interface';
import { CommentService } from '@/services/comment.service';
import { PostService } from '@/services/post.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class PostController {
  public post = Container.get(PostService);
  public comment = Container.get(CommentService);

  public getPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows }: { count: number; rows: Post[] } = await this.post.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
      );

      res.status(200).json({
        data: [...rows],
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const findOnePostData: Post = await this.post.findPostById(postId);
      res.status(200).json({ data: findOnePostData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createPost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postData: Partial<PostCreate> = req.body;
      const userData: User = req.user;

      const createCourseData: PostCreate = await this.post.createPost({
        ...postData,
        authorId: userData.id,
      });

      res.status(201).json({ data: createCourseData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updatePost = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const userData: User = req.user;
      const postData: Partial<PostCreate> = req.body;
      const updatePostData: Post = await this.post.updatePost(postId, {
        ...postData,
        authorId: userData.id,
      });
      res.status(200).json({ data: updatePostData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const deletePostData: Post = await this.post.deletePost(postId);
      res.status(200).json({ data: deletePostData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public destroyPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const postId = req.params.id;
      const destroyPostData: Post = await this.post.destroyPost(postId);
      res.status(200).json({ data: destroyPostData, message: 'destroyed' });
    } catch (error) {
      next(error);
    }
  };

  public getCommentsByPostId = async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = req.params.id;
        const findAllCommentsData: Comment[] = await this.comment.findCommentByPostId(id);
  
        res.status(200).json({ data: findAllCommentsData, message: 'findAll' });
      } catch (error) {
        next(error);
      }
    };
}
