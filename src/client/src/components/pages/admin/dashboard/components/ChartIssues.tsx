import { ChartWrapper } from "@/components/common/ChartWrapper";
import { useDarkMode } from "@/hooks";

export default function ChartIssues() {
  const { theme } = useDarkMode();

  const issuesData = [
    { date: 'T1', critical: 5, high: 12, medium: 25, low: 40 },
    { date: 'T2', critical: 3, high: 15, medium: 30, low: 35 },
    { date: 'T3', critical: 7, high: 18, medium: 28, low: 38 },
    { date: 'T4', critical: 4, high: 14, medium: 32, low: 42 },
    { date: 'T5', critical: 6, high: 16, medium: 26, low: 36 },
    { date: 'T6', critical: 2, high: 10, medium: 22, low: 30 },
    { date: 'T7', critical: 1, high: 8, medium: 20, low: 28 }
  ];

  const Option = {
    title: {
      text: 'Số lượng Issues theo thời gian',
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
      data: ['Critical', 'High', 'Medium', 'Low'],
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
      data: issuesData.map(item => item.date),
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
        name: 'Critical',
        type: 'line',
        data: issuesData.map(item => item.critical),
        smooth: true,
        lineStyle: { color: '#ef4444', width: 3 },
        itemStyle: { color: '#ef4444' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(239, 68, 68, 0.3)' },
              { offset: 1, color: 'rgba(239, 68, 68, 0.1)' },
            ],
          },
        },
      },
      {
        name: 'High',
        type: 'line',
        data: issuesData.map(item => item.high),
        smooth: true,
        lineStyle: { color: '#f59e0b', width: 3 },
        itemStyle: { color: '#f59e0b' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(245, 158, 11, 0.3)' },
              { offset: 1, color: 'rgba(245, 158, 11, 0.1)' },
            ],
          },
        },
      },
      {
        name: 'Medium',
        type: 'line',
        data: issuesData.map(item => item.medium),
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
        name: 'Low',
        type: 'line',
        data: issuesData.map(item => item.low),
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
    ],
  };

  return <ChartWrapper option={Option} />;
}
