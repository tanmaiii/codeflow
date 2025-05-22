import { Service } from 'typedi';
import { DB } from '../database';
import { HttpException } from '../exceptions/HttpException';
import { Comment } from '../interfaces/comments.interface';
import { isEmpty } from '../utils/util';

@Service()
export class CommentService {
  public buildCommentTree = (comments, parentId = null) => {
    return comments
      .filter(comment => comment.parentId == parentId)
      .map(comment => ({
        ...comment.get({ plain: true }),
        replies: this.buildCommentTree(comments, comment.id),
      }));
  };

  public async findAllComment(): Promise<Comment[]> {
    const allComment: Comment[] = await DB.Comments.findAll({
      order: [['createdAt', 'DESC']],
    });
    return this.buildCommentTree(allComment);
  }

  public async findCommentById(commentId: string): Promise<Comment> {
    if (isEmpty(commentId)) throw new HttpException(400, 'CommentId is empty');
    const findComment = await DB.Comments.findByPk(commentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    return findComment;
  }

  public async findCommentByCourseId(courseId: string): Promise<Comment[]> {
    if (isEmpty(courseId)) throw new HttpException(400, 'CourseId is empty');
    const findComment = await DB.Comments.findAll({ where: { courseId } });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    // return findComment;
    return this.buildCommentTree(findComment);
  }

  public async findCommentByPostId(postId: string): Promise<Comment[]> {
    if (isEmpty(postId)) throw new HttpException(400, 'PostId is empty');
    const findComment = await DB.Comments.findAll({ where: { postId }, order: [['createdAt', 'DESC']] });
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    // return findComment;
    return this.buildCommentTree(findComment);
  }

  public async createComment(commentData: Partial<Comment>): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, 'commentData is empty');

    const createCommentData: Comment = await DB.Comments.create(commentData);
    return createCommentData;
  }

  public async updateComment(commentId: string, commentData: Comment): Promise<Comment> {
    if (isEmpty(commentData)) throw new HttpException(400, 'commentData is empty');

    const findComment: Comment = await DB.Comments.findByPk(commentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await DB.Comments.update(commentData, { where: { id: commentId } });

    const updateComment: Comment = await DB.Comments.findByPk(commentId);
    return updateComment;
  }

  public async deleteComment(commentId: string): Promise<Comment> {
    if (isEmpty(commentId)) throw new HttpException(400, 'CommentId is empty');

    const findComment: Comment = await DB.Comments.findByPk(commentId);
    if (!findComment) throw new HttpException(409, "Comment doesn't exist");

    await DB.Comments.destroy({ where: { id: commentId } });

    return findComment;
  }
}
