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
// import { GroupModel } from './groups.model';
// import { GroupMemberModel } from './groups_member.model';
import { CourseEnrollmentModel } from './course_enrollment.model';
import { TopicMemberModel } from './topic_member.mode';
import { TopicEvaluationsModel } from './topic_evaluations.model';

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
  CourseModel.belongsToMany(TagModel, { through: CourseTagModel, as: 'tags', foreignKey: 'courseId' });
  TagModel.belongsToMany(CourseModel, { through: CourseTagModel, as: 'courses', foreignKey: 'tagId' });

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

  // GroupModel.hasMany(GroupMemberModel, { foreignKey: 'groupId', as: 'members' });
  // GroupMemberModel.belongsTo(GroupModel, { foreignKey: 'groupId', as: 'group' });

  // GroupModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  // UserModel.hasMany(GroupModel, { foreignKey: 'authorId' });

  // GroupMemberModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  // UserModel.hasMany(GroupMemberModel, { foreignKey: 'userId', as: 'members' });

  // GroupModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });
  // TopicModel.hasMany(GroupModel, { foreignKey: 'topicId', as: 'group' });

  TopicModel.hasMany(TopicMemberModel, { foreignKey: 'topicId', as: 'members' });
  TopicMemberModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });

  TopicMemberModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  UserModel.hasMany(TopicMemberModel, { foreignKey: 'userId', as: 'members' });

  TopicModel.hasMany(TopicEvaluationsModel, { foreignKey: 'topicId', as: 'evaluations' });
  TopicEvaluationsModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });

  TopicEvaluationsModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  UserModel.hasMany(TopicEvaluationsModel, { foreignKey: 'userId', as: 'evaluations' });

  CourseEnrollmentModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  UserModel.hasMany(CourseEnrollmentModel, { foreignKey: 'userId', as: 'enrollments' });

  CourseEnrollmentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
  CourseModel.hasMany(CourseEnrollmentModel, { foreignKey: 'courseId', as: 'enrollments' });
};

export { CourseModel, UserModel, PostModel, TagModel, PostLikeModel };
