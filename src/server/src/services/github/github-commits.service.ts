import { Service } from 'typedi';
import { GitHubBaseService } from './github-base.service';
import { GitHubCommitDetail } from '@/interfaces/github.interface';

@Service()
export class GitHubCommitsService extends GitHubBaseService {
  constructor() {
    super('GitHubCommitsService');
  }

  /**
   * Lấy chi tiết commit
   * @param repoName Tên repository
   * @param commitSha SHA của commit
   * @returns Chi tiết commit
   */
  public async getCommitDetails(repoName: string, commitSha: string): Promise<GitHubCommitDetail> {
    const commit = await this.makeRequest<GitHubCommitDetail>({
      method: 'GET',
      url: `${this.getOrgRepoUrl(repoName)}/commits/${commitSha}`,
    });

    return commit;
  }
}
