import { IBaseEntity, IGetAllQuery } from './common';
import { ICourse } from './course';
import { IUser } from './user';
import { ITag } from './tags';
import { IRepos } from './repos';

export interface ITopicMember extends IBaseEntity {
  id: string;
  userId: string;
  topicId: string;
  role: string;
  user?: IUser;
}

export interface ITopicEvaluation extends IBaseEntity {
  id: string;
  evaluation: string;
  topicId: string;
  userId: string;
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
  evaluations?: ITopicEvaluation[];
  repos?: IRepos[];
}

export interface ITopicStats {
  topicId: string;
  commit: {
    total: number;
    additions: number;
    deletions: number;
  };
  pullRequest: {
    total: number;
    additions: number;
    deletions: number;
    open: number;
    closed: number;
    merged: number;
  };
  codeAnalysis: {
    total: number;
    success: number;
    failure: number;
  };
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

export interface ITopicEvaluationCreateDto {
  evaluation: string;
  topicId: string;
}

export interface ITopicEvaluationUpdateDto {
  evaluation: string;
  topicId: string;
}

export interface IGetAllTopicParams extends IGetAllQuery {
  status?: string;
}
