import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useQ_GitHub_GetRepoInfo from '@/hooks/query-hooks/Github/useQ_GitHub_GetRepoInfo';
import { useTranslations } from 'next-intl';

export default function RepositoryStats({ repoName }: { repoName: string }) {
  const { data } = useQ_GitHub_GetRepoInfo({ repoName });
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('repos.reposInfo')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pull Requests</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {data?.pull_requests_open} {t('repos.pullRequest_open')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {data?.pull_requests_closed} {t('repos.pullRequest_close')}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {data?.pull_requests_merged} {t('repos.pullRequest_merged')}
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.totalCommits')}</span>
            <span className="text-sm">{data?.commits}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.created')}</span>
            <span className="text-sm">
              {data?.created_at ? new Date(data?.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.updated')}</span>
            <span className="text-sm">
              {data?.updated_at ? new Date(data?.updated_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">{t('repos.pushed')}</span>
            <span className="text-sm">
              {data?.pushed_at ? new Date(data?.pushed_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
