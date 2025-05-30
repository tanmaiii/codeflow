import { ResponseAPIDto } from '@/interfaces/common';
import { GitHubUser } from '@/interfaces/github';
import createHttpClient from '@/lib/createHttpClient';


class GitHubService {
  private client;

  constructor() {
    this.client = createHttpClient('github');
  }

  async getUserInfo(username: string) {
    const res = await this.client.get<ResponseAPIDto<GitHubUser>>(`/user/${username}`);
    return res.data;
  }
  
}

export default new GitHubService() as GitHubService;
