import { IBaseEntity, IGetAllQuery } from './common';
import { ICourse } from './course';
import { IUser } from './user';
import { ITag } from './tags';

export interface ITopicMember extends IBaseEntity {
  id: string;
  userId: string;
  topicId: string;
  role: string;
  user?: IUser;
}

export interface ITopic extends IBaseEntity {
  id: string;
  title: string;
  description: string;
  authorId: string;
  isCustom: boolean;
  courseId: string;
  status: string;
  author?: IUser;
  tags: ITag[];
  course?: ICourse;
  groupName?: string;
  members?: ITopicMember[];
}

export interface ITopicCreateDto {
  title: string;
  description: string;
  courseId: string;
  isCustom?: boolean;
  status?: string;
  groupName?: string;
  members?: string[];
}

export interface ITopicUpdateDto {
  title?: string;
  description: string;
  courseId: string;
  isCustom?: boolean;
  status?: string;
  groupName?: string;
  members?: string[];
}

export interface IGetAllTopicByUserIdParams extends IGetAllQuery {
  status: string;
}
