import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

interface RepositoryStatsProps {
  pullRequests: {
    open: number;
    merged: number;
    closed: number;
  };
  totalCommits: number;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export default function RepositoryStats({
  pullRequests,
  totalCommits,
  createdAt,
  updatedAt,
  deletedAt,
}: RepositoryStatsProps) {
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
                {pullRequests.open} open
              </Badge>
              <Badge variant="secondary" className="text-xs">
                {pullRequests.merged} merged
              </Badge>
            </div>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Total Commits</span>
            <span className="text-sm">{totalCommits}</span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Created</span>
            <span className="text-sm">
              {createdAt ? new Date(createdAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          <Separator />

          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Last Updated</span>
            <span className="text-sm">
              {updatedAt ? new Date(updatedAt).toLocaleDateString() : 'N/A'}
            </span>
          </div>

          {deletedAt && (
            <>
              <Separator />
              <div className="flex justify-between items-center">
                <span className="text-sm text-red-500">Deleted</span>
                <span className="text-sm text-red-500">
                  {new Date(deletedAt).toLocaleDateString()}
                </span>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 