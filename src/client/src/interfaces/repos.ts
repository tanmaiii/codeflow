import { IBaseEntity } from './common';
import { ITopic } from './topic';

export interface IRepos extends IBaseEntity {
  id: string;
  name: string;
  description: string;
  topicId: string;
  topic: ITopic;
}

export interface IReposCreateDto {
  name: string;
  topicId: string;
  url: string;
}

export interface IReposUpdateDto {
  name: string;
  topicId: string;
  url: string;
}
