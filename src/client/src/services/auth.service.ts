import { ILogin, ILoginWithGithub, ISignup, LoginResponseDto } from '@/interfaces/auth';
import { ResponseAPIDto } from '@/interfaces/common';
import { IUser } from '@/interfaces/user';
import createHttpClient from '@/lib/createHttpClient';
import { AxiosInstance } from 'axios';

class AuthService {
  private client: AxiosInstance;

  constructor() {
    this.client = createHttpClient('');
  }

  async login(body: ILogin): Promise<LoginResponseDto> {
    const response = await this.client.post<LoginResponseDto>('/login', body);
    return response.data;
  }

  async signup(body: ISignup) {
    return this.client.post('/signup', body);
  }

  async loginWithGithub(body: ILoginWithGithub): Promise<LoginResponseDto> {
    const res = await this.client.post<LoginResponseDto>('/loginWithGithub', body);
    return res.data;
  }

  async getInfoUser(): Promise<ResponseAPIDto<IUser>> {
    const res = await this.client.get('/info');
    return res.data;
  }

  async logout() {
    const res = await this.client.post('/logout');
    return res.data;
  }
}

export default new AuthService() as AuthService;
