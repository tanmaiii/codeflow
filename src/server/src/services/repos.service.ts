import { RepoCreate, Repos, RepoUpdate } from '@/interfaces/repos.interface';
import { logger } from '@/utils/logger';
import { cleanSpecialCharacters, isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Op } from 'sequelize';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { GitHubService } from './github.service';
import { SonarService } from './sonar.service';
import { TopicService } from './topic.service';
@Service()
export class ReposService {
  constructor(
    private readonly githubService = Container.get(GitHubService),
    private readonly topicService = Container.get(TopicService),
    private readonly sonarService = Container.get(SonarService),
  ) {}

  /**
   * Lấy tất cả repository từ database.
   */
  public async findAll(): Promise<Repos[]> {
    return DB.Repos.findAll();
  }

  /**
   * Lấy danh sách repository có phân trang, tìm kiếm, sắp xếp.
   */
  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    search = '',
    isAdmin = false,
  ): Promise<{ count: number; rows: Repos[] }> {
    return DB.Repos.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'repos.id',
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
      },
      paranoid: !isAdmin,
    });
  }

  /**
   * Lấy danh sách repository theo topic, có phân trang, tìm kiếm, sắp xếp.
   */
  public async finAndCountByTopic(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    search = '',
    topicId: string,
    isAdmin = false,
  ): Promise<{ count: number; rows: Repos[] }> {
    return DB.Repos.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'repos.id',
      where: {
        [Op.or]: [{ name: { [Op.like]: `%${search}%` } }],
        topicId,
      },
      paranoid: !isAdmin,
    });
  }

  /**
   * Tìm repository theo id.
   */
  public async findById(id: string, isAdmin = false): Promise<Repos> {
    const repo = await DB.Repos.findByPk(id, { paranoid: !isAdmin });
    if (!repo) throw new HttpException(409, "Repo doesn't exist");
    return repo;
  }

  /**
   * Tìm repository theo tên repository.
   */
  public async findRepoByRepositoryName(repositoryName: string): Promise<Repos> {
    logger.info(`[Repos Service] Finding repo by repository name: ${repositoryName}`);
    const repo = await DB.Repos.findOne({ where: { name: repositoryName } });
    if (!repo) throw new HttpException(409, "Repo doesn't exist");
    return repo;
  }

  /**
   * Tạo tên repository duy nhất bằng cách kiểm tra trong database và GitHub.
   */
  private async generateUniqueRepoName(baseName: string): Promise<string> {
    let repoName = baseName;
    let counter = 1;

    // Kiểm tra xem tên gốc đã có số phía sau chưa
    const numberMatch = repoName.match(/-(\d+)$/);
    if (numberMatch) {
      // Nếu đã có số, tách ra và bắt đầu từ số đó + 1
      const baseNameWithoutNumber = repoName.replace(/-\d+$/, '');
      counter = parseInt(numberMatch[1]) + 1;
      repoName = `${baseNameWithoutNumber}-${counter}`;
    }

    while (await this.isRepoNameExists(repoName)) {
      const baseName = repoName.replace(/-\d+$/, '');
      repoName = `${baseName}-${counter++}`;
    }
    return repoName;
  }

  /**
   * Kiểm tra xem tên repository đã tồn tại chưa (cả trong database và GitHub).
   */
  private async isRepoNameExists(repoName: string): Promise<boolean> {
    try {
      // Kiểm tra trong database local
      const existingRepo = await DB.Repos.findOne({ where: { name: repoName } });
      if (existingRepo) return true;

      // Kiểm tra trên GitHub
      return await this.githubService.checkRepoExists(repoName);
    } catch (error) {
      // Nếu có lỗi khi kiểm tra, coi như tên đã tồn tại để an toàn
      console.error('Error checking repo name existence:', error);
      return true;
    }
  }

  /**
   * Tạo repository mới trên GitHub và lưu vào database.
   */
  public async createRepo(repoData: Partial<RepoCreate>): Promise<Repos> {
    const topic = await this.topicService.findTopicById(repoData.topicId);
    const uniqueRepoName = await this.generateUniqueRepoName(`${repoData?.name || ''}`);

    // Tạo repo trên GitHub
    const repo = await this.githubService.createRepoInOrg({
      name: uniqueRepoName,
      description: cleanSpecialCharacters(topic.description || ''),
      private: false,
      team_id: null,
      // auto_init: true,
    });

    // Tạo project để lấy key trên sonar cloud
    const sonarData = await this.sonarService.createProject(uniqueRepoName);

    // Tạo repo trong database
    const newRepos = await DB.Repos.create({
      url: repo.html_url,
      courseId: topic.courseId,
      topicId: topic.id,
      authorId: repoData.authorId,
      name: uniqueRepoName,
      language: repoData.language,
      framework: repoData.framework,
      sonarKey: sonarData.project.key || '',
    });

    // Tạo workflow cho repository trên github
    await this.githubService.createBasicWorkflow(uniqueRepoName, repoData.language, repoData.framework, sonarData.project.key);

    // Tạo webhook cho repo, nếu có lỗi thì chỉ log lỗi, không throw để các bước sau vẫn thực hiện
    try {
      await this.githubService.createWebhookCommit(uniqueRepoName, `${process.env.WEBHOOK_URL}/api/github/webhook`);
    } catch (error) {
      logger.error(`[Repos Service] Error creating webhook for repo ${uniqueRepoName}: ${error}`);
    }

    // Thêm tất cả thành viên của topic vào repo trên GitHub
    for (const member of topic.members) {
      if (member.user?.uid && member.user?.username) {
        await this.githubService.collaborateRepo(uniqueRepoName, member.user.username);
      }
    }

    // Đổi tên branch main thành master để có thể sử dụng sonar cloud
    try {
      await this.githubService.renameBranchMainToMaster(uniqueRepoName);
    } catch (error) {
      logger.error(`[Repos Service] Error renaming branch main to master for repo ${uniqueRepoName}: ${error}`);
    }

    // Lưu repo vào database
    return newRepos;
  }

  /**
   * Cập nhật repository (đổi tên repo trên GitHub và database).
   */
  public async updateRepo(id: string, repoData: Partial<RepoUpdate>): Promise<Repos> {
    if (isEmpty(id)) throw new HttpException(400, 'RepoId is empty');
    const repo = await this.findById(id);
    if (!repo) throw new HttpException(409, "Repo doesn't exist");

    const uniqueRepoName = await this.generateUniqueRepoName(`${repoData?.name || ''}`);

    // Cập nhật tên repo trên GitHub
    const githubRepo = await this.githubService.updateRepoInOrg(repo.name, { name: uniqueRepoName });

    // Cập nhật thông tin repo trong database
    const [updatedRows] = await DB.Repos.update(
      {
        name: uniqueRepoName,
        url: githubRepo.html_url,
        language: repoData.language,
        framework: repoData.framework,
      },
      { where: { id } },
    );

    if (updatedRows === 0) throw new HttpException(500, 'Failed to update repo in database');

    return this.findById(id, true);
  }

  /**
   * Xóa mềm repository (chỉ xóa trong database, không xóa trên GitHub).
   */
  public async deleteRepo(reposId: string): Promise<Repos> {
    const repo = await this.findById(reposId, true);
    if (!repo) throw new HttpException(409, "Repo doesn't exist");

    await DB.Repos.destroy({ where: { id: reposId } });
    return DB.Repos.findByPk(reposId);
  }

  /**
   * Xóa vĩnh viễn repository (xóa trên GitHub và database).
   */
  public async destroyRepo(id: string): Promise<Repos> {
    const repo = await DB.Repos.findByPk(id, { paranoid: false });
    if (!repo) throw new HttpException(409, "Repo doesn't exist");

    try {
      await this.githubService.deleteRepoInOrg(repo.name);
    } catch (error) {
      logger.error(`[Repos Service] Error deleting repo: ${error}`);
    }

    try {
      await this.sonarService.deleteProject(repo.sonarKey);
    } catch (error) {
      logger.error(`[Repos Service] Error deleting project: ${error}`);
    }

    await DB.Repos.destroy({ force: true, where: { id } });
    return repo;
  }

  /**
   * Khôi phục repository đã xóa mềm.
   */
  public async restoreRepo(id: string): Promise<Repos> {
    const repo = await DB.Repos.findByPk(id, { paranoid: false });
    if (!repo) throw new HttpException(409, "Repo doesn't exist");

    await DB.Repos.restore({ where: { id } });
    return repo;
  }
}
