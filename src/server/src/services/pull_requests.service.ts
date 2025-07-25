import { DB } from '@/database';
import { PullRequests, PullRequestsCreate, PullRequestsUpdate } from '@/interfaces/pull_requests.interface';
import { Service } from 'typedi';

@Service()
export class PullRequestsService {
  public async findPullRequestByPullNumber(reposId: string, pullNumber: number): Promise<PullRequests> {
    const pullRequest = await DB.PullRequests.findOne({ where: { reposId, pullNumber } });
    return pullRequest;
  }

  public async findAllPullRequests(): Promise<PullRequests[]> {
    const pullRequests = await DB.PullRequests.findAll();
    return pullRequests;
  }

  public async findByRepoIdOrAuthorId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    repoId?: string,
    userId?: string,
  ): Promise<{ count: number; rows: PullRequests[] }> {
    const offset = (page - 1) * pageSize;

    const where: any = {};
    if (repoId) where['reposId'] = repoId;
    if (userId) where['authorId'] = userId;

    return await DB.PullRequests.findAndCountAll({
      where,
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      distinct: true,
      col: 'pull_requests.id',
      offset,
    });
  }

  public async createPullRequest(pullRequest: PullRequestsCreate): Promise<PullRequests> {
    const newPullRequest = await DB.PullRequests.create(pullRequest);
    return newPullRequest;
  }

  public async updatePullRequest(pullRequest: PullRequestsUpdate): Promise<void> {
    await DB.PullRequests.update(pullRequest, { where: { id: pullRequest.id } });
  }

  public async deletePullRequest(id: string): Promise<void> {
    await DB.PullRequests.destroy({ where: { id } });
  }
}
