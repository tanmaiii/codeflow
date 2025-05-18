import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';
import { IGetAllQuery, ResponseAPIDto, ResponseAPIDtoWithPagination } from '@/interfaces/common';
import { IGroup, IGroupCreateDto } from '@/interfaces/group';

class GroupService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('groups');
  }

  async getAll(params: IGetAllQuery): Promise<ResponseAPIDtoWithPagination<IGroup[]>> {
    const response = await this.client.get('/', { params });
    return response.data;
  }

  async getAllByTopicId(params: IGetAllQuery, topicId: string): Promise<ResponseAPIDtoWithPagination<IGroup[]>> {
    const response = await this.client.get(`/${topicId}/topic`, { params });
    return response.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<IGroup>> {
    const response = await this.client.get(`/${id}`);
    return response.data;
  }
  
  async create(data: IGroupCreateDto): Promise<ResponseAPIDto<IGroup>> {
    const response = await this.client.post('/', data);
    return response.data;
  }

  async update(id: string, data: IGroupCreateDto): Promise<ResponseAPIDto<IGroup>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<IGroup>> {
    const response = await this.client.put(`/delete/${id}`);
    return response.data;
  }

  async addMember(groupId: string, userId: string): Promise<ResponseAPIDto<IGroup>> {
    const response = await this.client.put(`/${groupId}/add-member/${userId}`);
    return response.data;
  }

  async removeMember(groupId: string, userId: string): Promise<ResponseAPIDto<IGroup>> {
    const response = await this.client.put(`/${groupId}/remove-member/${userId}`);
    return response.data;
  }
}

export default new GroupService() as GroupService;