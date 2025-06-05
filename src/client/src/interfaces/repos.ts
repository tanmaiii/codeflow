import { IBaseEntity } from './common';
import { IUser } from './user';

export interface IRepos extends IBaseEntity {
  id: string;
  name: string;
  description: string;
  topicId: string;
  url: string;
  authorId: string;
  author: IUser;
}

export interface IReposCreateDto {
  name: string;
  topicId: string;
}

export interface IReposUpdateDto {
  name: string;
  topicId: string;
}
