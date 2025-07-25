import { RequestWithUser } from '@/interfaces/auth.interface';
import { ReposService } from '@/services/repos.service';
import { NextFunction, Request, Response } from 'express';
import Container from 'typedi';

export class ReposController {
  private readonly reposService: ReposService;

  constructor() {
    this.reposService = Container.get(ReposService);
  }

  public getRepos = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search } = req.query;
      const isAdmin = req.user?.role === 'admin';
      const { count, rows } = await this.reposService.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search ?? ''),
        isAdmin,
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

  public getByTopic = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const isAdmin = req.user?.role === 'admin';
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', search = '' } = req.query;
      const { count, rows } = await this.reposService.finAndCountByTopic(
        Number(page),
        Number(limit),
        String(sortBy),
        order as 'ASC' | 'DESC',
        String(search),
        id,
        isAdmin,
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

  public getRepoById = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const isAdmin = req.user?.role === 'admin';
      const repo = await this.reposService.findById(req.params.id, isAdmin);
      res.status(200).json({
        data: repo,
        message: 'Find repos by id',
      });
    } catch (error) {
      next(error);
    }
  };

  public createRepo = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.createRepo({ ...req.body, authorId: req.user.id });
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

  public restoreRepo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const repo = await this.reposService.restoreRepo(req.params.id);
      res.status(200).json(repo);
    } catch (error) {
      next(error);
    }
  };
}
