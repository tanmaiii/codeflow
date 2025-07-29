import MemberAvatar from '@/components/ui/member-avatar';
import { IReposContributors } from '@/interfaces/repos';
import { IconCode } from '@tabler/icons-react';
import { GitCommit, GitPullRequest } from 'lucide-react';

export function MemberContributeCard({ contributor }: { contributor: IReposContributors }) {
  return (
    <div className="border rounded-lg p-3 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2 justify-between">
        <MemberAvatar
          name={contributor.author.name}
          avatar={contributor.author.avatar}
          id={contributor.authorId}
          size={30}
          description={contributor.author.email}
          className="cursor-pointer"
        />

        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            <span className="text-green-600">+{contributor.commit.additions ?? 0}</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-red-500">-{contributor.commit.deletions ?? 0}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1 text-sm">
          <IconCode className="w-4 h-4" />
          <span>{contributor.codeAnalysis.total} analysis</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <GitCommit className="w-4 h-4" />
          <span>{contributor.commit.total} commits</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <GitPullRequest className="w-4 h-4" />
          <span>{contributor.pullRequest.total} pull requests</span>
        </div>
      </div>
    </div>
  );
}
