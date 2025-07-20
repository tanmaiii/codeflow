export interface Repos {
  id: string;
  name: string;
  url: string;
  courseId: string;
  topicId: string;
  authorId: string;
  language: string;
  framework: string;
  sonarKey: string;
}

export interface RepoCreate {
  name: string;
  topicId: string;
  authorId: string;
  language: string;
  framework: string;
}

export interface RepoUpdate {
  topicId: string;
  name: string;
  url: string;
  language: string;
  framework: string;
}
