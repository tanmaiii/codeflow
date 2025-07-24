import { DB } from '@/database';
import { CommitCreate, Commits, CommitUpdate } from '@/interfaces/commits.interface';
import { Service } from 'typedi';

@Service()
export class CommitService {
  public async findAllCommits(): Promise<Commits[]> {
    const commits = await DB.Commits.findAll();
    return commits;
  }

  public async findByRepoId(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    repoId: string,
  ): Promise<{ count: number; rows: Commits[] }> {
    const offset = (page - 1) * pageSize;

    return await DB.Commits.findAndCountAll({
      where: { reposId: repoId },
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      distinct: true,
      col: 'commits.id',
      offset,
    });
  }

  public async findCommitByCommitSha(commitSha: string): Promise<Commits> {
    const commit = await DB.Commits.findOne({ where: { commitSha } });
    return commit;
  }

  public async createCommit(commit: CommitCreate): Promise<Commits> {
    const newCommit = await DB.Commits.create(commit);
    return newCommit;
  }

  public async updateCommit(commit: CommitUpdate): Promise<void> {
    await DB.Commits.update(commit, { where: { commitSha: commit.commitSha } });
  }
}
