export interface Commits {
  id: string;
  reposId: string;
  commitHash: string;
  message: string;
  authorId: string;
  url: string;
}

export interface CommitReviews {
  id: string;
  commitId: string;
  reviewType: ReviewType;
  score: number;
  reviewerId: string;
  feedback: string;
  summary: string;
}

export enum ReviewType {
  HUMAN = 'human',
  AI = 'ai',
}

export interface CommitCreate {
  reposId: string;
  commitHash: string;
  message: string;
  authorId: string;
  url: string;
}

export interface CommitUpdate {
  reposId: string;
  commitHash: string;
  message: string;
  authorId: string;
  url: string;
}
