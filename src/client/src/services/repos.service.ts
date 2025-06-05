import { IGetAllQuery, PaginatedResponseAPIDto, ResponseAPIDto } from '@/interfaces/common';
import { IRepos, IReposCreateDto, IReposUpdateDto } from '@/interfaces/repos';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class ReposService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('repos');
  }

  public async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<IRepos[]>> {
    const res = await this.client.get('/', {
      params,
    });
    return res.data;
  }

  public async getByTopic(
    params: IGetAllQuery,
    topicId: string,
  ): Promise<PaginatedResponseAPIDto<IRepos[]>> {
    const res = await this.client.get(`/topic/${topicId}`, {
      params,
    });
    return res.data;
  }

  async create(data: IReposCreateDto): Promise<ResponseAPIDto<IRepos>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: IReposUpdateDto): Promise<ResponseAPIDto<IRepos>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<IRepos>> {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }

  async destroy(id: string): Promise<ResponseAPIDto<IRepos>> {
    const res = await this.client.delete(`/${id}/force`);
    return res.data;
  }
}

export default new ReposService() as ReposService;
