import { IComment, ICreatoeCmmentDto } from "@/interfaces/comment";
import { ResponseAPIDto } from "@/interfaces/common";
import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class CommentService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient("comments");
  }

  async create(data: ICreatoeCmmentDto): Promise<ResponseAPIDto<IComment>> {
    const response = await this.client.post("/", data);
    return response.data;
  }

  async update(
    id: string,
    data: ICreatoeCmmentDto
  ): Promise<ResponseAPIDto<IComment>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }

  async delete(id: string) {
    const response = await this.client.delete(`/${id}`);
    return response.data;
  }
}

export default new CommentService() as CommentService;
