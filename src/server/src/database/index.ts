import Sequelize from 'sequelize';
import { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import { logger } from '@utils/logger';
import PostModel from '@/models/posts.model';
import CourseModel from '@/models/courses.model';
import UserModel from '@models/users.model';
import TopicModel from '@/models/topics.model';
import GroupModel from '@/models/groups.model';
import GroupMemberModel from '@/models/groups_member.model';
import SubmissionModel from '@/models/submissions.model';
import CommentModel from '@/models/comments.model';

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
  Comment: CommentModel(sequelize),
  sequelize, // connection instance (RAW queries)
  Sequelize, // library
};
