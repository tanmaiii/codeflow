import { IBaseEntity } from './common';
import { ICourse } from './course';
import { IUser } from './user';
import { ITag } from './tags';

export interface ITopic extends IBaseEntity {
  id: string;
  title: string;
  description: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  courseId: string;
  status: string;
  author?: IUser;
  teacher?: IUser;
  tags: ITag[];
  course?: ICourse;
}

export interface ITopicCreateDto {
  title: string;
  description: string;
  courseId: string;
  teacherId?: string;
  isCustom?: boolean;
  status?: string;
}
