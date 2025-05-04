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
      const allTopicsData: Topic[] = await this.topic.findAll();
      res.status(200).json({ data: allTopicsData, message: 'findAll' });
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
