import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import MemberAvatar from '@/components/ui/member-avatar';
import TextHeading from '@/components/ui/text';
import { ENUM_METRICS_CODE_ANALYSIS } from '@/constants/enum';
import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { IRepos } from '@/interfaces/repos';
import { utils_DateToDDMMYYYY_HHMM } from '@/utils/date';
import {
  IconChartBar,
  IconCheck,
  IconClock,
  IconExternalLink,
  IconGitBranch,
  IconGitCommit,
  IconX,
} from '@tabler/icons-react';
import { MetricItem } from './MetricItem';

interface CodeAnalysisItemProps {
  data: ICodeAnalysis;
  repos: IRepos;
}

const STATUS_CONFIG = {
  completed: { icon: IconCheck, color: 'text-green-600', badge: 'bg-green-100 text-green-800 border-green-200' },
  success: { icon: IconCheck, color: 'text-green-600', badge: 'bg-green-100 text-green-800 border-green-200' },
  failed: { icon: IconX, color: 'text-red-600', badge: 'bg-red-100 text-red-800 border-red-200' },
  error: { icon: IconX, color: 'text-red-600', badge: 'bg-red-100 text-red-800 border-red-200' },
  pending: { icon: IconClock, color: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  running: { icon: IconClock, color: 'text-yellow-600', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  default: { icon: IconChartBar, color: 'text-blue-600', badge: 'bg-blue-100 text-blue-800 border-blue-200' },
};

const PRIORITY_METRICS = [
  ENUM_METRICS_CODE_ANALYSIS.SECURITY_RATING,
  ENUM_METRICS_CODE_ANALYSIS.RELIABILITY_RATING,
  ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS,
  ENUM_METRICS_CODE_ANALYSIS.COVERAGE,
  ENUM_METRICS_CODE_ANALYSIS.BUGS,
  ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES_DENSITY,
];

export default function CodeAnalysisItem({ data, repos }: CodeAnalysisItemProps) {
  const { id, branch, commitSha, status, analyzedAt, workflowRunId, author, metrics } = data;

  const getStatusConfig = (status: string) => {
    return STATUS_CONFIG[status.toLowerCase() as keyof typeof STATUS_CONFIG] || STATUS_CONFIG.default;
  };

  const handleOpenGitHub = () => {
    if (workflowRunId && repos.url) {
      window.open(`${repos.url}/actions/runs/${workflowRunId}`, '_blank');
    }
  };

  const handleOpenCommit = () => {
    if (repos.url) {
      window.open(`${repos.url}/commit/${commitSha}`, '_blank');
    }
  };

  const isAnalysisCompleted = () => {
    return ['completed', 'success'].includes(status.toLowerCase());
  };

  const getFilteredAndSortedMetrics = () => {
    if (!metrics?.length) return [];
    
    return metrics
      .filter(metric => PRIORITY_METRICS.includes(metric.name as ENUM_METRICS_CODE_ANALYSIS))
      .sort((a, b) => {
        const indexA = PRIORITY_METRICS.indexOf(a.name as ENUM_METRICS_CODE_ANALYSIS);
        const indexB = PRIORITY_METRICS.indexOf(b.name as ENUM_METRICS_CODE_ANALYSIS);
        return indexA - indexB;
      });
  };

  const statusConfig = getStatusConfig(status);
  const StatusIcon = statusConfig.icon;
  const sortedMetrics = getFilteredAndSortedMetrics();

  return (
    <div className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <StatusIcon className={`size-4 ${statusConfig.color}`} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <TextHeading
                className="font-semibold cursor-pointer hover:text-blue-600 transition-colors flex items-center gap-1"
                onClick={handleOpenGitHub}
              >
                Code Analysis #{id.slice(-8)}
                <IconExternalLink className="size-3 opacity-60" />
              </TextHeading>
              <Badge className={statusConfig.badge}>{status}</Badge>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-2">
          {isAnalysisCompleted() && (
            <Button variant="outline" size="sm" className="text-xs">
              <IconChartBar className="size-3 mr-1" />
              Xem phân tích
            </Button>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        {author && (
          <div className="flex items-center gap-1">
            <MemberAvatar
              name={author.name || ''}
              avatar={author.avatar}
              size={30}
              id={author.id}
            />
          </div>
        )}

        <div className="flex items-center gap-1">
          <IconGitBranch className="size-4" />
          <span>{branch}</span>
        </div>

        <div className="flex items-center gap-1">
          <IconGitCommit className="size-4" />
          <span
            className="cursor-pointer hover:text-blue-600 transition-colors"
            onClick={handleOpenCommit}
          >
            {commitSha.slice(0, 7)}
          </span>
        </div>

        <span>{utils_DateToDDMMYYYY_HHMM(analyzedAt)}</span>
      </div>

      {/* Metrics Section */}
      {sortedMetrics.length > 0 && (
        <div className="border-t pt-3">
          <div className="flex items-start gap-6 text-sm">
            {sortedMetrics.map(metric => (
              <MetricItem key={metric.id} metric={metric} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
