import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import { GitCommit, GitPullRequest } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ReposContribute() {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{t('repos.contribute')}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <MemberCard />
        <MemberCard />
        <MemberCard />
      </CardContent>
    </Card>
  );
}

export function MemberCard() {
  return (
    <div className="border rounded-lg p-3 space-y-3 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-2 justify-between">
        <MemberAvatar
          name={'Tấn Mãi'}
          // avatar={}
          size={30}
          description={'tanmaiii'}
          className="cursor-pointer"
        />

        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            <span className="text-green-600">+2</span>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-red-500">-4</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1 text-sm">
          <GitCommit className="w-4 h-4" />
          <span>10 commits</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <GitPullRequest className="w-4 h-4" />
          <span>10 pull requests</span>
        </div>
      </div>
    </div>
  );
}
