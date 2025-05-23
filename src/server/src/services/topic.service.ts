import { Topic, TopicCreate } from '@/interfaces/topics.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { TagService } from './tag.service';
import { TopicMemberService } from './topic_member.service';

@Service()
export class TopicService {
  private readonly defaultPageSize = 10;
  private readonly defaultSortBy = 'created_at';
  private readonly defaultSortOrder: 'ASC' | 'DESC' = 'DESC';

  constructor(private readonly tagService = Container.get(TagService), private readonly topicMemberService = Container.get(TopicMemberService)) {}

  public async findAll(): Promise<Topic[]> {
    return DB.Topics.findAll();
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = this.defaultPageSize,
    sortBy = this.defaultSortBy,
    sortOrder = this.defaultSortOrder,
    courseId?: string,
    isCustom?: boolean,
  ): Promise<{ count: number; rows: Topic[] }> {
    const whereClause = this.buildWhereClause({ courseId, isCustom });

    return DB.Topics.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'topics.id',
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    });
  }

  public async findAndCountAllWithPaginationByUser(
    page = 1,
    pageSize = this.defaultPageSize,
    sortBy = this.defaultSortBy,
    sortOrder = this.defaultSortOrder,
    userId?: string,
    status?: string,
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
      col: 'topics.id',
    });
  }

  public async findTopicById(id: string): Promise<Topic> {
    const topic = await DB.Topics.findByPk(id);
    if (!topic) throw new HttpException(409, "Topic doesn't exist");
    return topic;
  }

  public async createTopic(topicData: Partial<TopicCreate>): Promise<Topic> {
    const { tags, members, ...topicDataWithoutTags } = topicData;
    const createdTopic = await DB.Topics.create(topicDataWithoutTags);

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.tagService.createTopicTag(createdTopic.id, tagId)));
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

    return createdTopic;
  }

  public async updateTopic(id: string, topicData: Partial<TopicCreate>): Promise<Topic> {
    if (isEmpty(id)) throw new HttpException(400, 'TopicId is empty');

    const topic = await this.findTopicById(id);
    const { tags, members, authorId, ...topicDataWithoutTags } = topicData;

    await DB.Topics.update(topicDataWithoutTags, { where: { id } });

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.tagService.createTopicTag(id, tagId)));
    }

    if (members?.length) {
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

    return topic;
  }

  public async deleteTopic(topicId: string): Promise<Topic> {
    const topic = await this.findTopicById(topicId);
    await DB.Topics.destroy({ where: { id: topicId } });
    return topic;
  }

  public async destroyTopic(id: string): Promise<Topic> {
    const topic = await DB.Topics.findByPk(id, { paranoid: false });
    if (!topic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ force: true, where: { id } });
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
