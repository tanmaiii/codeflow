import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useQ_GitHub_GetRepoInfo from '@/hooks/query-hooks/Github/useQ_GitHub_GetRepoInfo';

export default function RepositoryStats({ repoName }: { repoName: string }) {
  const { data } = useQ_GitHub_GetRepoInfo({ repoName });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Repository Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pull Requests</span>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                {data?.pull_requests_open} open
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {data?.pull_requests_closed} closed
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {data?.pull_requests_merged} merged
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Commits</span>
            <span className="text-sm">{data?.commits}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="text-sm">
              {data?.created_at ? new Date(data?.created_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Updated</span>
            <span className="text-sm">
              {data?.updated_at ? new Date(data?.updated_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Pushed</span>
            <span className="text-sm">
              {data?.pushed_at ? new Date(data?.pushed_at).toLocaleDateString() : 'N/A'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
