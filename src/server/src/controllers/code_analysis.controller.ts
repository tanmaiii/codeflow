import { RequestWithUser } from '@/interfaces/auth.interface';
import { CodeAnalysisService } from '@/services/code_analysis.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class CodeAnalysisController {
  public codeAnalysisService = Container.get(CodeAnalysisService);

  private createPaginationResponse(count: number | string, page: number | string, limit: number | string) {
    return {
      totalItems: count,
      totalPages: Math.ceil(Number(count) / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit),
    };
  }

  public getCodeAnalyses = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.codeAnalysisService.findAndCountAllWithPagination(
        Number(page),
        Number(limit),
        String(sortBy ?? ''),
        String(order ?? 'DESC') as 'ASC' | 'DESC',
      );

      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findAll',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCodeAnalysisByRepoId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC' } = req.query;
      const { count, rows } = await this.codeAnalysisService.findByRepoId(
        Number(page),
        Number(limit),
        String(sortBy ?? ''),
        String(order ?? 'DESC') as 'ASC' | 'DESC',
        id,
      );
      res.status(200).json({
        data: rows,
        pagination: this.createPaginationResponse(count, Number(page), Number(limit)),
        message: 'findByRepoId',
      });
    } catch (error) {
      next(error);
    }
  };

  public getCodeAnalysisByRepoIdWithTimeFilter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { timeframe = '7d' } = req.query;

      const data = await this.codeAnalysisService.findByRepoIdWithTimeFilter(id, String(timeframe));

      res.status(200).json({
        data,
        message: 'findByRepoIdWithTimeFilter',
      });
    } catch (error) {
      next(error);
    }
  };

  //
}
