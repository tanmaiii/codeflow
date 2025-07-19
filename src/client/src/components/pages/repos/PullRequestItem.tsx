import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import TextHeading from '@/components/ui/text';
import {
  IconCheck,
  IconClock,
  IconGitBranch,
  IconGitCommit,
  IconGitPullRequest,
  IconRobot,
  IconX,
  IconExternalLink,
} from '@tabler/icons-react';

interface PullRequestItemProps {
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
  repositoryUrl?: string; // GitHub repository URL (e.g., "https://github.com/owner/repo")
  aiReview?: {
    status: 'pending' | 'completed' | 'failed' | 'not_started';
    score?: number;
    reviewedAt?: string;
  };
  onAIReview?: (prId: string) => void;
}

export default function PullRequestItem({
  id,
  number,
  title,
  description,
  status,
  author,
  createdAt,
  branch,
  commits,
  additions,
  deletions,
  aiReview,
  onAIReview,
  repositoryUrl = 'https://github.com/owner/repo',
}: PullRequestItemProps) {
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
    const isReviewing = aiReview?.status === 'pending';
    const isCompleted = aiReview?.status === 'completed';

    if (isCompleted) {
      return (
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1 text-green-600">
            <IconRobot className="size-4" />
            <span>Đã review ({aiReview?.score}/10)</span>
          </div>
          <Button size="sm" variant="outline" onClick={() => onAIReview?.(id)} className="text-xs">
            Review lại
          </Button>
        </div>
      );
    }

    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => onAIReview?.(id)}
        disabled={isReviewing}
        className="flex items-center gap-2"
      >
        <IconRobot className="size-4" />
        {isReviewing ? 'Đang review...' : 'Review bằng AI'}
      </Button>
    );
  };

  const handleOpenGitHub = () => {
    const githubPRUrl = `${repositoryUrl}/pull/${number}`;
    window.open(githubPRUrl, '_blank');
  };

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          {getPRStatusIcon(status)}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TextHeading
                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={handleOpenGitHub}
              >
                #{number} {title}
                <IconExternalLink className="size-3 opacity-60" />
              </TextHeading>
              <Badge className={getPRStatusColor(status)}>{status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">{getAIReviewButton()}</div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1">
          <Avatar className="size-5">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{author.name}</span>
        </div>

        <div className="flex items-center gap-1">
          <IconGitBranch className="size-4" />
          <span>{branch}</span>
        </div>

        <div className="flex items-center gap-1">
          <IconGitCommit className="size-4" />
          <span>{commits} commits</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-green-600">+{additions}</span>
          <span className="text-red-600">-{deletions}</span>
        </div>

        <span>{new Date(createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
