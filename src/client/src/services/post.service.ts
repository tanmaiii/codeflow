import { IComment } from "@/interfaces/comment";
import {
  IGetAllQuery,
  ResponseAPIDto,
  ResponseAPIDtoWithPagination,
} from "@/interfaces/common";
import { ICreatePostDto, IPost } from "@/interfaces/post";
import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class PostService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient("posts");
  }

  async getAll(params: {
    params: IGetAllQuery;
  }): Promise<ResponseAPIDtoWithPagination<IPost[]>> {
    const response = await this.client.get("/", params);
    return response.data;
  }

  async getById(id: string): Promise<ResponseAPIDto<IPost>> {
    const response = await this.client.get(`/${id}`);
    return response.data;
  }

  async create(data: ICreatePostDto): Promise<ResponseAPIDto<IPost>> {
    const response = await this.client.post("/", data);
    return response.data;
  }

  async update(id: string, data: ICreatePostDto): Promise<ResponseAPIDto<IPost>> {
    const response = await this.client.put(`/${id}`, data);
    return response.data;
  }

  // like post

  async checkLike(id: string): Promise<ResponseAPIDto<{ isLike: boolean }>> {
    const response = await this.client.get(`/${id}/like`);
    return response.data;
  }

  // unlike post
  async like(id: string): Promise<ResponseAPIDto<IPost>> {
    const response = await this.client.post(`/${id}/like`);
    return response.data;
  }

  // update post

  async unlike(id: string): Promise<ResponseAPIDto<IPost>> {
    const response = await this.client.delete(`/${id}/like`);
    return response.data;
  }

  async comments(id: string): Promise<ResponseAPIDto<IComment[]>> {
    const response = await this.client.get(`/${id}/comments`);
    return response.data;
  }
}

export default new PostService() as PostService;
