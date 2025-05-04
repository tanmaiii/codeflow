import { ResponseAPIDto } from "@/interfaces/common";
import { ITag, ITagCreateDto } from "@/interfaces/tags";
import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class TagService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient("tags");
  }

  async getAll(): Promise<ResponseAPIDto<ITag[]>> {
    const response = await this.client.get("/");
    return response.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ITag>> {
    const response = await this.client.get(`/${id}`);
    return response.data;
  }

  async create(data: ITagCreateDto): Promise<ResponseAPIDto<ITag>> {
    const response = await this.client.post("/", data);
    return response.data;
  }

  async update(id: string, data: ITagCreateDto): Promise<ResponseAPIDto<ITag>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }
}

export default new TagService() as TagService;
