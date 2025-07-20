import { ResponseAPIDto } from '@/interfaces/common';
import { GithubMeta, GitHubUser } from '@/interfaces/github';
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

  async getRepoInfo(repoName: string) {
    const res = await this.client.get<ResponseAPIDto<GithubMeta>>(`/repos/${repoName}`);
    return res.data;
  }
}

export default new GitHubService() as GitHubService;
