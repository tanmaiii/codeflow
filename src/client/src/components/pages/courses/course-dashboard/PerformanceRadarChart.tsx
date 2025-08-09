import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDarkMode } from '@/hooks';
import ReactECharts from 'echarts-for-react';
import { GraduationCap } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mockClassPerformance } from './mockData';

export default function PerformanceRadarChart() {
  const { theme } = useDarkMode();
  const t = useTranslations('courseDashboard.charts.performanceRadar');

  const performanceRadarOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
    },
    radar: {
      indicator: [
        { name: t('attendance'), max: 100 },
        { name: t('completion'), max: 100 },
        { name: t('participation'), max: 100 },
        { name: t('engagement'), max: 100 },
        { name: t('punctuality'), max: 100 },
        { name: t('collaboration'), max: 100 },
      ],
      axisName: {
        color: theme.textColor,
        fontSize: 12,
      },
      splitLine: {
        lineStyle: { color: theme.textColor, opacity: 0.2 },
      },
      axisLine: {
        lineStyle: { color: theme.textColor, opacity: 0.3 },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [
              mockClassPerformance.avgAttendance,
              mockClassPerformance.avgCompletion,
              mockClassPerformance.avgParticipation,
              mockClassPerformance.avgEngagement,
              mockClassPerformance.avgPunctuality,
              mockClassPerformance.avgCollaboration,
            ],
            name: t('classPerformance'),
            itemStyle: { color: '#3b82f6' },
            areaStyle: { color: '#3b82f6', opacity: 0.2 },
          },
        ],
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={performanceRadarOptions} style={{ height: '400px' }} />
      </CardContent>
    </Card>
  );
}
