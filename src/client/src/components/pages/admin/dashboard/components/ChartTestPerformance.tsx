import { ChartWrapper } from "@/components/common/ChartWrapper";
import { useDarkMode } from "@/hooks";

export default function ChartTestPerformance() {
  const { theme } = useDarkMode();

  const testData = [
    { date: 'T1', coverage: 65, performance: 78, unitTests: 45, integrationTests: 20 },
    { date: 'T2', coverage: 68, performance: 80, unitTests: 48, integrationTests: 22 },
    { date: 'T3', coverage: 72, performance: 82, unitTests: 52, integrationTests: 25 },
    { date: 'T4', coverage: 75, performance: 85, unitTests: 55, integrationTests: 28 },
    { date: 'T5', coverage: 78, performance: 87, unitTests: 58, integrationTests: 30 },
    { date: 'T6', coverage: 80, performance: 89, unitTests: 60, integrationTests: 32 },
    { date: 'T7', coverage: 82, performance: 91, unitTests: 62, integrationTests: 35 }
  ];

  const Option = {
    title: {
      text: 'Test Coverage & Performance',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'nunito',
        color: theme.textColor,
      },
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
    },
    legend: {
      data: ['Test Coverage', 'Performance', 'Unit Tests', 'Integration Tests'],
      textStyle: {
        color: theme.textColor,
      },
      top: 30,
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '15%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: testData.map(item => item.date),
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      axisLabel: {
        color: theme.textColor,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Percentage (%)',
        min: 0,
        max: 100,
        axisLabel: {
          color: theme.textColor,
          formatter: '{value}%',
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
      {
        type: 'value',
        name: 'Count',
        min: 0,
        max: 70,
        axisLabel: {
          color: theme.textColor,
        },
        axisLine: {
          lineStyle: {
            color: theme.axisLineColor,
          },
        },
        splitLine: {
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Test Coverage',
        type: 'line',
        yAxisIndex: 0,
        data: testData.map(item => item.coverage),
        smooth: true,
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.1)' },
            ],
          },
        },
      },
      {
        name: 'Performance',
        type: 'line',
        yAxisIndex: 0,
        data: testData.map(item => item.performance),
        smooth: true,
        lineStyle: { color: '#3b82f6', width: 3 },
        itemStyle: { color: '#3b82f6' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(59, 130, 246, 0.3)' },
              { offset: 1, color: 'rgba(59, 130, 246, 0.1)' },
            ],
          },
        },
      },
      {
        name: 'Unit Tests',
        type: 'bar',
        yAxisIndex: 1,
        data: testData.map(item => item.unitTests),
        itemStyle: {
          color: '#f59e0b',
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: 'Integration Tests',
        type: 'bar',
        yAxisIndex: 1,
        data: testData.map(item => item.integrationTests),
        itemStyle: {
          color: '#8b5cf6',
          borderRadius: [4, 4, 0, 0],
        },
      },
    ],
  };

  return <ChartWrapper option={Option} />;
}
