import { RequestWithUser } from '@/interfaces/auth.interface';
import { CodeAnalysisService } from '@/services/code_analysis.service';
import { ReposService } from '@/services/repos.service';
import { NextFunction, Response } from 'express';
import { Container } from 'typedi';

export class CodeAnalysisController {
  public codeAnalysisService = Container.get(CodeAnalysisService);
  public reposService = Container.get(ReposService);

  private createPaginationResponse(count: number | string, page: number | string, limit: number | string) {
    return {
      totalItems: count,
      totalPages: Math.ceil(Number(count) / Number(limit)),
      currentPage: Number(page),
      pageSize: Number(limit),
    };
  }

  // Danh sách đánh giá code theo repos
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

  // Chi tiết đánh giá code
  public getCodeAnalysisByRepoId = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { page = 1, limit = 10, sortBy = 'created_at', order = 'DESC', authorId } = req.query;
      const { count, rows } = await this.codeAnalysisService.findByRepoIdOrAuthorId(
        Number(page),
        Number(limit),
        String(sortBy ?? ''),
        String(order ?? 'DESC') as 'ASC' | 'DESC',
        id,
        String(authorId ?? ''),
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

  // Lấy tất cả đánh giá code theo repos và thời gian
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

  // Lấy tất cả đánh giá code theo topic và thời gian
  public getCodeAnalysisByTopicIdWithTimeFilter = async (req: RequestWithUser, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { timeframe = '7d' } = req.query;

      const repos = await this.reposService.findByByTopicId(id);

      const codeAnalyses = [];

      for (const repo of repos) {
        const codeAnalysis = await this.codeAnalysisService.findByRepoIdWithTimeFilter(repo.id, String(timeframe));
        codeAnalyses.push(...codeAnalysis);
      }

      // Sắp xếp theo analyzedAt (mới nhất trước)
      codeAnalyses.sort((a, b) => new Date(b.analyzedAt).getTime() - new Date(a.analyzedAt).getTime());

      res.status(200).json({
        data: codeAnalyses,
        message: 'Get code analysis by topic id with time filter',
      });
    } catch (error) {
      next(error);
    }
  };
}
