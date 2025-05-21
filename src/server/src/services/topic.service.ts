import { Topic, TopicCreate } from '@/interfaces/topics.interface';
import { isEmpty } from '@/utils/util';
import { HttpException } from '@exceptions/HttpException';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { TagService } from './tag.service';

@Service()
export class TopicService {
  public Tag = Container.get(TagService);

  public async findAll(): Promise<Topic[]> {
    const allData: Topic[] = await DB.Topics.findAll();
    return allData;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
    courseId?: string,
    isCustom?: boolean,
  ): Promise<{ count: number; rows: Topic[] }> {
    const whereClause: any = {};

    if (courseId) {
      whereClause.courseId = courseId;
    }

    if (isCustom !== undefined) {
      whereClause.isCustom = isCustom;
    }

    const { count, rows }: { count: number; rows: Topic[] } = await DB.Topics.findAndCountAll({
      limit: pageSize,
      offset: (page - 1) * pageSize,
      order: [[sortBy, sortOrder]],
      distinct: true,
      col: 'topics.id',
      where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    });
    return { count, rows };
  }

  public async findTopicById(id: string): Promise<Topic> {
    const findTopic = await DB.Topics.findByPk(id);
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    return findTopic;
  }

  public async createTopic(topicData: Partial<TopicCreate>): Promise<Topic> {
    const { tags, ...topicDataWithoutTags } = topicData;
    const createdTopic: Topic = await DB.Topics.create(topicDataWithoutTags);

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createTopicTag(createdTopic.id, tagId)));
    }

    return createdTopic;
  }

  public async updateTopic(id: string, topicData: Partial<TopicCreate>): Promise<Topic> {
    if (isEmpty(id)) throw new HttpException(400, 'TopicId is empty');

    const findTopic = await DB.Topics.findByPk(id);
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    const { tags, ...topicDataWithoutTags } = topicData;
    await DB.Topics.update(topicDataWithoutTags, { where: { id } });

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createTopicTag(id, tagId)));
    }

    return findTopic;
  }

  public async deleteTopic(topicId: string): Promise<Topic> {
    const findTopic: Topic = await DB.Topics.findByPk(topicId);
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ where: { id: topicId } });

    const softDeletedTopic: Topic = await DB.Topics.findByPk(topicId);
    return softDeletedTopic;
  }

  public async destroyTopic(id: string): Promise<Topic> {
    const findTopic = await DB.Topics.findByPk(id, { paranoid: false });
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ force: true, where: { id: id } });

    return findTopic;
  }
}
