import { IBaseEntity } from "./common";
import { ITag } from "./tags";
import { IUser } from "./user";

// interface IComment {
//   id: string;
//   content: string;
// }

export interface IPost extends IBaseEntity {
  id: string;
  title: string;
  content: string;
  authorId: string;
  thumbnail?: string;
  author?: IUser;
  commentCount: number;
  likeCount: number;
  tags: ITag[];
}

export interface ICreatePostDto {
  title: string;
  content: string;
  thumbnail?: string;
}
