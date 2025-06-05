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
import { CourseEnrollmentModel } from './course_enrollment.model';
import { TopicMemberModel } from './topic_member.mode';
import { TopicEvaluationsModel } from './topic_evaluations.model';
import { NotificationModel } from './notification.model';
import { ReposModel } from './repos.model';

export const initModels = () => {
  // User Model Relations
  UserModel.hasMany(CourseModel, { foreignKey: 'authorId' });
  UserModel.hasMany(PostModel, { foreignKey: 'authorId' });
  UserModel.hasMany(TopicModel, { foreignKey: 'authorId' });
  UserModel.hasMany(TopicModel, { foreignKey: 'teacherId' });
  UserModel.hasMany(CommentModel, { foreignKey: 'authorId' });
  UserModel.hasMany(SubmissionModel, { foreignKey: 'authorId', as: 'submissions' });
  UserModel.hasMany(TopicMemberModel, { foreignKey: 'userId', as: 'members' });
  UserModel.hasMany(TopicEvaluationsModel, { foreignKey: 'userId', as: 'evaluations' });
  UserModel.hasMany(CourseEnrollmentModel, { foreignKey: 'userId', as: 'enrollments' });
  UserModel.hasMany(NotificationModel, { foreignKey: 'authorId', as: 'sentNotifications' });
  UserModel.hasMany(NotificationModel, { foreignKey: 'userId', as: 'receivedNotifications' });

  // Course Model Relations
  CourseModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  CourseModel.belongsToMany(TagModel, { through: CourseTagModel, as: 'tags', foreignKey: 'courseId' });
  CourseModel.hasMany(CommentModel, { foreignKey: 'courseId', as: 'comments' });
  CourseModel.hasMany(CourseDocumentModel, { foreignKey: 'courseId', as: 'documents' });
  CourseModel.hasMany(TopicModel, { foreignKey: 'courseId', as: 'topics' });
  CourseModel.hasMany(CourseEnrollmentModel, { foreignKey: 'courseId', as: 'enrollments' });
  CourseModel.hasMany(NotificationModel, { foreignKey: 'courseId', as: 'notifications' });
  CourseModel.hasMany(CourseTagModel, { foreignKey: 'courseId', as: 'courseTag' });
  CourseModel.hasMany(ReposModel, { foreignKey: 'courseId', as: 'repos' });

  // Post Model Relations
  PostModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  PostModel.belongsToMany(TagModel, { through: PostTagModel, as: 'tags', foreignKey: 'postId' });
  PostModel.hasMany(CommentModel, { foreignKey: 'postId', as: 'comments' });
  PostModel.hasMany(NotificationModel, { foreignKey: 'postId', as: 'notifications' });

  // Topic Model Relations
  TopicModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  TopicModel.belongsTo(UserModel, { foreignKey: 'teacherId', as: 'teacher' });
  TopicModel.belongsToMany(TagModel, { through: TopicTagModel, as: 'tags', foreignKey: 'topicId' });
  TopicModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
  TopicModel.hasMany(TopicMemberModel, { foreignKey: 'topicId', as: 'members' });
  TopicModel.hasMany(TopicEvaluationsModel, { foreignKey: 'topicId', as: 'evaluations' });
  TopicModel.hasMany(NotificationModel, { foreignKey: 'topicId', as: 'notifications' });
  
  // Tag Model Relations
  TagModel.belongsToMany(CourseModel, { through: CourseTagModel, as: 'courses', foreignKey: 'tagId' });
  TagModel.belongsToMany(PostModel, { through: PostTagModel, as: 'posts', foreignKey: 'tagId' });
  TagModel.belongsToMany(TopicModel, { through: TopicTagModel, as: 'topics', foreignKey: 'tagId' });

  // CourseTag Model Relations
  CourseTagModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
  CourseTagModel.belongsTo(TagModel, { foreignKey: 'tagId', as: 'tag' });

  // Comment Model Relations
  CommentModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  CommentModel.hasMany(CommentModel, { foreignKey: 'parentId', as: 'replies' });
  CommentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
  CommentModel.belongsTo(PostModel, { foreignKey: 'postId', as: 'post' });

  // Submission Model Relations
  SubmissionModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  SubmissionModel.belongsTo(CommentModel, { foreignKey: 'submissionId', as: 'submission' });

  // CourseDocument Model Relations
  CourseDocumentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

  // TopicMember Model Relations
  TopicMemberModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });
  TopicMemberModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

  // TopicEvaluations Model Relations
  TopicEvaluationsModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });
  TopicEvaluationsModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });

  // CourseEnrollment Model Relations
  CourseEnrollmentModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  CourseEnrollmentModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });

  // Notification Model Relations
  NotificationModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  NotificationModel.belongsTo(UserModel, { foreignKey: 'userId', as: 'user' });
  NotificationModel.belongsTo(CourseModel, { foreignKey: 'courseId', as: 'course' });
  NotificationModel.belongsTo(PostModel, { foreignKey: 'postId', as: 'post' });
  NotificationModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });
  NotificationModel.belongsTo(ReposModel, { foreignKey: 'reposId', as: 'repos' });

  // Repos Model Relations
  ReposModel.hasMany(NotificationModel, { foreignKey: 'reposId', as: 'notifications' });
  ReposModel.belongsTo(UserModel, { foreignKey: 'authorId', as: 'author' });
  ReposModel.belongsTo(TopicModel, { foreignKey: 'topicId', as: 'topic' });
};

export { CourseModel, UserModel, PostModel, TagModel, PostLikeModel };
