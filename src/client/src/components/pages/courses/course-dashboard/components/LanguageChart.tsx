import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDarkMode } from '@/hooks';
import useQ_Repos_GetFramework from '@/hooks/query-hooks/Repos/useQ_Repos_GetFramework';
import ReactECharts from 'echarts-for-react';
import { Code, Users2 } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function LanguageChart({ courseId }: { courseId: string }) {
  const { theme } = useDarkMode();
  const t = useTranslations('courseDashboard.charts.language');

  const { data: frameworkResponse, isLoading, isError } = useQ_Repos_GetFramework({ id: courseId });

  const frameworkData = frameworkResponse?.data.map(item => ({
    framework: item.framework,
    count: item.count,
  }));

  const colors = [
    '#3b82f6', // Blue
    '#10b981', // Green
    '#f59e0b', // Yellow
    '#ef4444', // Red
    '#8b5cf6', // Purple
    '#06b6d4', // Cyan
    '#f97316', // Orange
    '#ec4899', // Pink
    '#84cc16', // Lime
    '#6366f1', // Indigo
  ];

  const chartOptions = {
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
      formatter: function (params: { name: string; value: number }[]) {
        const data = params[0];
        return `${data.name}<br/>${data.value} topic`;
      },
    },
    legend: {
      data: ['Ngôn ngữ lập trình', 'Thư viện/Framework'],
      textStyle: { color: theme.textColor },
      bottom: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: frameworkData?.map(item => item.framework),
      axisLabel: {
        color: theme.textColor,
        interval: 0,
        rotate: 45,
        fontSize: 12,
        margin: 15,
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: { color: theme.splitLineColor },
      },
      axisLine: {
        show: true,
        lineStyle: { color: theme.splitLineColor },
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: theme.textColor,
        formatter: '{value} topic',
        fontSize: 12,
        margin: 10,
      },
      axisTick: {
        show: true,
        lineStyle: { color: theme.splitLineColor },
      },
      axisLine: {
        show: true,
        lineStyle: { color: theme.splitLineColor },
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: theme.splitLineColor,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: 'Số lượng đề tài',
        type: 'bar',
        data: frameworkData?.map((item, index) => ({
          value: item.count,
          itemStyle: {
            color: colors[index % colors.length],
          },
        })),
        barWidth: '60%',
        label: {
          show: true,
          position: 'top',
          color: theme.textColor,
          fontSize: 12,
        },
      },
    ],
  };

  if (isLoading) return <Skeleton className="w-full h-[300px]" />;
  if (isError) return <div>Error</div>;

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent className="p-2">
        {frameworkData && frameworkData.length > 0 ? (
          <ReactECharts option={chartOptions} style={{ height: '300px' }} />
        ) : (
          <div className="flex flex-col items-center justify-center py-30 w-full">
            <Users2 className="w-12 h-12 text-gray-400 mb-4" />
            <p className="text-gray-500 text-center">{'No active students found'}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// const mockData = [
//   { framework: 'JavaScript', count: 10 },
//   { framework: 'Python', count: 8 },
//   { framework: 'Java', count: 6 },
//   { framework: 'C++', count: 4 },
//   { framework: 'C#', count: 2 },
// ];
