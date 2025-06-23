import { IBaseEntity } from './common';
import { ITag } from './tags';
import { IUser } from './user';

export interface IDocument {
  id: string;
  title: string;
  courseId: string;
  url: string;
}

export interface ICourse extends IBaseEntity {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  authorId: string;
  startDate: string;
  endDate: string;
  regStartDate: string;
  regEndDate: string;
  topicDeadline: string;
  status: boolean;
  maxGroupMembers: number;
  topicCount: number;
  documents: IDocument[];
  enrollmentCount: number;
  tags: ITag[];
  author?: IUser;
  type: string;
}

export interface ICourseEnrollment {
  id: string;
  userId: string;
  courseId: string;
  status: boolean;
  user?: IUser;
}

export interface ICreateCourseDto {
  title: string;
  description: string;
  thumbnail?: string;
  startDate?: Date;
  endDate?: Date;
  regStartDate?: Date;
  regEndDate?: Date;
  topicDeadline?: Date;
  documents?: Array<string>;
  tags?: Array<string>;
  maxGroupMembers?: number;
  type?: string;
}
