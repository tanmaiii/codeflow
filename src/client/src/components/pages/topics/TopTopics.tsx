import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useQ_Topics_GetTop } from '@/hooks/query-hooks/Topics/useQ_Topics_GetTop';
import { ITopic } from '@/interfaces/topic';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { IconGitBranch, IconUsers, IconCode, IconGitPullRequest, IconChartBar, IconTrophy } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TopTopicsProps {
  courseId?: string;
  limit?: number;
}

const sortOptions = [
  { value: 'activityScore', label: 'Activity Score', icon: IconTrophy },
  { value: 'memberCount', label: 'Members', icon: IconUsers },
  { value: 'reposCount', label: 'Repositories', icon: IconGitBranch },
  { value: 'codeAnalysis', label: 'Code Analysis', icon: IconChartBar },
];

export default function TopTopics({ courseId, limit = 5 }: TopTopicsProps) {
  const t = useTranslations('topic');
  const [sortBy, setSortBy] = useState<'activityScore' | 'memberCount' | 'reposCount' | 'codeAnalysis'>('activityScore');

  const { data, isLoading, error } = useQ_Topics_GetTop({
    limit,
    sortBy,
    courseId,
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getStatValue = (topic: ITopic) => {
    switch (sortBy) {
      case 'activityScore':
        return topic.activityScore || 0;
      case 'memberCount':
        return topic.memberCount || 0;
      case 'reposCount':
        return topic.reposCount || 0;
      case 'codeAnalysis':
        return topic.codeAnalysis?.total || topic.codeAnalysisCount || 0;
      default:
        return 0;
    }
  };

  const getStatIcon = () => {
    const option = sortOptions.find(opt => opt.value === sortBy);
    return option ? option.icon : IconTrophy;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTrophy className="h-5 w-5" />
            Top Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: limit }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconTrophy className="h-5 w-5" />
            Top Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Error loading top topics</p>
        </CardContent>
      </Card>
    );
  }

  const topics = data?.data || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <IconTrophy className="h-5 w-5" />
            Top Topics
          </CardTitle>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center gap-2">
                    <option.icon className="h-4 w-4" />
                    {option.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {topics.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">No topics found</p>
        ) : (
          <div className="space-y-3">
            {topics.map((topic, index) => {
              const StatIcon = getStatIcon();
              const statValue = getStatValue(topic);
              
              return (
                <div key={topic.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/topics/${topic.id}`} className="block">
                        <h4 className="font-medium text-sm truncate hover:text-primary transition-colors">
                          {topic.title}
                        </h4>
                      </Link>
                      {topic.course && (
                        <p className="text-xs text-muted-foreground truncate">
                          {topic.course.title}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-sm">
                      <StatIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{formatNumber(statValue)}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {topic.status}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        
        {topics.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <Link href="/topics">
              <Button variant="outline" className="w-full">
                View All Topics
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
