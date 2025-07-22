import { DB } from '@/database';
import { CodeAnalysis, CodeAnalysisCreate, CodeAnalysisMetrics } from '@/interfaces/code_analysis.interface';
import { Service } from 'typedi';
import { Op } from 'sequelize';

@Service()
export class CodeAnalysisService {
  public async createCodeAnalysis(codeAnalysis: CodeAnalysisCreate): Promise<CodeAnalysis> {
    const newCodeAnalysis = await DB.CodeAnalysis.create(codeAnalysis);
    return newCodeAnalysis;
  }

  public async createCodeAnalysisMetrics(codeAnalysisMetrics: CodeAnalysisMetrics): Promise<CodeAnalysisMetrics> {
    const newCodeAnalysisMetrics = await DB.CodeAnalysisMetrics.create(codeAnalysisMetrics);
    return newCodeAnalysisMetrics;
  }

  public async findAll(): Promise<CodeAnalysis[]> {
    const codeAnalyses = await DB.CodeAnalysis.findAll();
    return codeAnalyses;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ count: number; rows: CodeAnalysis[] }> {
    return await DB.CodeAnalysis.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'codeAnalysis.id',
    });
  }

  public async findByRepoId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    repoId: string,
  ): Promise<{ count: number; rows: CodeAnalysis[] }> {
    const offset = (page - 1) * pageSize;

    return await DB.CodeAnalysis.findAndCountAll({
      where: { reposId: repoId },
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      distinct: true,
      col: 'codeAnalysis.id',
      offset,
    });
  }

  public async findByRepoIdWithTimeFilter(repoId: string, timeframe: string): Promise<CodeAnalysis[]> {
    // Tìm ngày đánh giá cuối cùng của repo này
    const latestAnalysis = await DB.CodeAnalysis.findOne({
      where: { reposId: repoId },
      order: [['analyzedAt', 'DESC']],
      attributes: ['analyzedAt'],
    });

    if (!latestAnalysis) {
      return [];
    }

    const latestDate = new Date(latestAnalysis.analyzedAt);
    let startDate = new Date(latestDate);

    // Tính toán thời gian bắt đầu dựa trên timeframe từ ngày đánh giá cuối cùng
    switch (timeframe) {
      case '7d':
        startDate.setDate(latestDate.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(latestDate.getDate() - 30);
        break;
      case '3m':
        startDate.setMonth(latestDate.getMonth() - 3);
        break;
      case '6m':
        startDate.setMonth(latestDate.getMonth() - 6);
        break;
      case '1y':
        startDate.setFullYear(latestDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(latestDate.getDate() - 7); // Mặc định là 7 ngày
    }

    return await DB.CodeAnalysis.findAll({
      where: {
        reposId: repoId,
        analyzedAt: {
          [Op.gte]: startDate,
          [Op.lte]: latestDate,
        },
      },
      order: [['analyzedAt', 'ASC']],
    });
  }
}

export default CodeAnalysisService;
