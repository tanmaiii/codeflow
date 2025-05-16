import { CourseModel } from './courses.model';
import { PostModel } from './posts.model';
import { UserModel } from './users.model';
import { TagModel } from './tags.model';
import { CourseTagModel } from './course_tag.model';
import { PostTagModel } from './post_tag.model';
import { CommentModel } from './comments.model';
import { SubmissionModel } from './submissions.model';
import { TopicModel } from './topics.model';
import { TopicTagModel } from './topic_tag.model';
import { CourseDocumentModel } from './course_documents.model';
import { PostLikeModel } from './post_like.model';

export const initModels = () => {
  // author, teacher
  CourseModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  UserModel.hasMany(CourseModel, { foreignKey: 'authorId' });

  PostModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  UserModel.hasMany(PostModel, { foreignKey: 'authorId' });

  TopicModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  UserModel.hasMany(TopicModel, { foreignKey: 'authorId' });

  TopicModel.belongsTo(UserModel, { foreignKey: 'teacherId', as: 'teacher' });
  UserModel.hasMany(TopicModel, { foreignKey: 'teacherId' });

  // tags
  CourseModel.belongsToMany(TagModel, {
    through: CourseTagModel,
    as: 'tags',
    foreignKey: 'courseId',
  });
  TagModel.belongsToMany(CourseModel, {
    through: CourseTagModel,
    as: 'courses',
    foreignKey: 'tagId',
  });

  PostModel.belongsToMany(TagModel, { through: PostTagModel, as: 'tags', foreignKey: 'postId' });
  TagModel.belongsToMany(PostModel, { through: PostTagModel, as: 'posts', foreignKey: 'tagId' });

  TopicModel.belongsToMany(TagModel, { through: TopicTagModel, as: 'tags', foreignKey: 'topicId' });
  TagModel.belongsToMany(TopicModel, { through: TopicTagModel, as: 'topics', foreignKey: 'tagId' });

  CommentModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  CommentModel.hasMany(CommentModel, { foreignKey: 'parentId', as: 'replies' });

  CommentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
  CourseModel.hasMany(CommentModel, { foreignKey: 'courseId', as: 'comments' });
  CommentModel.belongsTo(PostModel, { foreignKey: 'postId', as: 'post' });
  PostModel.hasMany(CommentModel, { foreignKey: 'postId', as: 'comments' });

  SubmissionModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  UserModel.hasMany(SubmissionModel, { foreignKey: 'authorId', as: 'submissions' });
  SubmissionModel.belongsTo(CommentModel, { foreignKey: 'submissionId', as: 'submission' });

  CourseModel.hasMany(CourseDocumentModel, { foreignKey: 'courseId', as: 'documents' });
  CourseDocumentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

  CourseModel.hasMany(TopicModel, { foreignKey: 'courseId', as: 'topics' });
  TopicModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
};

export { CourseModel, UserModel, PostModel, TagModel, PostLikeModel };
