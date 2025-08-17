import { MemberContributeCard } from '@/components/common/MemberContributeCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useQ_Course_Contributors from '@/hooks/query-hooks/Course/useQ_Course_Contributors';
import { Users } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ActiveStudentsList({ courseId }: { courseId: string }) {
  const t = useTranslations('courseDashboard.lists.activeStudents');

  const { data: contributors } = useQ_Course_Contributors({ id: courseId });

  return (
    <Card className="lg:col-span-3">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            {contributors?.data?.slice(0, 4).map((contributor, index) => (
              <MemberContributeCard
                number={index + 1}
                key={contributor.authorId}
                contributor={contributor}
              />
            ))}
          </div>
          <div className="space-y-4">
            {contributors?.data?.slice(4, 8).map((contributor, index) => (
              <MemberContributeCard
                number={index + 5}
                key={contributor.authorId}
                contributor={contributor}
              />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
