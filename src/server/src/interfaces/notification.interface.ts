import { ENUM } from "sequelize";

export interface Notification {
  id: string;
  type: ENUM_TYPE_NOTIFICATION;
  title: string;
  message: string;
  userId?: string;
  authorId?: string;
  topicId?: string;
  courseId?: string;
  postId?: string;
  reposId?: string;
  isRead: boolean;
  link: string;
}

export enum ENUM_TYPE_NOTIFICATION {
  TOPIC_EVALUATION = 'TOPIC_EVALUATION',
  TOPIC_COMMENT = 'TOPIC_COMMENT',
  TOPIC_UPDATE = 'TOPIC_UPDATE',
  SYSTEM = 'SYSTEM',
}

