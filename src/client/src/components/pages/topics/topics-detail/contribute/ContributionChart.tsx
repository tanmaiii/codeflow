import ChartAdditions from '@/components/common/MyChart/ChartAdditions';
import ChartAnalysis from '@/components/common/MyChart/ChartAnalysis';
import ChartCodeChanges from '@/components/common/MyChart/ChartCodeChanges';
import ChartContribution from '@/components/common/MyChart/ChartContribution';
import ChartMemberRadar from '@/components/common/MyChart/ChartMemberRadar';
import ChartMetrics from '@/components/common/MyChart/ChartMetrics';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { useQ_CodeAnalysis_GetByTopicId } from '@/hooks/query-hooks/CodeAnalysis/useQ_CodeAnalysis_GetByTopicId';
import useQ_Topic_Contributors from '@/hooks/query-hooks/Topic/useQ_Topic_Contributors';
import { ITopic } from '@/interfaces/topic';
import { TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import TopicMetricsModal from './TopicMetricsModal';

export default function ContributionChart({ topic }: { topic: ITopic }) {
  const { data: contributors } = useQ_Topic_Contributors({
    id: topic.id,
  });
  const t = useTranslations('topic');

  const { data: metrics } = useQ_CodeAnalysis_GetByTopicId(topic.id);

  if (!metrics?.data) return null;

  return (
    <Card className="p-4 md:p-8 min-h-[500px]">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-xl bg-gradient-to-r from-slate-600 to-zinc-700 shadow-lg">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <TextHeading className="text-xl font-bold">{t('contributionChart')}</TextHeading>
          <TextDescription className="text-gray-600 dark:text-gray-300">
            {t('contributionChartDescription')}
          </TextDescription>
        </div>
      </div>
      <div className="my-4">
        <div className="flex flex-row justify-between">
          <TextHeading className="text-xl font-bold">{t('codeAnalysic')}</TextHeading>
          <TopicMetricsModal metrics={metrics?.data} />
        </div>
        <div>{metrics?.data && <ChartMetrics metrics={metrics?.data?.slice(0, 5)} />}</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartCodeChanges contributors={contributors?.data ?? []} />
        <ChartAdditions contributors={contributors?.data ?? []} />
      </div>
      <ChartContribution contributors={contributors?.data ?? []} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChartMemberRadar contributors={contributors?.data ?? []} />
        <ChartAnalysis contributors={contributors?.data ?? []} />
      </div>
    </Card>
  );
}
