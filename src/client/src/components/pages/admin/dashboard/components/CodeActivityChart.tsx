import MySelect from '@/components/common/MySelect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDarkMode } from '@/hooks';
import useQ_Dashboard_GetCodeActivity from '@/hooks/query-hooks/Dashboard/useQ_Dashboard_GetCodeActivity';
import ReactECharts from 'echarts-for-react';
import { ChartArea, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function CodeActivityChart() {
  const { theme } = useDarkMode();
  const t = useTranslations('dashboard.charts.codeActivity');
  const t_common = useTranslations('common');
  const [selectedDays, setSelectedDays] = useState(7);

  const { data, isLoading, error } = useQ_Dashboard_GetCodeActivity({
    days: selectedDays,
  });

  const codeActivity = data?.data;

  const timeFilterOptions = [
    { label: t('7d'), value: 7 },
    { label: t('30d'), value: 30 },
    { label: t('3m'), value: 90 },
    { label: t('6m'), value: 180 },
    { label: t('1y'), value: 365 },
  ];

  const codeActivityOptions = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
      formatter: function (
        params: Array<{ axisValue: string; seriesName: string; value: number; color: string }>,
      ) {
        let result = `<div style="font-weight: 600;">${params[0].axisValue}</div>`;
        params.forEach(param => {
          result += `<div style="margin: 4px 0;"><span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background-color: ${param.color}; margin-right: 8px;"></span>${param.seriesName}: ${param.value}</div>`;
        });
        return result;
      },
    },
    legend: {
      data: ['Commits', 'Pull Requests', 'Code Analysis'],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data: codeActivity?.activities?.map(item => `${item.date}`),
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      axisLabel: {
        color: theme.textColor,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: theme.textColor,
      },
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      splitLine: {
        lineStyle: {
          color: theme.splitLineColor,
        },
      },
    },
    series: [
      {
        name: 'Commits',
        data: codeActivity?.activities?.map(item => item.commits),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(139, 92, 246, 0.3)' },
              { offset: 1, color: 'rgba(139, 92, 246, 0.1)' },
            ],
          },
        },
        lineStyle: { color: '#8b5cf6', width: 3 },
        itemStyle: { color: '#8b5cf6' },
        symbolSize: 6,
      },
      {
        name: 'Pull Requests',
        data: codeActivity?.activities?.map(item => item.pullRequests),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.1)' },
            ],
          },
        },
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' },
        symbolSize: 6,
      },
      {
        name: 'Code Analysis',
        data: codeActivity?.activities?.map(item => item.codeAnalysis),
        type: 'line',
        smooth: true,
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0.1)' },
            ],
          },
        },
        lineStyle: { color: '#f59e0b', width: 3 },
        itemStyle: { color: '#f59e0b' },
        symbolSize: 6,
      },
    ],
  };

  if (isLoading) return <Skeleton className="w-full h-[400px]" />;
  if (error) return <div>Error</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              {t('title')}
            </CardTitle>
            <CardDescription>{t('description')}</CardDescription>
          </div>
          <div className="flex gap-2">
            <MySelect
              options={[
                ...(timeFilterOptions.map(option => {
                  return {
                    labelKey: option.label,
                    value: option.value.toString(),
                  };
                }) ?? []),
              ]}
              size="sm"
              defaultValue={selectedDays.toString()}
              name="selectedDays"
              className="min-w-[120px]"
              isTranslate={false}
              onChange={value => setSelectedDays(Number(value))}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {codeActivity?.activities?.length ? (
          <ReactECharts option={codeActivityOptions} style={{ height: '300px' }} />
        ) : (
          <div className="flex items-center justify-center h-[300px]">
            <ChartArea className="w-12 h-12 text-zinc-400" />
            <p className="text-md opacity-50 font-medium mt-2 text-center">{t_common('noData')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
