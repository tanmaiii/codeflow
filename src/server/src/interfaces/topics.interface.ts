export interface Topic {
  id: string;
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
}

export interface TopicCreate {
  title: string;
  description: string;
  courseId: string;
  teacherId: string;
  authorId: string;
  isCustom: boolean;
  status: string;
  tags?: Array<string>;
}
