export interface Repos {
  id: string;
  name: string;
  url: string;
  courseId: string;
  topicId: string;
}

export interface RepoCreate {
  name: string;
  url: string;
  courseId: string;
  topicId: string;
  groupId: string;
}
