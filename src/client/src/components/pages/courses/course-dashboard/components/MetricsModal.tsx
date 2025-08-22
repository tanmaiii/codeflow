import ActionModal from '@/components/common/Action/ActionModal';
import CardMetric from '@/components/common/CardMetric/inrdex';
import { Button } from '@/components/ui/button';
import { ITopicMetrics } from '@/interfaces/code_analysis';
import { IconChartBar } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

export default function MetricsModal({ metrics }: { metrics: ITopicMetrics[] }) {
  const t = useTranslations();

  return (
    <ActionModal
      title={'Code anylics'}
      actionType="non-icon"
      className="min-w-[90vw] lg:min-w-[70vw]"
      icon={
        <Button variant="outline" size="sm" className="text-xs">
          <IconChartBar className="size-3 mr-1" />
          {t('common.all')}
        </Button>
      }
    >
      <div className="flex flex-col gap-4 pb-4">
        {/* <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <span className="text-md text-muted-foreground">{t('topic.title')}:</span>
            <span className="text-md">{topic?.title}</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-md text-muted-foreground">{t('topic.groupName')}:</span>
            <span className="text-md">{topic?.groupName}</span>
          </div>
        </div> */}
        <CardMetric metrics={metrics} />
      </div>
    </ActionModal>
  );
}
