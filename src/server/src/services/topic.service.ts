import { HttpException } from '@exceptions/HttpException';
import { Topic, TopicCreate } from '@/interfaces/topics.interface';
import { DB } from '../database';
import Container, { Service } from 'typedi';
import { TagService } from './tag.service';
import { isEmpty } from '@/utils/util';

@Service()
export class TopicService {
  public Tag = Container.get(TagService);

  public async findAll(): Promise<Topic[]> {
    const allData: Topic[] = await DB.Topics.findAll();
    return allData;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: Topic[] }> {
    const { count, rows }: { count: number; rows: Topic[] } = await DB.Topics.findAndCountAll({
      limit,
      offset,
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

  public async deleteTopic(id: string): Promise<Topic> {
    const findTopic = await DB.Topics.findByPk(id);
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ where: { id: id } });

    const softDeletedTopic = await DB.Topics.findByPk(id);
    if (!softDeletedTopic) throw new HttpException(409, "Topic doesn't exist after deletion");
    return softDeletedTopic;
  }

  public async destroyTopic(id: string): Promise<Topic> {
    const findTopic = await DB.Topics.findByPk(id, { paranoid: false });
    if (!findTopic) throw new HttpException(409, "Topic doesn't exist");

    await DB.Topics.destroy({ force: true, where: { id: id } });

    return findTopic;
  }
}
