import { Repos, RepoCreate } from '@/interfaces/repos.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { TagService } from './tag.service';

@Service()
export class RepoService {
  public Tag = Container.get(TagService);

  public async findAll(): Promise<Repos[]> {
    const allData: Repos[] = await DB.Repos.findAll();
    return allData;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    courseId?: string,
    isCustom?: boolean,
  ): Promise<{ count: number; rows: Repos[] }> {
    const whereClause: any = {};

    if (courseId) {
      whereClause.courseId = courseId;
    }

    if (isCustom !== undefined) {
      whereClause.isCustom = isCustom;
    }

    const { count, rows }: { count: number; rows: Repos[] } = await DB.Repos.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'repos.id',
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    });
    return { count, rows };
  }

  public async findRepoById(id: string): Promise<Repos> {
    const findRepo = await DB.Repos.findByPk(id);
    if (!findRepo) throw new HttpException(409, "Repo doesn't exist");

    return findRepo;
  }

  public async createRepo(repoData: Partial<RepoCreate>): Promise<Repos> {
    const createdRepo: Repos = await DB.Repos.create(repoData);
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

    await DB.Repos.destroy({ force: true, where: { id: id } });

    return findRepo;
  }
}
