import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';
import { IGetAllQuery, ResponseAPIDto, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ITopic, ITopicCreateDto } from '@/interfaces/topic';

class TopicService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('topics');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<ITopic[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getAllByCourseId(params: IGetAllQuery, courseId: string): Promise<PaginatedResponseAPIDto<ITopic[]>> {
    const res = await this.client.get(`/${courseId}/course`, { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }

  async create(data: ITopicCreateDto): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: ITopicCreateDto): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<ITopic>> {
    const res = await this.client.put(`/delete/${id}`);
    return res.data;
  }
}

export default new TopicService() as TopicService;
