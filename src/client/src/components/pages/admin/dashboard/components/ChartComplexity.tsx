import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';

export default function ChartComplexity() {
  const { theme } = useDarkMode();

  const complexityData = [
    {
      module: 'User Management',
      complexity: 8.5,
      duplication: 12,
      maintainability: 75,
      lines: 1200,
    },
    {
      module: 'Authentication',
      complexity: 6.2,
      duplication: 8,
      maintainability: 85,
      lines: 800,
    },
    {
      module: 'File Upload',
      complexity: 9.1,
      duplication: 15,
      maintainability: 65,
      lines: 1500,
    },
    {
      module: 'API Gateway',
      complexity: 7.8,
      duplication: 10,
      maintainability: 78,
      lines: 1100,
    },
    {
      module: 'Database Layer',
      complexity: 5.5,
      duplication: 6,
      maintainability: 90,
      lines: 600,
    },
    {
      module: 'Frontend UI',
      complexity: 8.9,
      duplication: 18,
      maintainability: 70,
      lines: 2000,
    },
  ];

  const Option = {
    title: {
      text: 'Độ phức tạp và trùng lặp code',
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
      formatter: function (params: { dataIndex: number }[]) {
        const data = complexityData[params[0].dataIndex];
        return `${data.module}<br/>
                Độ phức tạp: ${data.complexity}/10<br/>
                Trùng lặp: ${data.duplication}%<br/>
                Khả năng bảo trì: ${data.maintainability}/100<br/>
                Số dòng: ${data.lines}`;
      },
    },
    legend: {
      data: ['Độ phức tạp', 'Trùng lặp (%)', 'Khả năng bảo trì'],
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
      data: complexityData.map(item => item.module),
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
      },
      axisLabel: {
        color: theme.textColor,
        rotate: 45,
        fontSize: 10,
      },
    },
    yAxis: [
      {
        type: 'value',
        name: 'Độ phức tạp / Khả năng bảo trì',
        min: 0,
        max: 10,
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
      {
        type: 'value',
        name: 'Trùng lặp (%)',
        min: 0,
        max: 20,
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
          show: false,
        },
      },
    ],
    series: [
      {
        name: 'Độ phức tạp',
        type: 'bar',
        yAxisIndex: 0,
        data: complexityData.map(item => item.complexity),
        itemStyle: {
          color: '#ef4444',
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: 'Trùng lặp (%)',
        type: 'bar',
        yAxisIndex: 1,
        data: complexityData.map(item => item.duplication),
        itemStyle: {
          color: '#f59e0b',
          borderRadius: [4, 4, 0, 0],
        },
      },
      {
        name: 'Khả năng bảo trì',
        type: 'line',
        yAxisIndex: 0,
        data: complexityData.map(item => item.maintainability / 10), // Scale down to 0-10
        smooth: true,
        lineStyle: { color: '#10b981', width: 3 },
        itemStyle: { color: '#10b981' },
        symbol: 'circle',
        symbolSize: 8,
      },
    ],
  };

  return <ChartWrapper option={Option} />;
}
