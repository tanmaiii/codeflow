import { Course } from './courses.interface';
import { User } from './users.interface';
import { IUser } from '../../../client/src/interfaces/user';
export interface Topic {
  id: string;
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
  course?: Course;
  members?: TopicMember[];
  author?: User;
}

export interface TopicMember {
  id: string;
  topicId: string;
  userId: string;
  role: string;
  user?: User;
}

export interface TopicEvaluations {
  id: string;
  topicId: string;
  userId: string;
  evaluation: string;
}

export interface TopicCreate {
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
  members?: Array<string>;
  tags?: Array<string>;
}
