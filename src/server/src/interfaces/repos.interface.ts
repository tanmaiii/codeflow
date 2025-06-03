export interface Repos {
  id: string;
  name: string;
  url: string;
  courseId: string;
  topicId: string;
}

export interface RepoCreate {
  topicId: string;
}

export interface RepoUpdate {
  topicId: string;
  name: string;
  url: string;
}
