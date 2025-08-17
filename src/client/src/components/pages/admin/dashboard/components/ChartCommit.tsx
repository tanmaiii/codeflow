import { ChartWrapper } from '@/components/common/ChartWrapper';
import MySelect from '@/components/common/MySelect';
import { useDarkMode } from '@/hooks';

const timeFilters = [
  { label: '7 ngày qua', value: '7d' },
  { label: '30 ngày qua', value: '30d' },
  { label: '3 tháng qua', value: '3m' },
  { label: '6 tháng qua', value: '6m' },
];

export default function ChartCommit() {
  const { theme } = useDarkMode();

  const chartData = {
    activity: [
      { date: '2025-08-15', value: 10 },
      { date: '2025-08-16', value: 20 },
      { date: '2025-08-17', value: 12 },
      { date: '2025-08-18', value: 15 },
      { date: '2025-08-19', value: 5 },
      { date: '2025-08-20', value: 16 },
    ],
  };

  // Số lượng commit theo thời gian
  const createCommitActivityChartOption = {
    tooltip: {
      trigger: 'axis',
      formatter: 'Giờ {b}: {c} commit',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
    },
    xAxis: {
      type: 'category',
      data: chartData.activity.map(item => `${item.date}`),
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
        data: chartData.activity.map(item => item.value),
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
        lineStyle: { color: '#8b5cf6' },
        itemStyle: { color: '#8b5cf6' },
      },
    ],
  };

  return (
    <ChartWrapper
      option={createCommitActivityChartOption}
      label="Số lượng commit theo thời gian"
      rightComponent={
        <MySelect
          options={[
            ...(timeFilters.map(option => {
              return {
                labelKey: option.label,
                value: option.value,
              };
            }) ?? []),
          ]}
          size="sm"
          // defaultValue={selectedTimeframe}
          name="selectedTimeframe"
          className="min-w-[120px]"
          isTranslate={false}
          // onChange={value => setSelectedTimeframe(value)}
        />
      }
    />
  );
}
