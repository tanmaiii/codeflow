import { IBaseEntity } from "./common";

export interface IUser extends IBaseEntity {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    password?: string;
    role: string
}