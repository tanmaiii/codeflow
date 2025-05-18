import { IBaseEntity } from './common';
import { IUser } from './user';

interface IGroupMember extends IBaseEntity {
  id: string;
  groupId: string;
  userId: string;
  role: string;
  user: IUser;
}

export interface IGroup extends IBaseEntity {
  id: string;
  name: string;
  topicId: string;
  authorId: string;
  author?: IUser;
  members?: IGroupMember[];
}

export interface IGroupCreateDto {
  name: string;
  topicId: string;
  members: string[];
}
