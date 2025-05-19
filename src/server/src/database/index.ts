import { initModels } from '@/models';
import CommentModel from '@/models/comments.model';
import CourseDocument from '@/models/course_documents.model';
import CourseEnrollmentModel from '@/models/course_enrollment.model';
import CourseTagModel from '@/models/course_tag.model';
import CourseModel from '@/models/courses.model';
import GroupModel from '@/models/groups.model';
import GroupMemberModel from '@/models/groups_member.model';
import PostLikeModel from '@/models/post_like.model';
import PostTagModel from '@/models/post_tag.model';
import PostModel from '@/models/posts.model';
import ReposModel from '@/models/repos.model';
import SubmissionModel from '@/models/submissions.model';
import TagModel from '@/models/tags.model';
import TopicTagModel from '@/models/topic_tag.model';
import TopicModel from '@/models/topics.model';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '@config';
import UserModel from '@models/users.model';
import { logger } from '@utils/logger';
import Sequelize from 'sequelize';
const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  timezone: '+09:00',
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: NODE_ENV === 'development',
  logging: (query, time) => {
    logger.info(time + 'ms' + ' ' + query);
  },
  benchmark: true,
});

sequelize.authenticate();

export const DB = {
  Users: UserModel(sequelize),
  Posts: PostModel(sequelize),
  Courses: CourseModel(sequelize),
  Topics: TopicModel(sequelize),
  Groups: GroupModel(sequelize),
  GroupMembers: GroupMemberModel(sequelize),
  Submission: SubmissionModel(sequelize),
  Comments: CommentModel(sequelize),
  Tags: TagModel(sequelize),
  CourseTag: CourseTagModel(sequelize),
  PostTag: PostTagModel(sequelize),
  TopicTag: TopicTagModel(sequelize),
  CourseDocument: CourseDocument(sequelize),
  PostLike: PostLikeModel(sequelize),
  Repos: ReposModel(sequelize),
  CourseEnrollment: CourseEnrollmentModel(sequelize),
  sequelize, 
};

initModels();
