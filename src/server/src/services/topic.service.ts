import { ENUM_TOPIC_STATUS, ENUM_TYPE_NOTIFICATION } from '@/data/enum';
import { Notification } from '@/interfaces/notification.interface';
import { Topic, TopicCreate } from '@/interfaces/topics.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import { Op, Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { CourseService } from './courses.service';
import { NotificationService } from './notification.service';
import { TagService } from './tag.service';
import { TopicMemberService } from './topic_member.service';
@Service()
export class TopicService {
  private readonly defaultPageSize = 10;
  private readonly defaultSortBy = 'created_at';
  private readonly defaultSortOrder: 'ASC' | 'DESC' = 'DESC';

  constructor(
    private readonly tagService = Container.get(TagService),
    private readonly topicMemberService = Container.get(TopicMemberService),
    private readonly notificationService = Container.get(NotificationService),
    private readonly courseService = Container.get(CourseService),
  ) {}

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
      limit: pageSize,
      offset: (page - 1) * pageSize,
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
            role: authorId === memberId ? 'leader' : 'member',
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
}
