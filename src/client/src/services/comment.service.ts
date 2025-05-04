import { IComment, ICreatoeCmmentDto } from "@/interfaces/comment";
import { ResponseAPIDto } from "@/interfaces/common";
import { ICourse } from "@/interfaces/course";
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
  ): Promise<ResponseAPIDto<ICourse>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }
}

export default new CommentService() as CommentService;
