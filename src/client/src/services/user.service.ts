import createHttpClient from '@/lib/createHttpClient';
import { IGetAllQuery, ResponseAPIDto, ResponseAPIDtoWithPagination } from '@/interfaces/common';
import { AxiosInstance } from 'axios';
import { IUser } from '@/interfaces/user';

class UserService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('users');
  }

  async getAll(params: IGetAllQuery): Promise<ResponseAPIDtoWithPagination<IUser[]>> {
    const response = await this.client.get('', { params });
    return response.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<IUser>> {
    const response = await this.client.get(`/${id}`);
    return response.data;
  }

  async create(data: IUser): Promise<ResponseAPIDto<IUser>> {
    const response = await this.client.post('', data);
    return response.data;
  }

  async update(id: string, data: IUser): Promise<ResponseAPIDto<IUser>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }

  async delete(id: string): Promise<ResponseAPIDto<IUser>> {
    const response = await this.client.put(`/${id}/delete`);
    return response.data;
  }
}

export default new UserService() as UserService;
