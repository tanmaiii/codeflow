import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IRepos } from '@/interfaces/repos';
import { IconCode, IconGitCommit, IconGitPullRequest } from '@tabler/icons-react';
import CommitItem from './CommitItem';
import PullRequestItem from './PullRequestItem';
import CodeAnalysis from './code-analysis/CodeAnalysis';

interface PullRequest {
  id: string;
  number: number;
  title: string;
  description: string;
  status: 'open' | 'merged' | 'closed';
  author: {
    name: string;
    avatar: string;
  };
  createdAt: string;
  mergedAt?: string;
  closedAt?: string;
  branch: string;
  commits: number;
  additions: number;
  deletions: number;
}

interface Commit {
  id: string;
  hash: string;
  message: string;
  description?: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  additions: number;
  deletions: number;
}

interface PullRequestsAndCommitsProps {
  pullRequests: PullRequest[];
  commits: Commit[];
  repos: IRepos;
}

export default function RepoAnalysisAndActivity({
  pullRequests,
  commits,
  repos,
}: PullRequestsAndCommitsProps) {
  return (
    <Card>
      <Tabs defaultValue="code-analysis" className="w-full">
        <CardHeader>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="code-analysis" className="flex items-center gap-2">
              <IconCode className="size-4" />
              Code Analysis
            </TabsTrigger>
            <TabsTrigger value="pull-requests" className="flex items-center gap-2">
              <IconGitPullRequest className="size-4" />
              Pull Requests ({pullRequests.length})
            </TabsTrigger>
            <TabsTrigger value="commits" className="flex items-center gap-2">
              <IconGitCommit className="size-4" />
              Commits ({commits.length})
            </TabsTrigger>
          </TabsList>
        </CardHeader>

        <CardContent>
          <TabsContent value="code-analysis" className="space-y-4">
            <CodeAnalysis repos={repos} />
          </TabsContent>

          <TabsContent value="pull-requests" className="space-y-4">
            {pullRequests.map(pr => (
              <PullRequestItem key={pr.id} {...pr} />
            ))}
          </TabsContent>

          <TabsContent value="commits" className="space-y-4">
            {commits.map(commit => (
              <CommitItem key={commit.id} {...commit} />
            ))}
          </TabsContent>
        </CardContent>
      </Tabs>
    </Card>
  );
}
