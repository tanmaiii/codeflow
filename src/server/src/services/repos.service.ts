import { RepoCreate, Repos, RepoUpdate } from '@/interfaces/repos.interface';
import { isEmpty, reposName, cleanSpecialCharacters } from '@/utils/util';
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

  /**
   * Tạo tên repository duy nhất bằng cách kiểm tra trong database và GitHub
   * @param baseName Tên gốc của repository
   * @returns Tên repository duy nhất
   */
  private async generateUniqueRepoName(baseName: string): Promise<string> {
    let repoName = baseName;
    let counter = 1;
    
    while (await this.isRepoNameExists(repoName)) {
      repoName = `${baseName}-${counter}`;
      counter++;
    }
    
    return repoName;
  }

  /**
   * Kiểm tra xem tên repository đã tồn tại chưa (cả trong database và GitHub)
   * @param repoName Tên repository cần kiểm tra
   * @returns true nếu đã tồn tại, false nếu chưa
   */
  private async isRepoNameExists(repoName: string): Promise<boolean> {
    try {
      // Kiểm tra trong database local
      const existingRepo = await DB.Repos.findOne({
        where: { name: repoName }
      });
      
      if (existingRepo) {
        return true;
      }

      // Kiểm tra trên GitHub
      const githubRepoExists = await this.githubService.checkRepoExists(repoName);
      return githubRepoExists;
    } catch (error) {
      // Nếu có lỗi khi kiểm tra, coi như tên đã tồn tại để an toàn
      console.error('Error checking repo name existence:', error);
      return true;
    }
  }

  public async createRepo(repoData: Partial<RepoCreate>): Promise<Repos> {
    const topic = await this.topicService.findTopicById(repoData.topicId);
    const defaultRepoName = reposName({ type: topic.course?.type as ENUM_TYPE_COURSE, name: topic?.title, groupName: topic?.groupName });

    const baseRepoName = `${defaultRepoName}-${repoData?.name || ''}`;
    
    // Tạo tên repository duy nhất
    const uniqueRepoName = await this.generateUniqueRepoName(baseRepoName);
    
    // Tạo repo trong GitHub
    const repo = await this.githubService.createRepoInOrg({
      name: uniqueRepoName,
      description: cleanSpecialCharacters(topic.description || ''),
      private: false,
      team_id: null,
      auto_init: true,
    });

    // Thêm tất cả thành viên của topic vào repo
    topic.members.forEach(async member => {
      if (member.user?.uid && member.user?.username) {
        await this.githubService.collaborateRepo(uniqueRepoName, member.user?.username);
      }
    });

    // Tạo repo trong database
    const createdRepo: Repos = await DB.Repos.create({
      url: repo.html_url,
      name: uniqueRepoName,
      topicId: repoData.topicId,
      courseId: topic.courseId,
      authorId: repoData.authorId || '',
    });
    return createdRepo;
  }

  public async updateRepo(id: string, repoData: Partial<RepoUpdate>): Promise<Repos> {
    if (isEmpty(id)) throw new HttpException(400, 'RepoId is empty');

    const findRepo = await DB.Repos.findByPk(id);
    if (!findRepo) throw new HttpException(409, "Repo doesn't exist");

    await DB.Repos.update(
      {
        ...repoData,
      },
      { where: { id } },
    );

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
