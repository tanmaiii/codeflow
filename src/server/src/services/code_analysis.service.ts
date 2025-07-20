import { DB } from '@/database';
import { CodeAnalysis, CodeAnalysisCreate, CodeAnalysisMetrics } from '@/interfaces/code_analysis.interface';
import { Service } from 'typedi';

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
}

export default CodeAnalysisService;
