import { IComment, ICreatoeCmmentDto } from '@/interfaces/comment';
import { ResponseAPIDto } from '@/interfaces/common';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class CommentService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('comments');
  }

  async create(data: ICreatoeCmmentDto): Promise<ResponseAPIDto<IComment>> {
    const res = await this.client.post('/', data);
    return res.data;
  }

  async update(id: string, data: ICreatoeCmmentDto): Promise<ResponseAPIDto<IComment>> {
    const res = await this.client.put(`/${id}`, data);
    return res.data;
  }

  async delete(id: string) {
    const res = await this.client.delete(`/${id}`);
    return res.data;
  }
}

export default new CommentService() as CommentService;
