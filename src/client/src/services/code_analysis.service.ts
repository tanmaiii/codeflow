import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class CodeAnalysisService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('code-analysis');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<ICodeAnalysis[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getByReposId(params: IGetAllQuery, reposId: string): Promise<PaginatedResponseAPIDto<ICodeAnalysis[]>> {
    const res = await this.client.get(`/repos/${reposId}`, { params });
    return res.data;
  }
}

export default new CodeAnalysisService() as CodeAnalysisService;
