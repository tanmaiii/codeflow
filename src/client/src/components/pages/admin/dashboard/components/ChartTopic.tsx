import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';

export default function ChartTopic() {
  const { theme } = useDarkMode();

  const chartData = {
    projectStatus: [
      { name: 'Chấp nhận', value: 45 },
      { name: 'Xét duyệt', value: 28 },
      { name: 'Từ chối', value: 12 },
    ],
  };
  // Số lượng commit theo thời gian
  const createCommitActivityChartOption = {
    title: {
      text: 'Số lượng dự án theo trạng thái',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'nunito',
        color: theme.textColor,
      },
    },
    tooltip: {
      trigger: 'axis',
      formatter: '{b}: {c} dự án',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
    },
    xAxis: {
      type: 'category',
      data: chartData.projectStatus.map(item => item.name),
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
        formatter: (value: number) => `${value}`,
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
        data: chartData.projectStatus.map(item => item.value),
        type: 'bar',
        itemStyle: {
          color: (params: { dataIndex: number }) => {
            const colors = ['#10b981', '#f59e0b', '#ef4444']; // Xanh lá, Vàng, Đỏ
            return colors[params.dataIndex % colors.length];
          },
        },
      },
    ],
  };

  return <ChartWrapper option={createCommitActivityChartOption} />;
}
