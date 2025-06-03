import { IBaseEntity } from './common';

export interface IUser extends IBaseEntity {
  id: string;
  name: string;
  uid?: string;
  username: string;
  email: string;
  avatar?: string;
  password?: string;
  status?: 'active' | 'inactive';
  role: string;
}

export interface IUserCreate {
  name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
}
