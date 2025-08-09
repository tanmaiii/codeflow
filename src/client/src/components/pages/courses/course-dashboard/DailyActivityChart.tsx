import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDarkMode } from '@/hooks';
import ReactECharts from 'echarts-for-react';
import { Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mockDailyActivity } from './mockData';

export default function DailyActivityChart() {
  const { theme } = useDarkMode();
  const t = useTranslations('courseDashboard.charts.dailyActivity');

  const activityChartOptions = {
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
    },
    legend: {
      data: [t('logins'), t('submissions'), t('discussions')],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data: mockDailyActivity.map(item => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      axisLabel: { color: theme.textColor },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: theme.textColor },
    },
    series: [
      {
        name: t('logins'),
        type: 'bar',
        data: mockDailyActivity.map(item => item.logins),
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: t('submissions'),
        type: 'bar',
        data: mockDailyActivity.map(item => item.submissions),
        itemStyle: { color: '#10b981' },
      },
      {
        name: t('discussions'),
        type: 'bar',
        data: mockDailyActivity.map(item => item.discussions),
        itemStyle: { color: '#f59e0b' },
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={activityChartOptions} style={{ height: '350px' }} />
      </CardContent>
    </Card>
  );
}
