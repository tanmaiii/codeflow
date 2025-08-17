import { ChartWrapper } from "@/components/common/ChartWrapper";
import { useDarkMode } from "@/hooks";

export default function ChartCodeQuality() {
  const { theme } = useDarkMode();

  const qualityData = [
    { name: 'Maintainability', value: 85 },
    { name: 'Reliability', value: 92 },
    { name: 'Security', value: 78 },
    { name: 'Performance', value: 88 },
    { name: 'Test Coverage', value: 75 },
    { name: 'Code Duplication', value: 82 },
    { name: 'Documentation', value: 70 },
    { name: 'Standards', value: 90 }
  ];

  const Option = {
    title: {
      text: 'Chất lượng code tổng thể',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'nunito',
        color: theme.textColor,
      },
      left: 'center',
      top: 10,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}/100',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
    },
    legend: {
      orient: 'vertical',
      left: '5%',
      top: '15%',
      itemGap: 8,
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: 10,
        color: theme.textColor,
      },
    },
    radar: {
      indicator: qualityData.map(item => ({
        name: item.name,
        max: 100
      })),
      center: ['65%', '50%'],
      radius: '60%',
      axisName: {
        color: theme.textColor,
        fontSize: 10,
      },
      splitLine: {
        lineStyle: {
          color: theme.splitLineColor,
        },
      },
      splitArea: {
        show: false,
      },
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
    },
    series: [
      {
        name: 'Chất lượng',
        type: 'radar',
        data: [
          {
            value: qualityData.map(item => item.value),
            name: 'Điểm chất lượng',
            areaStyle: {
              color: 'rgba(59, 130, 246, 0.3)',
            },
            lineStyle: {
              color: '#3b82f6',
              width: 2,
            },
            itemStyle: {
              color: '#3b82f6',
            },
          },
        ],
      },
    ],
  };

  return <ChartWrapper option={Option} />;
}
