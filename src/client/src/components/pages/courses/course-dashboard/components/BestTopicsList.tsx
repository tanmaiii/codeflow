import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import { ITopic } from '@/interfaces/topic';
import { Star } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BestTopicsList({ courseId }: { courseId: string }) {
  const t = useTranslations('courseDashboard.lists.bestProjects');
  const { data: topics } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: 10,
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topics?.data.map((topic, index) => (
            <Topic key={topic.id} topic={topic} index={index} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

const Topic = ({ topic, index }: { topic: ITopic; index: number }) => {
  const t = useTranslations('courseDashboard.lists.bestProjects');
  return (
    <div
      key={topic.id}
      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
            #{index + 1}
          </div>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{topic.title}</h4>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>123 {t('students')}</span>
            <span>123{t('commits')}</span>
            <span>{t('mentor')}: 234</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4 text-right">
       
      </div>
    </div>
  );
};
