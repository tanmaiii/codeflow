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
  topicDeadline: string;
  status: boolean;
  maxGroupMembers: number;
  documents: IDocument[];
  tags: ITag[];
  author?: IUser;
  type: string;
}

export interface ICreateCourseDto {
  title: string;
  description: string;
  thumbnail?: string;
  startDate?: Date;
  endDate?: Date;
  topicDeadline?: Date;
  documents?: Array<string>;
  tags?: Array<string>;
  maxGroupMembers?: number;
}
