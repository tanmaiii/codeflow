export interface Submission {
  id: string;
  groupId: string;
  topicId: string;
  commit_hash: string;
  evaluation: string;
  submittedAt: Date;
}
