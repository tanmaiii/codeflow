import ActionModal from '@/components/common/Action/ActionModal';
import { Button } from '@/components/ui/button';
import { METRICS_CODE_ANALYSIS, STATUS_CODE_ANLYSIS } from '@/constants/object';
import { ENUM_METRICS_CODE_ANALYSIS } from '@/constants/enum';
import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { IconChartBar } from '@tabler/icons-react';
import ReactECharts from 'echarts-for-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';
import MemberAvatar from '@/components/ui/member-avatar';
import { useDarkMode } from '@/hooks';
import { utils_DateToDDMMYYYY_HHMM } from '../../../../utils/date';
import MyBadge from '@/components/common/MyBadge';

interface TooltipParam {
  axisValue: string;
  marker: string;
  seriesName: string;
  value: number;
}

export default function CodeAnalysisModal({ data }: { data: ICodeAnalysis }) {
  const t = useTranslations();
  const t_codeAnalysis = useTranslations('codeAnalysis');
  const { theme } = useDarkMode();

  const chartOption = useMemo(() => {
    if (!data?.metrics || data.metrics.length === 0) {
      return null;
    }

    // Filter out ncloc metric
    const filteredMetrics = data.metrics.filter(metric => metric.name.toLowerCase() !== 'ncloc');

    if (filteredMetrics.length === 0) {
      return null;
    }

    // Sắp xếp theo thứ tự ENUM_METRICS_CODE_ANALYSIS
    const enumOrder = Object.values(ENUM_METRICS_CODE_ANALYSIS);
    const sortedMetrics = filteredMetrics.sort((a, b) => {
      const indexA = enumOrder.indexOf(a.name as ENUM_METRICS_CODE_ANALYSIS);
      const indexB = enumOrder.indexOf(b.name as ENUM_METRICS_CODE_ANALYSIS);
      return indexA - indexB;
    });

    const metricNames = sortedMetrics.map(metric =>
      t(METRICS_CODE_ANALYSIS?.find(m => m.value === metric.name)?.labelKey || ''),
    );
    const currentValues = sortedMetrics.map(metric => metric.value);
    const bestValues = sortedMetrics.map(metric => {
      if (metric.bestValue === null || metric.bestValue === undefined) return 'Không có';
      return metric.bestValue;
    });

    return {
      textStyle: {
        fontSize: 14,
        fontFamily: 'Inter, sans-serif',
        color: theme.textColor,
      },
      title: {
        left: 'center',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: function (params: TooltipParam[]) {
          let result = `<strong>${params[0].axisValue}</strong><br/>`;
          params.forEach((param: TooltipParam) => {
            result += `${param.marker} ${param.seriesName}: ${param.value}<br/>`;
          });
          return result;
        },
      },
      legend: {
        data: ['Current Value', 'Best Value'],
        bottom: 10,
      },
      xAxis: {
        type: 'category',
        data: metricNames,
        textStyle: {
          fontSize: 14,
          fontFamily: 'Inter, sans-serif',
          color: theme.textColor,
        },
        axisLabel: {
          rotate: 45,
          fontSize: 12,
          textStyle: {
            fontSize: 12,
            fontFamily: 'Inter, sans-serif',
            color: theme.textColor,
          },
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontSize: 12,
        },
      },
      series: [
        {
          name: 'Value',
          type: 'bar',
          data: currentValues,
          itemStyle: {
            color: '#3b82f6',
          },
        },
        {
          name: 'Best value',
          type: 'bar',
          data: bestValues,
          itemStyle: {
            color: '#10b981',
          },
        },
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '15%',
        containLabel: true,
      },
    };
  }, [data?.metrics]);

  return (
    <ActionModal
      title={t_codeAnalysis('viewAnalysis')}
      actionType="non-icon"
      className="min-w-[800px]"
      icon={
        <Button variant="outline" size="sm" className="text-xs">
          <IconChartBar className="size-3 mr-1" />
          {t_codeAnalysis('viewAnalysis')}
        </Button>
      }
    >
      <div className="space-y-4">
        {data.author && (
          <div className="flex items-center gap-1">
            <MemberAvatar
              name={data.author.name || ''}
              avatar={data.author.avatar}
              description={data.author?.username}
              size={30}
              id={data.author.id}
            />
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">{t_codeAnalysis('branch')}:</span> {data.branch}
          </div>
          <div>
            <span className="font-medium">{t_codeAnalysis('status')}: </span>
            <MyBadge
              className="w-fit ml-2"
              status={STATUS_CODE_ANLYSIS.find(item => item.value === data?.status)!}
            />
          </div>
          <div>
            <span className="font-medium">Commit:</span>
            <code className="ml-1 text-xs bg-gray-100 px-1 rounded dark:bg-gray-500">
              {data.commitSha}
            </code>
          </div>
          <div>
            <span className="font-medium">{t_codeAnalysis('analyzedAt')}:</span>{' '}
            {utils_DateToDDMMYYYY_HHMM(data.analyzedAt)}
          </div>
        </div>

        {chartOption && data.metrics && data.metrics.length > 0 && (
          <div className="border rounded-lg p-4">
            <ReactECharts
              option={chartOption}
              style={{ height: '500px', width: '100%' }}
              opts={{ renderer: 'canvas' }}
            />
          </div>
        )}

        {(!data.metrics || data.metrics.length === 0) && (
          <div className="text-center py-8 text-gray-500">Không có dữ liệu metrics để hiển thị</div>
        )}
      </div>
    </ActionModal>
  );
}
