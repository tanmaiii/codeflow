// model
export interface Course {
  id: string;
  title: string;
  thumbnail?: string;
  description: string;
  authorId: string;
  startDate: Date;
  endDate: Date;
  regStartDate: Date;
  regEndDate: Date;
  topicDeadline: Date;
  status: boolean;
  maxGroupMembers: number;
  type: string;
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
  regStartDate?: Date;
  regEndDate?: Date;
  topicDeadline?: Date;
  status?: boolean;
  tags?: Array<string>;
  documents?: Array<string>;
}
