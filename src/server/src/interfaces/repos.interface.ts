export interface Repos {
  id: string;
  name: string;
  url: string;
  courseId: string;
  topicId: string;
}

export interface RepoCreate {
  courseId: string;
  topicId: string;
}
