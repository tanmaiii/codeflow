import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';
import { IGetAllQuery, ResponseAPIDto, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IGroup, IGroupCreateDto } from '@/interfaces/group';

class GroupService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('groups');
  }

  async getAll(params: IGetAllQuery): Promise<PaginatedResponseAPIDto<IGroup[]>> {
    const res = await this.client.get('/', { params });
    return res.data;
  }

  async getAllByTopicId(params: IGetAllQuery, topicId: string): Promise<PaginatedResponseAPIDto<IGroup[]>> {
    const res = await this.client.get(`/${topicId}/topic`, { params });
    return res.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<IGroup>> {
    const res = await this.client.get(`/${id}`);
    return res.data;
  }
  
  async create(data: IGroupCreateDto): Promise<ResponseAPIDto<IGroup>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: IGroupCreateDto): Promise<ResponseAPIDto<IGroup>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<IGroup>> {
    const res = await this.client.put(`/delete/${id}`);
    return res.data;
  }

  async addMember(groupId: string, userId: string): Promise<ResponseAPIDto<IGroup>> {
    const res = await this.client.put(`/${groupId}/add-member/${userId}`);
    return res.data;
  }

  async removeMember(groupId: string, userId: string): Promise<ResponseAPIDto<IGroup>> {
    const res = await this.client.put(`/${groupId}/remove-member/${userId}`);
    return res.data;
  }
}

export default new GroupService() as GroupService;