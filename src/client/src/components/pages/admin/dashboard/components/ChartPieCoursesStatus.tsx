import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDarkMode } from '@/hooks';
import ReactECharts from 'echarts-for-react';
import { Clock } from 'lucide-react';

export default function ChartPieCoursesStatus() {
  const { theme } = useDarkMode();

  const statisticsData = [
    { name: 'Tổng khóa học', value: 12, color: '#3b82f6' },
    { name: 'Khóa học đang hoạt động', value: 8, color: '#10b981' },
    { name: 'Khóa học đã kết thúc', value: 4, color: '#6b7280' },
  ];

  const chartOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
      formatter: '{a} <br/>{b}: {c}',
    },
    legend: {
      orient: 'horizontal',
      bottom: 'bottom',
      textStyle: { color: theme.textColor },
    },
    series: [
      {
        name: 'Thống kê khóa học',
        type: 'pie',
        radius: '60%',
        center: ['50%', '45%'],
        data: statisticsData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: true,
          formatter: '{b}: {c}',
          color: theme.textColor,
        },
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Thống kê khóa học
        </CardTitle>
        <CardDescription>Tổng quan về tình trạng các khóa học trong hệ thống</CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={chartOptions} style={{ height: '300px' }} />
      </CardContent>
    </Card>
  );
}
