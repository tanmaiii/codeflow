import MySelect from '@/components/common/MySelect';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDarkMode } from '@/hooks';
import useQ_Course_GetCodeActivity from '@/hooks/query-hooks/Course/useQ_Course_GetCodeActivity';
import ReactECharts from 'echarts-for-react';
import { ChartArea, TrendingUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CodeActivityChartProps {
  courseId: string;
}

export default function CodeActivityChart({ courseId }: CodeActivityChartProps) {
  const { theme } = useDarkMode();
  const t = useTranslations('courseDashboard.charts.codeActivity');
  const t_common = useTranslations('common');
  const [selectedDays, setSelectedDays] = useState(7);

  const {
    data: codeActivityResponse,
    isLoading,
    error,
  } = useQ_Course_GetCodeActivity({
    courseId,
    days: selectedDays,
  });

  const codeActivity = codeActivityResponse?.data;

  const timeFilterOptions = [
    { label: t('7d'), value: 7 },
    { label: t('30d'), value: 30 },
    { label: t('3m'), value: 90 },
    { label: t('6m'), value: 180 },
    { label: t('1y'), value: 365 },
  ];

  const codeActivityOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
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
      data: [t('commits'), t('pullRequests'), t('codeAnalysis')],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data:
        codeActivity?.activities?.map(item => {
          const date = new Date(item.date);
          return `${date.getDate()}/${date.getMonth() + 1}`;
        }) || [],
      axisLabel: { color: theme.textColor },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: theme.textColor },
    },
    series: [
      {
        name: t('commits'),
        type: 'line',
        data: codeActivity?.activities?.map(item => item.commits) || [],
        smooth: true,
        itemStyle: { color: '#3b82f6' },
        lineStyle: { width: 3 },
        symbolSize: 6,
      },
      {
        name: t('pullRequests'),
        type: 'line',
        data: codeActivity?.activities?.map(item => item.pullRequests) || [],
        smooth: true,
        itemStyle: { color: '#10b981' },
        lineStyle: { width: 3 },
        symbolSize: 6,
      },
      {
        name: t('codeAnalysis'),
        type: 'line',
        data: codeActivity?.activities?.map(item => item.codeAnalysis) || [],
        smooth: true,
        itemStyle: { color: '#f59e0b' },
        lineStyle: { width: 3 },
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
