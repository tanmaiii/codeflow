import { RepoCreate, Repos } from '@/interfaces/repos.interface';
import { isEmpty, reposName } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Op } from 'sequelize';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { TopicService } from './topic.service';
import { ENUM_TYPE_COURSE } from '@/data/enum';
import { GitHubService } from './github.service';
@Service()
export class ReposService {
  constructor(private readonly githubService = Container.get(GitHubService), private readonly topicService = Container.get(TopicService)) {}

  public async findAll(): Promise<Repos[]> {
    const allData: Repos[] = await DB.Repos.findAll();
    return allData;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    search = '',
  ): Promise<{ count: number; rows: Repos[] }> {
    const { count, rows }: { count: number; rows: Repos[] } = await DB.Repos.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'repos.id',
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      },
    });
    return { count, rows };
  }

  public async finAndCountByTopic(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    search = '',
    topicId: string,
  ): Promise<{ count: number; rows: Repos[] }> {
    const { count, rows }: { count: number; rows: Repos[] } = await DB.Repos.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'repos.id',
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
        topicId: topicId,
      },
    });
    return { count, rows };
  }

  public async findById(id: string): Promise<Repos> {
    const findRepo = await DB.Repos.findByPk(id);
    if (!findRepo) throw new HttpException(409, "Repo doesn't exist");

    return findRepo;
  }

  public async createRepo(repoData: Partial<RepoCreate>): Promise<Repos> {
    const topic = await this.topicService.findTopicById(repoData.topicId);
    const name = reposName({ type: topic.course?.type as ENUM_TYPE_COURSE, name: topic?.title, groupName: topic?.groupName });

    const repo = await this.githubService.createRepoInOrg({
      name: name,
      description: topic.description,
      private: true,
      team_id: null,
      auto_init: true,
    });

    const createdRepo: Repos = await DB.Repos.create({
      url: repo.html_url,
      name: repo.name,
      ...repoData,
    });
    return createdRepo;
  }

  public async updateRepo(id: string, repoData: Partial<RepoCreate>): Promise<Repos> {
    if (isEmpty(id)) throw new HttpException(400, 'RepoId is empty');

    const findRepo = await DB.Repos.findByPk(id);
    if (!findRepo) throw new HttpException(409, "Repo doesn't exist");

    await DB.Repos.update(repoData, { where: { id } });

    return findRepo;
  }

  public async deleteRepo(repoId: string): Promise<Repos> {
    const findRepo: Repos = await DB.Repos.findByPk(repoId);
    if (!findRepo) throw new HttpException(409, "Repo doesn't exist");

    await DB.Repos.destroy({ where: { id: repoId } });

    const softDeletedRepo: Repos = await DB.Repos.findByPk(repoId);
    return softDeletedRepo;
  }

  public async destroyRepo(id: string): Promise<Repos> {
    const findRepo = await DB.Repos.findByPk(id, { paranoid: false });
    if (!findRepo) throw new HttpException(409, "Repo doesn't exist");

    await this.githubService.deleteRepoInOrg(findRepo.name);

    await DB.Repos.destroy({ force: true, where: { id: id } });

    return findRepo;
  }
}
