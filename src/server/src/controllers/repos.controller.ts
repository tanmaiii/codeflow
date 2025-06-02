import { CourseService } from '@/services/courses.service';
import { ReposService } from '@/services/repos.service';
import { TopicService } from '@/services/topic.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class ReposController {
  private readonly reposService: ReposService;

  constructor() {
    this.reposService = Container.get(ReposService);
  }

  public getRepos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.reposService.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
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

  public getByTopic = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search = '' } = req.query;
      const { count, rows } = await this.reposService.finAndCountByTopic(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search),
        id,
      );
      res.status(200).json({
        data: rows,
        pagination: {
          totalItems: count,
          totalPages: Math.ceil(count / Number(limit)),
          currentPage: Number(page),
          pageSize: Number(limit),
        },
      });
    } catch (error) {
      next(error);
    }
  };

  public getRepoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.findById(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public createRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.createRepo(req.body);
      res.status(201).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public updateRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.updateRepo(req.params.id, req.body);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public deleteRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.deleteRepo(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };

  public destroyRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.destroyRepo(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };
}
