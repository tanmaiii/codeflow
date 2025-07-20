export interface CodeAnalysis {
  id: string;
  reposId: string;
  branch: string;
  commitSha: string; // commit sha của branch
  status: string;
  analyzedAt: Date;
  workflowRunId: string;
}

export interface CodeAnalysisMetrics {
  codeAnalysisId: string;
  name: string;
  value: string;
  bestValue: boolean;
}

export interface CodeAnalysisCreate {
  reposId: string;
  branch: string;
  commitSha: string;
  status: string;
  workflowRunId: string;
  analyzedAt: Date;
}

export interface CodeAnalysisUpdate {
  reposId: string;
  branch: string;
  commitSha: string;
  status: string;
  workflowRunId: string;
}