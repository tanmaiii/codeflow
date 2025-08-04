import { ENUM_TOPIC_STATUS, ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { Notification } from '@/interfaces/notification.interface';
import { Topic, TopicCreate, TopicStats } from '@/interfaces/topics.interface';
import { UserContributes } from '@/interfaces/users.interface';
import { logger } from '@/utils/logger';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Op, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import CodeAnalysisService from './code_analysis.service';
import { CommitService } from './commit.service';
import { CourseService } from './courses.service';
import { NotificationService } from './notification.service';
import { PullRequestsService } from './pull_requests.service';
import { ReposService } from './repos.service';
import { TagService } from './tag.service';
import { TopicMemberService } from './topic_member.service';
import { ReposStats } from '@/interfaces/repos.interface';
@Service()
export class TopicService {
  private readonly defaultPageSize = 10;
  private readonly defaultSortBy = 'created_at';
  private readonly defaultSortOrder: 'ASC' | 'DESC' = 'DESC';
  private _reposService: ReposService;
  public tagService: TagService;
  public topicMemberService: TopicMemberService;
  public notificationService: NotificationService;
  public courseService: CourseService;
  public commitService: CommitService;
  public codeAnalysisService: CodeAnalysisService;
  public pullRequestService: PullRequestsService;

  constructor() {
    this.tagService = Container.get(TagService);
    this.topicMemberService = Container.get(TopicMemberService);
    this.notificationService = Container.get(NotificationService);
    this.courseService = Container.get(CourseService);
    this.commitService = Container.get(CommitService);
    this.pullRequestService = Container.get(PullRequestsService);
    this.codeAnalysisService = Container.get(CodeAnalysisService);
  }

  // Lazy getter để tránh circular dependency
  private get reposService(): ReposService {
    if (!this._reposService) {
      this._reposService = Container.get(ReposService);
    }
    return this._reposService;
  }

  private readonly memberCountLiteral = Sequelize.literal(`(
    SELECT COUNT(*)
    FROM topic_members AS tm
    WHERE tm.topic_id = topics.id
  )`);

  public async findAll(isAdmin = false): Promise<Topic[]> {
    return DB.Topics.findAll({
      paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
    });
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = this.defaultPageSize,
    sortBy = this.defaultSortBy,
    sortOrder = this.defaultSortOrder,
    courseId?: string,
    isCustom?: boolean,
    status?: string,
    search?: string,
    isAdmin = false,
  ): Promise<{ count: number; rows: Topic[] }> {
    const whereClause = this.buildWhereClause({ courseId, isCustom });

    return DB.Topics.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'id',
      attributes: {
        include: [[this.memberCountLiteral, 'memberCount']],
      },
      include: [
        {
          model: DB.Courses,
          as: 'course',
          required: true,
          paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
        },
      ],
      where: {
        ...whereClause,
        ...(status ? { status } : {}),
        ...(search ? { title: { [Op.like]: `%${search}%` } } : {}),
      },
      paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
    });
  }

  public async findAndCountAllWithPaginationByUser(
    page = 1,
    pageSize = this.defaultPageSize,
    sortBy = this.defaultSortBy,
    sortOrder = this.defaultSortOrder,
    userId?: string,
    status?: string,
    isAdmin = false,
  ): Promise<{ count: number; rows: Topic[] }> {
    // Tìm các topic mà user là thành viên
    const userTopics = await DB.TopicMember.findAll({
      where: { userId },
      attributes: ['topicId'],
    });
    const topicIds = userTopics.map(tm => tm.topicId);

    // Lấy thông tin đầy đủ của các topic và tất cả thành viên
    return DB.Topics.findAndCountAll({
      limit: pageSize === -1 ? undefined : pageSize,
      offset: pageSize === -1 ? undefined : (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      where: {
        id: topicIds,
        ...(status ? { status } : {}),
      },
      col: 'id',
      attributes: {
        include: [[this.memberCountLiteral, 'memberCount']],
      },
      include: [
        {
          model: DB.Courses,
          as: 'course',
          required: true,
          paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
        },
      ],
      paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
    });
  }

  public async findTopicById(id: string, isAdmin = false): Promise<Topic> {
    const topic = await DB.Topics.findByPk(id, {
      attributes: {
        include: [[this.memberCountLiteral, 'memberCount']],
      },
      include: [
        {
          model: DB.Courses,
          as: 'course',
          required: true,
          paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
        },
      ],
      paranoid: !isAdmin, // Nếu là admin thì không cần paranoid (xem cả record đã xóa mềm)
    });
    if (!topic) throw new HttpException(409, "Topic doesn't exist");
    return topic;
  }

  public async createTopic(topicData: Partial<TopicCreate>): Promise<Topic> {
    const { tags, members, ...topicDataWithoutTags } = topicData;
    const createdTopic = await DB.Topics.create(topicDataWithoutTags);

    const course = await this.courseService.findCourseById(topicData.courseId);

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.tagService.createTopicTag(createdTopic.id, tagId)));
    }

    if (topicData.authorId !== course.authorId && members.filter(memberId => memberId === topicData.authorId).length === 0) {
      members.push(topicData.authorId);
    }

    if (members?.length) {
      await Promise.all(
        members.map(memberId =>
          this.topicMemberService.createTopicMember({
            topicId: createdTopic.id,
            userId: memberId,
            role: topicData.authorId === memberId ? 'leader' : 'member',
          }),
        ),
      );
    }

    if (topicData.isCustom) {
      const notificationData: Notification = {
        type: ENUM_TYPE_NOTIFICATION.REGISTER_TOPIC,
        title: 'Register Topic',
        message: `New topic "${createdTopic.title}"`,
        link: `/topics/${createdTopic.id}`,
        userId: course?.authorId,
        topicId: createdTopic.id,
      };

      await this.notificationService.createNotification(notificationData);
    }

    return createdTopic;
  }

  // Đăng ký bằng chủ đề của teacher
  public async updateTopic(id: string, topicData: Partial<TopicCreate>, isAdmin = false): Promise<Topic> {
    if (isEmpty(id)) throw new HttpException(400, 'TopicId is empty');

    const topic = await this.findTopicById(id, isAdmin);
    const { tags, members, authorId, ...topicDataWithoutTags } = topicData;

    await DB.Topics.update(topicDataWithoutTags, { where: { id } });

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.tagService.createTopicTag(id, tagId)));
    }

    if (topicData.authorId !== topic.authorId && members) {
      members.push(topicData.authorId);
    }

    if (members?.length) {
      // Delete all existing members first
      await this.topicMemberService.deleteAllTopicMembers(topic.id);

      // Create new members
      await Promise.all(
        members.map(memberId =>
          this.topicMemberService.createTopicMember({
            topicId: topic.id,
            userId: memberId,
            role: topicData.authorId === memberId ? 'leader' : 'member',
          }),
        ),
      );
    }

    if (topicData.status === ENUM_TOPIC_STATUS.APPROVED || topicData.status === ENUM_TOPIC_STATUS.REJECTED) {
      const notificationData: Notification = {
        type: topicData.status === ENUM_TOPIC_STATUS.APPROVED ? ENUM_TYPE_NOTIFICATION.APPROVE_TOPIC : ENUM_TYPE_NOTIFICATION.REJECT_TOPIC,
        title: topicData.status === 'approved' ? 'Approve Topic' : 'Reject Topic',
        message: `Topic "${topic.title}" is ${topicData.status}`,
        link: `/topics/${topic.id}`,
        topicId: topic.id,
        userId: topic.authorId,
      };

      await this.notificationService.createNotification(notificationData);
    }

    return topic;
  }

  public async deleteTopic(topicId: string, isAdmin = false): Promise<Topic> {
    const topic = await this.findTopicById(topicId, isAdmin);
    await DB.Topics.destroy({ where: { id: topicId } });
    return topic;
  }

  public async destroyTopic(id: string): Promise<Topic> {
    const topic = await DB.Topics.findByPk(id, { paranoid: false });
    if (!topic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ force: true, where: { id } });
    return topic;
  }

  public async restoreTopic(id: string): Promise<Topic> {
    const topic = await DB.Topics.findByPk(id, { paranoid: false });
    if (!topic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.restore({ where: { id } });
    return topic;
  }

  private buildWhereClause(filters: Record<string, any>): Record<string, any> {
    const whereClause: Record<string, any> = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        whereClause[key] = value;
      }
    });
    return whereClause;
  }

  public async contributors(id: string): Promise<UserContributes[]> {
    const topic = await this.findTopicById(id, true);
    if (!topic) throw new HttpException(409, "Topic doesn't exist");
    const topicMembers = await this.topicMemberService.findTopicMembersByTopicId(id);

    const repos = await this.reposService.findByByTopicId(id);

    const contributorPromises = repos.map(async repo => {
      const repoContributors = await this.reposService.getRepoContributors(repo.id);
      return repoContributors;
    });

    const contributorResults = await Promise.all(contributorPromises);
    const allContributors = contributorResults.flat();

    // Gộp contributors có cùng authorId
    const mergedContributors = this.mergeContributorsByAuthorId(allContributors);

    return mergedContributors;
  }

  private mergeContributorsByAuthorId(contributors: UserContributes[]): UserContributes[] {
    const contributorMap = new Map<string, UserContributes>();

    contributors.forEach(contributor => {
      const { authorId } = contributor;

      if (contributorMap.has(authorId)) {
        // Nếu đã có contributor này, gộp các thống kê
        const existing = contributorMap.get(authorId);
        if (existing) {
          existing.commit.total += contributor.commit.total;
          existing.commit.additions += contributor.commit.additions;
          existing.commit.deletions += contributor.commit.deletions;

          existing.pullRequest.total += contributor.pullRequest.total;
          existing.pullRequest.additions += contributor.pullRequest.additions;
          existing.pullRequest.deletions += contributor.pullRequest.deletions;

          existing.codeAnalysis.total += contributor.codeAnalysis.total;
          existing.codeAnalysis.success += contributor.codeAnalysis.success;
          existing.codeAnalysis.failure += contributor.codeAnalysis.failure;
        }
      } else {
        // Nếu chưa có, thêm mới vào map
        contributorMap.set(authorId, { ...contributor });
      }
    });

    return Array.from(contributorMap.values());
  }

  public async getTopicStats(id: string): Promise<TopicStats> {
    const topic = await this.findTopicById(id, true);
    if (!topic) throw new HttpException(409, "Topic doesn't exist");

    const repos = await this.reposService.findByByTopicId(id);

    const contributorPromises = repos.map(async repo => {
      const repoContributors = await this.reposService.getRepoStats(repo.id);
      return repoContributors;
    });

    const contributorResults = await Promise.all(contributorPromises);
    const allContributors = contributorResults.flat();

    const mergedContributors = this.mergeStatsById(allContributors, topic.id);

    return mergedContributors;
  }

  private async mergeStatsById(stats: ReposStats[], topicId: string): Promise<TopicStats> {
    if (stats.length === 0) {
      return {
        topicId: '',
        commit: { total: 0, additions: 0, deletions: 0 },
        pullRequest: { total: 0, additions: 0, deletions: 0, open: 0, closed: 0, merged: 0 },
        codeAnalysis: { total: 0, success: 0, failure: 0 },
      };
    }

    // Khởi tạo tổng stats với giá trị đầu tiên
    const mergedStats: TopicStats = {
      topicId: topicId,
      commit: { total: 0, additions: 0, deletions: 0 },
      pullRequest: { total: 0, additions: 0, deletions: 0, open: 0, closed: 0, merged: 0 },
      codeAnalysis: { total: 0, success: 0, failure: 0 },
    };

    // Cộng tất cả các stats lại với nhau
    stats.forEach(stat => {
      mergedStats.commit.total += stat.commit.total;
      mergedStats.commit.additions += stat.commit.additions;
      mergedStats.commit.deletions += stat.commit.deletions;

      mergedStats.pullRequest.total += stat.pullRequest.total;
      mergedStats.pullRequest.additions += stat.pullRequest.additions;
      mergedStats.pullRequest.deletions += stat.pullRequest.deletions;
      mergedStats.pullRequest.open += stat.pullRequest.open;
      mergedStats.pullRequest.closed += stat.pullRequest.closed;
      mergedStats.pullRequest.merged += stat.pullRequest.merged;

      mergedStats.codeAnalysis.total += stat.codeAnalysis.total;
      mergedStats.codeAnalysis.success += stat.codeAnalysis.success;
      mergedStats.codeAnalysis.failure += stat.codeAnalysis.failure;
    });

    return mergedStats;
  }
}
