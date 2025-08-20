import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ITopic } from '@/interfaces/topic';
import { IconGitBranch, IconUsers, IconCode, IconGitPullRequest, IconChartBar, IconTrophy } from '@tabler/icons-react';

interface TopicStatsProps {
  topic: ITopic;
}

const stats = [
  {
    key: 'activityScore',
    label: 'Activity Score',
    icon: IconTrophy,
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50',
  },
  {
    key: 'memberCount',
    label: 'Members',
    icon: IconUsers,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
  },
  {
    key: 'reposCount',
    label: 'Repositories',
    icon: IconGitBranch,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
  },
  {
    key: 'commit',
    label: 'Commits',
    icon: IconCode,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
  },
  {
    key: 'pullRequest',
    label: 'Pull Requests',
    icon: IconGitPullRequest,
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
  },
  {
    key: 'codeAnalysis',
    label: 'Code Analysis',
    icon: IconChartBar,
    color: 'text-red-600',
    bgColor: 'bg-red-50',
  },
];

export default function TopicStats({ topic }: TopicStatsProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatValue = (key: string) => {
    switch (key) {
      case 'activityScore':
        return topic.activityScore || 0;
      case 'memberCount':
        return topic.memberCount || 0;
      case 'reposCount':
        return topic.reposCount || 0;
      case 'commit':
        return topic.commit?.total || 0;
      case 'pullRequest':
        return topic.pullRequest?.total || 0;
      case 'codeAnalysis':
        return topic.codeAnalysis?.total || 0;
      default:
        return 0;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IconTrophy className="h-5 w-5" />
          Topic Statistics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            const value = getStatValue(stat.key);
            
            return (
              <div
                key={stat.key}
                className={`p-4 rounded-lg border ${stat.bgColor} hover:shadow-md transition-shadow`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className={`text-lg font-bold ${stat.color}`}>
                      {formatNumber(value)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
                 {topic.activityScore && topic.activityScore > 0 && (
           <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
             <div className="flex items-center gap-2 mb-2">
               <IconTrophy className="h-5 w-5 text-yellow-600" />
               <h4 className="font-semibold text-yellow-800">Activity Score Breakdown</h4>
             </div>
             <p className="text-sm text-yellow-700">
               This score is calculated based on repositories ({topic.reposCount || 0} × 10), 
               members ({topic.memberCount || 0} × 5), commits ({(topic.commit?.total || topic.commitsCount) || 0} × 2), 
               and pull requests ({(topic.pullRequest?.total || topic.pullRequestsCount) || 0} × 3).
             </p>
           </div>
         )}
      </CardContent>
    </Card>
  );
}
