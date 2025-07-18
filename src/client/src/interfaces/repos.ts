import { IBaseEntity } from './common';
import { ITopic } from './topic';
import { IUser } from './user';

export interface IRepos extends IBaseEntity {
  id: string;
  name: string;
  topicId: string;
  url: string;
  authorId: string;
  courseId: string;
  author: IUser;
  language: string;
  framework: string;
  topic: ITopic;
}

export interface IReposCreateDto {
  name: string;
  topicId: string;
  language: string;
  framework: string;
}

export interface IReposUpdateDto {
  name: string;
  language: string;
  topicId: string;
  framework: string;
}
