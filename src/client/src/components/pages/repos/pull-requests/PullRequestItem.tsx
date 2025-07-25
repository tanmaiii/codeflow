import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { IPullRequest, IRepos } from '@/interfaces/repos';
import { utils_DateToDDMMYYYY_HHMM } from '@/utils/date';
import {
  IconCheck,
  IconClock,
  IconExternalLink,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconRobot,
  IconX,
} from '@tabler/icons-react';

export default function PullRequestItem({
  pullRequest,
  repos,
}: {
  pullRequest: IPullRequest;
  repos: IRepos;
}) {
  const getPRStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <IconClock className="size-4 mt-1 text-blue-500" />;
      case 'merged':
        return <IconCheck className="size-4 mt-1 text-green-500" />;
      case 'closed':
        return <IconX className="size-4 mt-1 text-red-500" />;
      default:
        return <IconGitPullRequest className="size-4 mt-1" />;
    }
  };

  const getPRStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'merged':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'closed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getAIReviewButton = () => {
    // const isReviewing = aiReview?.status === 'pending';
    // const isCompleted = aiReview?.status === 'completed';
    const isReviewing = false;
    const isCompleted = true;

    if (isCompleted) {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-green-600">
            <IconRobot className="size-4" />
            <span>Đã review 5/10</span>
          </div>
          <Button size="sm" variant="outline" onClick={()=>{}} className="text-xs">
            Review lại
          </Button>
        </div>
      );
    }

    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => {}}
        disabled={isReviewing}
        className="flex items-center gap-2"
      >
        <IconRobot className="size-4" />
        {isReviewing ? 'Đang review...' : 'Review bằng AI'}
      </Button>
    );
  };

  const handleOpenPull = () => {
    if (repos.url) {
      window.open(`${repos.url}/pull/${pullRequest.pullNumber}`, '_blank');
    }
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getPRStatusIcon(pullRequest.status)}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TextHeading
                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={handleOpenPull}
              >
                #{pullRequest.pullNumber} {pullRequest.title}
                <IconExternalLink className="size-3 opacity-60" />
              </TextHeading>
              <Badge className={getPRStatusColor(pullRequest.status)}>{pullRequest.status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{pullRequest.body}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">{getAIReviewButton()}</div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <MemberAvatar
            name={pullRequest.author.name || ''}
            avatar={pullRequest.author.avatar}
            size={26}
            id={pullRequest.author.id}
          />
        </div>
        <Badge
          variant="outline"
          className="flex items-center gap-1 px-1 py-0.5 rounded-sm bg-amber-600/10 dark:bg-amber-600/20"
        >
          <IconGitBranch className="size-4 text-amber-500" />
          <span className="text-amber-500">{pullRequest.headBranch}</span>
        </Badge>
        <div className="flex items-center gap-1">
          <IconGitCommit className="size-4" />
          <span>{pullRequest.commitCount} commits</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-600">+{pullRequest.additions}</span>
          <span className="text-red-600">-{pullRequest.deletions}</span>
        </div>
        <span>{utils_DateToDDMMYYYY_HHMM(pullRequest.createdAt || new Date())}</span>
      </div>
    </div>
  );
}
