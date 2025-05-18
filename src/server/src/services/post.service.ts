import { HttpException } from '@/exceptions/HttpException';
import { Post, PostCreate } from '@/interfaces/posts.interface';
import { isEmpty } from '@/utils/util';
import { Sequelize } from 'sequelize';
import Container, { Service } from 'typedi';
import { DB } from '../database';
import { TagService } from './tag.service';

@Service()
export class PostService {
  public Tag = Container.get(TagService);

  public async findAll(): Promise<Post[]> {
    const allData: Post[] = await DB.Posts.findAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM comments AS c
            WHERE c.post_id = posts.id
          )`),
            'commentCount',
          ],
        ],
      },
      order: [['created_at', 'DESC']],
    });
    return allData;
  }

  public async findAndCountAllWithPagination(
    page = 1,
    pageSize = 10,
    sortBy = 'created_at',
    sortOrder: 'ASC' | 'DESC' = 'DESC',
  ): Promise<{ count: number; rows: Post[] }> {
    const offset = (page - 1) * pageSize;

    const result = await DB.Posts.findAndCountAll({
      attributes: {
        include: [
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM comments AS c
            WHERE c.post_id = posts.id
          )`),
            'commentCount',
          ],
          [
            Sequelize.literal(`(
            SELECT COUNT(*)
            FROM post_likes AS pl
            WHERE pl.post_id = posts.id
          )`),
            'likeCount',
          ],
        ],
      },
      order: [[sortBy, sortOrder]],
      limit: pageSize,
      offset: offset,
      distinct: true,
      col: 'posts.id',
    });

    return { count: result.count, rows: result.rows };
  }

  public async findPostById(id: string): Promise<Post> {
    const findPost = await DB.Posts.findByPk(id);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    return findPost;
  }

  public async createPost(postData: Partial<PostCreate>): Promise<Post> {
    const { tags, ...postDataWithoutTags } = postData;
    const createdPost: Post = await DB.Posts.create(postDataWithoutTags);

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createPostTag(createdPost.id, tagId)));
    }

    return createdPost;
  }

  public async updatePost(id: string, postData: Partial<PostCreate>): Promise<Post> {
    if (isEmpty(id)) throw new HttpException(400, 'CommentId is empty');

    const findPost = await DB.Posts.findByPk(id);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    const { tags, ...postDataWithoutTags } = postData;
    await DB.Posts.update(postDataWithoutTags, { where: { id } });

    if (tags?.length) {
      await Promise.all(tags.map(tagId => this.Tag.createPostTag(id, tagId)));
    }

    return findPost;
  }

  public async deletePost(id: string): Promise<Post> {
    const findPost = await DB.Posts.findByPk(id);
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    await DB.Posts.destroy({ where: { id: id } });

    const softDeletedPost = await DB.Posts.findByPk(id, { paranoid: false });
    if (!softDeletedPost) throw new HttpException(409, "Post doesn't exist after deletion");
    return softDeletedPost;
  }

  public async destroyPost(id: string): Promise<Post> {
    const findPost = await DB.Posts.findByPk(id, { paranoid: false });
    if (!findPost) throw new HttpException(409, "Post doesn't exist");

    await DB.Posts.destroy({ force: true, where: { id: id } });

    return findPost;
  }
}
