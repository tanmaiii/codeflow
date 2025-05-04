import { DB } from '@/database';
import { HttpException } from '@/exceptions/HttpException';
import { CourseTag, PostTag, Tag, TopicTag } from '@/interfaces/tags.interface';
import { Service } from 'typedi';

@Service()
export class TagService {
  public async findAll(): Promise<Tag[]> {
    const allTag: Tag[] = await DB.Tags.findAll();
    return allTag;
  }

  public async findAndCountAllWithPagination(limit: number, offset: number): Promise<{ count: number; rows: Tag[] }> {
    const { count, rows }: { count: number; rows: Tag[] } = await DB.Tags.findAndCountAll({
      limit,
      offset,
    });
    return { count, rows };
  }

  public async findTagById(tagId: string): Promise<Tag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId);
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    return findTag;
  }

  public async createTag(tagData: Partial<Tag>): Promise<Tag> {
    const createTagData: Tag = await DB.Tags.create(tagData);
    return createTagData;
  }

  public async updateTag(tagId: string, tagData: Partial<Tag>): Promise<Tag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId);
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    await DB.Tags.update(tagData, { where: { id: tagId } });

    const updateTag: Tag = await DB.Tags.findByPk(tagId);
    return updateTag;
  }

  public async deleteTag(tagId: string): Promise<Tag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId);
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    await DB.Tags.destroy({ where: { id: tagId } });

    const softDeletedTag: Tag = await DB.Tags.findByPk(tagId);
    return softDeletedTag;
  }

  public async destroyTag(tagId: string): Promise<Tag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId, { paranoid: false });
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    await DB.Tags.destroy({ force: true, where: { id: tagId } });

    return findTag;
  }

  public async createCourseTag(courseId: string, tagId: string): Promise<CourseTag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId);
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    await DB.CourseTag.destroy({
      force: true,
      where: { courseId },
    });

    const createCourseTagData: CourseTag = await DB.CourseTag.create({
      courseId,
      tagId,
    });

    return createCourseTagData;
  }

  public async createPostTag(postId: string, tagId: string): Promise<PostTag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId);
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    await DB.PostTag.destroy({
      force: true,
      where: { postId },
    });

    const data: PostTag = await DB.PostTag.create({
      postId,
      tagId,
    });

    return data;
  }

  public async createTopicTag(topicId: string, tagId: string): Promise<TopicTag> {
    const findTag: Tag = await DB.Tags.findByPk(tagId);
    if (!findTag) throw new HttpException(409, "Tag doesn't exist");

    await DB.TopicTag.destroy({
      force: true,
      where: { topicId },
    });

    const data: TopicTag = await DB.TopicTag.create({
      topicId,
      tagId,
    });

    return data;
  }
}
