import { ChartData } from '../types';

interface ChartTheme {
  textColor: string;
  gridColor: string;
  backgroundColor: string;
  axisLineColor: string;
  splitLineColor: string;
}

// TODO: Điểm trung bình theo thời gian
export const createScoresChartOption = (chartData: ChartData, theme: ChartTheme) => ({
  title: {
    text: 'Điểm trung bình theo thời gian',
    textStyle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      fontFamily: 'nunito',
      color: theme.textColor
    },
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c} điểm',
    backgroundColor: theme.backgroundColor,
    textStyle: {
      color: theme.textColor
    }
  },
  xAxis: {
    type: 'category',
    data: chartData.scores.map(item => item.date),
    axisLine: {
      lineStyle: {
        color: theme.axisLineColor
      }
    },
    axisLabel: {
      color: theme.textColor
    }
  },
  yAxis: {
    type: 'value',
    min: 0,
    max: 10,
    axisLabel: {
      formatter: (value: number) => `${value}`,
      color: theme.textColor
    },
    axisLine: {
      lineStyle: {
        color: theme.axisLineColor
      }
    },
    splitLine: {
      lineStyle: {
        color: theme.splitLineColor
      }
    }
  },
  series: [
    {
      data: chartData.scores.map(item => item.value),
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
            { offset: 0, color: 'rgba(34, 197, 94, 0.3)' },
            { offset: 1, color: 'rgba(34, 197, 94, 0.1)' },
          ],
        },
      },
      lineStyle: { color: '#22c55e' },
      itemStyle: { color: '#22c55e' },
    },
  ],
});

// TODO: Số dự án mới
export const createProjectsChartOption = (chartData: ChartData, theme: ChartTheme) => ({
  title: {
    text: 'Số dự án nộp mới',
    textStyle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      fontFamily: 'nunito',
      color: theme.textColor
    },
  },
  tooltip: {
    trigger: 'axis',
    formatter: '{b}: {c} dự án',
    backgroundColor: theme.backgroundColor,
    textStyle: {
      color: theme.textColor
    }
  },
  xAxis: {
    type: 'category',
    data: chartData.projects.map(item => item.date),
    axisLine: {
      lineStyle: {
        color: theme.axisLineColor
      }
    },
    axisLabel: {
      color: theme.textColor
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: theme.textColor
    },
    axisLine: {
      lineStyle: {
        color: theme.axisLineColor
      }
    },
    splitLine: {
      lineStyle: {
        color: theme.splitLineColor
      }
    }
  },
  series: [
    {
      data: chartData.projects.map(item => item.value),
      type: 'bar',
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: '#93c5fd' },
          ],
        },
      },
    },
  ],
});

// TODO: Phân bố điểm số
export const createScoreDistributionOption = (chartData: ChartData, theme: ChartTheme) => ({
  title: {
    text: 'Phân bố điểm số',
    textStyle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      fontFamily: 'nunito',
      color: theme.textColor
    },
    left: 'center',
    top: 10,
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
    backgroundColor: theme.backgroundColor,
    textStyle: {
      color: theme.textColor
    }
  },
  legend: {
    orient: 'vertical',
    left: '70%',
    top: '15%',
    itemGap: 8,
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 12,
      color: theme.textColor
    },
  },
  series: [
    {
      name: 'Điểm số',
      type: 'pie',
      radius: ['30%', '65%'],
      center: ['35%', '50%'],
      data: chartData.scoreDistribution,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      itemStyle: {
        borderRadius: 5,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        show: true,
        formatter: '{d}%',
        position: 'inside',
      },
    },
  ],
});

// TODO: Loại dự án
export const createProjectTypesOption = (chartData: ChartData, theme: ChartTheme) => ({
  title: {
    text: 'Loại dự án',
    textStyle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      fontFamily: 'nunito',
      color: theme.textColor
    },
    left: 'center',
    top: 10,
  },
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {c}%',
    backgroundColor: theme.backgroundColor,
    textStyle: {
      color: theme.textColor
    }
  },
  legend: {
    orient: 'vertical',
    left: '5%',
    top: '15%',
    itemGap: 8,
    itemWidth: 12,
    itemHeight: 12,
    textStyle: {
      fontSize: 12,
      color: theme.textColor
    },
  },
  series: [
    {
      name: 'Loại dự án',
      type: 'pie',
      radius: ['30%', '65%'],
      center: ['65%', '50%'],
      data: chartData.projectTypes,
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)',
        },
      },
      label: {
        show: true,
        formatter: '{d}%',
        position: 'inside',
      },
    },
  ],
});

// TODO: Hoạt động hệ thống theo giờ
export const createActivityChartOption = (chartData: ChartData, theme: ChartTheme) => ({
  title: {
    text: 'Hoạt động hệ thống theo giờ',
    textStyle: { 
      fontSize: 16, 
      fontWeight: 'bold', 
      fontFamily: 'nunito',
      color: theme.textColor
    },
  },
  tooltip: {
    trigger: 'axis',
    formatter: 'Giờ {b}: {c} hoạt động',
    backgroundColor: theme.backgroundColor,
    textStyle: {
      color: theme.textColor
    }
  },
  xAxis: {
    type: 'category',
    data: chartData.activity.map(item => `${item.hour}:00`),
    axisLine: {
      lineStyle: {
        color: theme.axisLineColor
      }
    },
    axisLabel: {
      color: theme.textColor
    }
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      color: theme.textColor
    },
    axisLine: {
      lineStyle: {
        color: theme.axisLineColor
      }
    },
    splitLine: {
      lineStyle: {
        color: theme.splitLineColor
      }
    }
  },
  series: [
    {
      data: chartData.activity.map(item => item.value),
      type: 'bar',
      itemStyle: {
        color: (params: { dataIndex: number }) => {
          const colors = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
          return colors[params.dataIndex % colors.length];
        },
      },
    },
  ],
});
