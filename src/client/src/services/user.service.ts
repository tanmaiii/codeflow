import createHttpClient from "@/lib/createHttpClient";
import { AxiosInstance } from "axios";

class UserService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient("");
  }

  async getUsers() {
    const response = await this.client.get("/users");
    return response.data;
  }
}

export default new UserService() as UserService;
