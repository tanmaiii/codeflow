export interface Group {
  id: string;
  name: string;
  topicId: string;
  authorId: string;
}

export interface GroupMember {
  id: string;
  groupId: string;
  userId: string;
  role: string;
}

export interface CreateGroupDto {
  name: string;
  topicId: string;
  authorId: string;
  members: string[];
}
