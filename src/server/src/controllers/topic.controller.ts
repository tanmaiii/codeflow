import { RequestWithUser } from '@/interfaces/auth.interface';
import { Topic, TopicCreate } from '@/interfaces/topics.interface';
import { User } from '@/interfaces/users.interface';
import { TopicService } from '@/services/topic.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class TopicController {
  public topic = Container.get(TopicService);

  public getTopics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', isCustom } = req.query;
      const { count, rows }: { count: number; rows: Topic[] } = await this.topic.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        undefined,
        isCustom !== undefined ? isCustom === 'true' : undefined,
      );

      res.status(200).json({
        data: rows,
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

  public getTopicsByCourseId = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courseId = req.params.courseId;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', isCustom } = req.query;
      const { count, rows }: { count: number; rows: Topic[] } = await this.topic.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        courseId,
        isCustom !== undefined ? isCustom === 'true' : undefined,
      );

      res.status(200).json({
        data: rows,
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

  public getTopicsByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = req.params.userId;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', status } = req.query;
      const { count, rows }: { count: number; rows: Topic[] } = await this.topic.findAndCountAllWithPaginationByUser(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        userId,
        status as string,
      );

      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
        message: 'find by user',
      });
    } catch (error) {
      next(error);
    }
  };
  public getTopicById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = req.params.id;
      const findOneTopicData: Topic = await this.topic.findTopicById(topicId);
      res.status(200).json({ data: findOneTopicData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTopic = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const topicData: Partial<TopicCreate> = req.body;
      const userData: User = req.user;

      const createTopicData: TopicCreate = await this.topic.createTopic({
        ...topicData,
        authorId: userData.id,
      });

      res.status(201).json({ data: createTopicData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTopic = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const topicId = req.params.id;
      const userData: User = req.user;
      const topicData: Partial<TopicCreate> = req.body;
      const updateTopicData: Topic = await this.topic.updateTopic(topicId, {
        ...topicData,
        authorId: userData.id,
      });
      res.status(200).json({ data: updateTopicData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = req.params.id;
      const deleteTopicData: Topic = await this.topic.deleteTopic(topicId);
      res.status(200).json({ data: deleteTopicData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };

  public destroyTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const topicId = req.params.id;
      const destroyTopicData: Topic = await this.topic.destroyTopic(topicId);
      res.status(200).json({ data: destroyTopicData, message: 'destroyed' });
    } catch (error) {
      next(error);
    }
  };
}
