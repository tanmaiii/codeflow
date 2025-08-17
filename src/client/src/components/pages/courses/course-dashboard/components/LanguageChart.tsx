import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDarkMode } from '@/hooks';
import ReactECharts from 'echarts-for-react';
import { Code } from 'lucide-react';

export default function LanguageChart() {
  const { theme } = useDarkMode();

  // Dữ liệu gộp tất cả công nghệ
  const technologyData = [
    { name: 'JavaScript', value: 8, type: 'language' },
    { name: 'Python', value: 6, type: 'language' },
    { name: 'React', value: 5, type: 'library' },
    { name: 'Java', value: 4, type: 'language' },
    { name: 'Node.js', value: 4, type: 'library' },
    { name: 'C++', value: 3, type: 'language' },
    { name: 'Django', value: 3, type: 'library' },
    { name: 'PHP', value: 2, type: 'language' },
    { name: 'Spring Boot', value: 2, type: 'library' },
    { name: 'Laravel', value: 2, type: 'library' },
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
        const tech = technologyData.find(item => item.name === data.name);
        const type = tech?.type === 'language' ? 'Ngôn ngữ' : 'Thư viện';
        return `${data.name}<br/>${type}: ${data.value} đề tài`;
      },
    },
    legend: {
      data: ['Ngôn ngữ lập trình', 'Thư viện/Framework'],
      textStyle: { color: theme.textColor },
      bottom: 'bottom',
    },
    xAxis: {
      type: 'category',
      data: technologyData.map(item => item.name),
      axisLabel: {
        color: theme.textColor,
        interval: 0,
        rotate: 45,
      },
      axisTick: { show: false },
      axisLine: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: theme.textColor,
        formatter: '{value} đề tài',
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
        data: technologyData.map(item => ({
          value: item.value,
          itemStyle: {
            color: item.type === 'language' ? '#3b82f6' : '#10b981',
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="w-5 h-5" />
          Thống kê công nghệ
        </CardTitle>
        <CardDescription>
          Phân bố đề tài theo ngôn ngữ lập trình và thư viện trong khóa học
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={chartOptions} style={{ height: '400px' }} />
      </CardContent>
    </Card>
  );
}
