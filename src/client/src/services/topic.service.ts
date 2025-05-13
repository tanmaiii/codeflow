import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';
import { IGetAllQuery, ResponseAPIDto, ResponseAPIDtoWithPagination } from '@/interfaces/common';
import { ITopic, ITopicCreateDto } from '@/interfaces/topic';


class TopicService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('topics');
  }

  async getAll(params: IGetAllQuery): Promise<ResponseAPIDtoWithPagination<ITopic[]>> {
    const response = await this.client.get('/', { params });
    return response.data;
  }

  async getAllByCourseId(params: IGetAllQuery, courseId: string): Promise<ResponseAPIDtoWithPagination<ITopic[]>> {
    const response = await this.client.get(`/course/${courseId}`, { params });
    return response.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ITopic>> {
    const response = await this.client.get(`/${id}`);
    return response.data;
  }
  
  async create(data: ITopicCreateDto): Promise<ResponseAPIDto<ITopic>> {
    const response = await this.client.post('/', data);
    return response.data;
  }

  async update(id: string, data: ITopicCreateDto): Promise<ResponseAPIDto<ITopic>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<ITopic>> {
    const response = await this.client.put(`/delete/${id}`);
    return response.data;
  }
}

export default new TopicService() as TopicService;
