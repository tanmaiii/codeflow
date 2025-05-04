// model
export interface Course {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  authorId: string;
  startDate: Date;
  endDate: Date;
  topicDeadline: Date;
  status: boolean;
  maxGroupMembers: number;
}

// model
export interface CourseDocument {
  id: string;
  title: string;
  courseId: string;
  url: string;
}

// DTO
export interface CourseCreate {
  title?: string;
  description?: string;
  authorId?: string;
  startDate?: Date;
  endDate?: Date;
  topicDeadline?: Date;
  status?: boolean;
  tags?: Array<string>;
  documents?: Array<string>;
}
