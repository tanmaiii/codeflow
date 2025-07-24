export interface PullRequests {
  id: string;
  reposId: string;
  number: number;
  title: string;
  body: string;
  state: string;
  mergedAt?: Date;
  closedAt?: Date;
  authorId: string;
  branch: string;
  sourceBranch: string;
  targetBranch: string;
  commitCount: number;
  additions: number;
  deletions: number;
}
