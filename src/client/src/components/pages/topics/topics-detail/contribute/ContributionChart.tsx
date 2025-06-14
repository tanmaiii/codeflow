import { useDarkMode } from '@/hooks/useDarkMode';
import ReactECharts from 'echarts-for-react';
import { useMemo } from 'react';
import { mockMemberData } from './constants';

export default function ContributionChart() {
  const { theme } = useDarkMode();

  const chartOptions = useMemo(() => {
    // Biểu đồ cột thể hiện số commits của từng thành viên
    const commitsChartOption = {
      title: {
        text: 'Số lượng Commits',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          color: theme.textColor,
        },
        top: 20,
        left: 20,
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} commits',
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.textColor,
        },
        borderWidth: 0,
        borderRadius: 8,
        extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
      },
      grid: {
        top: 80,
        left: 50,
        right: 30,
        bottom: 80,
      },
      xAxis: {
        type: 'category',
        data: mockMemberData.map(member => member.name.split(' ').slice(-1)[0]),
        axisLine: {
          lineStyle: {
            color: theme.axisLineColor,
            width: 2,
          },
        },
        axisLabel: {
          color: theme.textColor,
          rotate: 0,
          fontSize: 12,
          fontWeight: '500',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: theme.textColor,
          fontSize: 12,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            color: theme.splitLineColor,
            type: 'dashed',
          },
        },
      },
      series: [
        {
          data: mockMemberData.map((member, index) => ({
            value: member.commits,
            itemStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
                  },
                  {
                    offset: 1,
                    color: ['#93c5fd', '#6ee7b7', '#fcd34d', '#fca5a5', '#c4b5fd'][index % 5],
                  },
                ],
              },
              borderRadius: [4, 4, 0, 0],
            },
          })),
          type: 'bar',
          barWidth: '60%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
        },
      ],
    };

    // Biểu đồ tròn thể hiện tỷ lệ đóng góp code
    const codeContributionOption = {
      title: {
        text: 'Tỷ lệ đóng góp Code',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          color: theme.textColor,
        },
        top: 20,
        left: 20,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} dòng ({d}%)',
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.textColor,
        },
        borderWidth: 0,
        borderRadius: 8,
        extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        top: 'middle',
        textStyle: {
          color: theme.textColor,
          fontSize: 12,
        },
        itemGap: 15,
      },
      series: [
        {
          name: 'Dòng code',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['65%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: theme.backgroundColor,
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
              color: theme.textColor,
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          labelLine: {
            show: false,
          },
          data: mockMemberData.map((member, index) => ({
            value: member.linesAdded,
            name: member.name.split(' ').slice(-1)[0],
            itemStyle: {
              color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
            },
          })),
        },
      ],
    };

    // Biểu đồ radar thể hiện kỹ năng tổng hợp
    const skillRadarOption = {
      title: {
        text: 'Đánh giá kỹ năng tổng hợp',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          color: theme.textColor,
        },
        top: 20,
        left: 20,
      },
      tooltip: {
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.textColor,
        },
        borderWidth: 0,
        borderRadius: 8,
        extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
      },
      legend: {
        data: mockMemberData.map(member => member.name.split(' ').slice(-1)[0]),
        bottom: 20,
        textStyle: {
          color: theme.textColor,
          fontSize: 12,
        },
      },
      radar: {
        indicator: [
          { name: 'Commits', max: 50 },
          { name: 'Code Quality', max: 10 },
          { name: 'Tasks', max: 15 },
          { name: 'Collaboration', max: 10 },
          { name: 'Innovation', max: 10 },
        ],
        center: ['50%', '55%'],
        radius: 120,
        axisName: {
          color: theme.textColor,
          fontSize: 12,
        },
        splitLine: {
          lineStyle: {
            color: theme.splitLineColor,
          },
        },
        splitArea: {
          show: true,
          areaStyle: {
            color: [
              'rgba(114, 172, 209, 0.05)',
              'rgba(114, 172, 209, 0.1)',
              'rgba(114, 172, 209, 0.15)',
              'rgba(114, 172, 209, 0.2)',
              'rgba(114, 172, 209, 0.25)',
            ],
          },
        },
      },
      series: [
        {
          name: 'Kỹ năng',
          type: 'radar',
          data: mockMemberData.map((member, index) => ({
            value: [
              member.commits,
              member.score,
              member.tasksCompleted,
              Math.floor(Math.random() * 10) + 1,
              Math.floor(Math.random() * 10) + 1,
            ],
            name: member.name.split(' ').slice(-1)[0],
            itemStyle: {
              color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
            },
            areaStyle: {
              opacity: 0.2,
            },
          })),
        },
      ],
    };

    return {
      commitsChartOption,
      codeContributionOption,
      skillRadarOption,
    };
  }, [theme]);

  return (
    <div className="space-y-8">
      {/* Commits Chart */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20"></div>
        <div className="relative p-6 border border-blue-200/50 dark:border-blue-700/50 rounded-2xl backdrop-blur-sm">
          {/* <ChartWrapper className='bg-transparent' option={chartOptions.commitsChartOption} height="400px" /> */}
        <ReactECharts option={chartOptions.commitsChartOption} style={{ height: '400px' }} opts={{ renderer: 'svg' }} />
        </div>
      </div>

      {/* Code Contribution and Skill Radar Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Contribution Pie Chart */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/20 dark:to-emerald-950/20"></div>
          <div className="relative p-6 border border-green-200/50 dark:border-green-700/50 rounded-2xl backdrop-blur-sm">
            {/* <ChartWrapper option={chartOptions.codeContributionOption} height="400px" /> */}
            <ReactECharts option={chartOptions.codeContributionOption} style={{ height: '400px' }} opts={{ renderer: 'svg' }} />
          </div>
        </div>

        {/* Skill Radar Chart */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-950/20 dark:to-pink-950/20"></div>
          <div className="relative p-6 border border-purple-200/50 dark:border-purple-700/50 rounded-2xl backdrop-blur-sm">
            {/* <ChartWrapper option={chartOptions.skillRadarOption} height="400px" /> */}
            <ReactECharts option={chartOptions.skillRadarOption} style={{ height: '400px' }} opts={{ renderer: 'svg' }} />  
          </div>
        </div>
      </div>
    </div>
  );
} 