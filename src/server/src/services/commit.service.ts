import { DB } from '@/database';
import { CommitCreate, Commits, CommitUpdate } from '@/interfaces/commits.interface';
import Container, { Service } from 'typedi';
import { ReposService } from './repos.service';
import { UserService } from './users.service';

@Service()
export class CommitService {
  private readonly reposService: ReposService;
  private readonly userService: UserService;

  constructor() {
    this.reposService = Container.get(ReposService);
    this.userService = Container.get(UserService);
  }

  public async findAllCommits(): Promise<Commits[]> {
    const commits = await DB.Commits.findAll();
    return commits;
  }

  public async findCommitByCommitHash(commitHash: string): Promise<Commits> {
    const commit = await DB.Commits.findOne({ where: { commitHash } });
    return commit;
  }

  public async createCommit(commit: CommitCreate): Promise<Commits> {
    const newCommit = await DB.Commits.create(commit);
    return newCommit;
  }

  public async updateCommit(commit: CommitUpdate): Promise<void> {
    await DB.Commits.update(commit, { where: { commitHash: commit.commitHash } });
  }
}
