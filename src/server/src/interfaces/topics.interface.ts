export interface Topic {
  id: string;
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
}

export interface TopicMember {
  id: string;
  topicId: string;
  userId: string;
  role: string;
}

export interface TopicCreate {
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  groupName: string;
  members?: Array<string>;
  tags?: Array<string>;
}
