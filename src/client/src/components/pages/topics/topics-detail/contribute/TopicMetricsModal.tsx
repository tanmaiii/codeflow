import ActionModal from '@/components/common/Action/ActionModal';
import ChartMetrics from '@/components/common/MyChart/ChartMetrics';
import { Button } from '@/components/ui/button';
import { ITopicMetrics } from '@/interfaces/code_analysis';
import { IconChartBar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function TopicMetricsModal({ metrics }: { metrics: ITopicMetrics[] }) {
  const t = useTranslations('common');
  return (
    <ActionModal
      title={'Code anylics'}
      actionType="non-icon"
      className="min-w-[90vw] lg:min-w-[70vw]"
      icon={
        <Button variant="outline" size="sm" className="text-xs">
          <IconChartBar className="size-3 mr-1" />
          {t('all')}
        </Button>
      }
    >
      <ChartMetrics metrics={metrics} />
    </ActionModal>
  );
}
