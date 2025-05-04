import { ResponseAPIDto } from "@/interfaces/common";
import { ICourse } from "@/interfaces/course";
import { ICreatePostDto } from "@/interfaces/post";
import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class CourseService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient("courses");
  }

  async getAll(): Promise<ResponseAPIDto<ICourse[]>> {
    const response = await this.client.get("/");
    return response.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<ICourse>> {
    const response = await this.client.get(`/${id}`);
    return response.data;
  }

  async create(data: ICreatePostDto): Promise<ResponseAPIDto<ICourse>> {
    const response = await this.client.post("/", data);
    return response.data;
  }

  async update(
    id: string,
    data: ICreatePostDto
  ): Promise<ResponseAPIDto<ICourse>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }
}

export default new CourseService() as CourseService;
