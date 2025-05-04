import { ResponseAPIDto } from "@/interfaces/common";
import createHttpClient from "@/lib/createHttpClient";

interface UploadResponseDto {
  path: string;
  name: string;
}

class UploadService {
  private client;

  constructor() {
    this.client = createHttpClient("upload");
  }

  async upload(data: FormData): Promise<ResponseAPIDto<UploadResponseDto>> {
    const res = await this.client.post<ResponseAPIDto<UploadResponseDto>>(
      "/",
      data,
      {
        headers: { Accept: "application/form-data" },
      }
    );
    return res.data;
  }
}

export default new UploadService() as UploadService;
