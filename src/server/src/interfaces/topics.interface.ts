import { Course } from './courses.interface';
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
}

export interface TopicMember {
  id: string;
  topicId: string;
  userId: string;
  role: string;
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
