import { ChartWrapper } from '@/components/common/ChartWrapper';
import TitleHeader from '@/components/layout/TitleHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TextDescription } from '@/components/ui/text';
import { useDarkMode } from '@/hooks/useDarkMode';
import { Award, Code2, GitCommit, Star, Target, TrendingUp, Trophy, Users } from 'lucide-react';
import React, { useMemo } from 'react';

interface MemberContribution {
  id: string;
  name: string;
  avatar?: string;
  commits: number;
  linesAdded: number;
  linesDeleted: number;
  tasksCompleted: number;
  score: number;
  role: 'Leader' | 'Developer' | 'Designer' | 'Tester';
}

// Dữ liệu mẫu về đóng góp thành viên
const mockMemberData: MemberContribution[] = [
  {
    id: '1',
    name: 'Nguyễn Văn An',
    commits: 45,
    linesAdded: 2340,
    linesDeleted: 892,
    tasksCompleted: 12,
    score: 9.2,
    role: 'Leader',
  },
  {
    id: '2',
    name: 'Trần Thị Bình',
    commits: 38,
    linesAdded: 1890,
    linesDeleted: 567,
    tasksCompleted: 10,
    score: 8.7,
    role: 'Developer',
  },
  {
    id: '3',
    name: 'Lê Hoàng Cường',
    commits: 32,
    linesAdded: 1567,
    linesDeleted: 423,
    tasksCompleted: 8,
    score: 8.1,
    role: 'Designer',
  },
  {
    id: '4',
    name: 'Phạm Minh Đức',
    commits: 28,
    linesAdded: 1234,
    linesDeleted: 345,
    tasksCompleted: 9,
    score: 7.8,
    role: 'Developer',
  },
  {
    id: '5',
    name: 'Vũ Thị Hương',
    commits: 25,
    linesAdded: 987,
    linesDeleted: 234,
    tasksCompleted: 7,
    score: 7.5,
    role: 'Tester',
  },
];

const getRoleConfig = (role: string) => {
  switch (role) {
    case 'Leader':
      return {
        color: 'bg-gradient-to-r from-red-500 to-red-600',
        bgColor: 'bg-red-50 dark:bg-red-950/20',
        textColor: 'text-red-700 dark:text-red-400',
        icon: Trophy,
      };
    case 'Developer':
      return {
        color: 'bg-gradient-to-r from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50 dark:bg-blue-950/20',
        textColor: 'text-blue-700 dark:text-blue-400',
        icon: Code2,
      };
    case 'Designer':
      return {
        color: 'bg-gradient-to-r from-purple-500 to-purple-600',
        bgColor: 'bg-purple-50 dark:bg-purple-950/20',
        textColor: 'text-purple-700 dark:text-purple-400',
        icon: Star,
      };
    case 'Tester':
      return {
        color: 'bg-gradient-to-r from-green-500 to-green-600',
        bgColor: 'bg-green-50 dark:bg-green-950/20',
        textColor: 'text-green-700 dark:text-green-400',
        icon: Target,
      };
    default:
      return {
        color: 'bg-gradient-to-r from-gray-500 to-gray-600',
        bgColor: 'bg-gray-50 dark:bg-gray-950/20',
        textColor: 'text-gray-700 dark:text-gray-400',
        icon: Users,
      };
  }
};

const MetricCard = ({
  icon: Icon,
  title,
  value,
  subtitle,
  gradient,
  textColor,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string | number;
  subtitle: string;
  gradient: string;
  textColor: string;
}) => (
  <div className="group relative rounded-xl overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-700/20 shadow-lg"></div>
    <div className="relative p-6 rounded-xl transition-all duration-300 group-hover:transform group-hover:scale-105">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-lg ${gradient} shadow-md`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">{title}</h3>
          </div>
          <div className="space-y-1">
            <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center text-green-500">
          <TrendingUp className="w-4 h-4" />
        </div>
      </div>
    </div>
  </div>
);

export default function TopicsContribute() {
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
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
          },
          animationDuration: 1000,
          animationEasing: 'elasticOut',
        },
      ],
    };

    // Biểu đồ radar với styling cải thiện
    const skillsRadarOption = {
      title: {
        text: 'Đánh giá kỹ năng thành viên',
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
        textStyle: {
          color: theme.textColor,
          fontSize: 12,
        },
        bottom: 20,
        itemGap: 20,
      },
      radar: {
        center: ['50%', '55%'],
        radius: '65%',
        indicator: [
          { name: 'Commits', max: 50 },
          { name: 'Lines Added', max: 3000 },
          { name: 'Tasks', max: 15 },
          { name: 'Score', max: 10 },
          { name: 'Quality', max: 10 },
        ],
        axisName: {
          color: theme.textColor,
          fontSize: 12,
          fontWeight: '500',
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
        splitArea: {
          areaStyle: {
            color: ['rgba(114, 46, 209, 0.05)', 'rgba(14, 165, 233, 0.05)'],
          },
        },
      },
      series: [
        {
          name: 'Kỹ năng thành viên',
          type: 'radar',
          data: mockMemberData.map((member, index) => ({
            value: [
              member.commits,
              member.linesAdded,
              member.tasksCompleted,
              member.score,
              Math.min(member.score, 10),
            ],
            name: member.name.split(' ').slice(-1)[0],
            itemStyle: {
              color: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5],
            },
            areaStyle: {
              color: [
                'rgba(59, 130, 246, 0.1)',
                'rgba(16, 185, 129, 0.1)',
                'rgba(245, 158, 11, 0.1)',
                'rgba(239, 68, 68, 0.1)',
                'rgba(139, 92, 246, 0.1)',
              ][index % 5],
            },
          })),
          animationDuration: 1200,
        },
      ],
    };

    // Biểu đồ tròn với hiệu ứng đẹp
    const roleDistributionOption = {
      title: {
        text: 'Phân bố vai trò',
        textStyle: {
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'Inter, sans-serif',
          color: theme.textColor,
        },
        top: 20,
        left: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} thành viên ({d}%)',
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
        left: '15%',
        top: '30%',
        textStyle: {
          color: theme.textColor,
          fontSize: 12,
        },
        itemGap: 15,
      },
      series: [
        {
          name: 'Vai trò',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['65%', '55%'],
          data: [
            { value: 1, name: 'Leader', itemStyle: { color: '#ef4444' } },
            { value: 2, name: 'Developer', itemStyle: { color: '#3b82f6' } },
            { value: 1, name: 'Designer', itemStyle: { color: '#8b5cf6' } },
            { value: 1, name: 'Tester', itemStyle: { color: '#10b981' } },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)',
            },
            scaleSize: 5,
          },
          label: {
            show: true,
            position: 'inside',
            formatter: '{d}%',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#fff',
          },
          labelLine: {
            show: false,
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDuration: 1000,
        },
      ],
    };

    // Biểu đồ đường với gradient areas
    const trendChartOption = {
      title: {
        text: 'Xu hướng đóng góp 7 ngày qua',
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
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.textColor,
        },
        borderWidth: 0,
        borderRadius: 8,
        extraCssText: 'box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);',
      },
      legend: {
        data: ['Commits', 'Tasks hoàn thành'],
        textStyle: {
          color: theme.textColor,
          fontSize: 12,
        },
        top: 50,
        itemGap: 30,
      },
      grid: {
        top: 100,
        left: 50,
        right: 30,
        bottom: 50,
      },
      xAxis: {
        type: 'category',
        data: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
        axisLine: {
          lineStyle: {
            color: theme.axisLineColor,
          },
        },
        axisLabel: {
          color: theme.textColor,
          fontSize: 12,
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
          name: 'Commits',
          type: 'line',
          data: [8, 12, 15, 10, 18, 22, 14],
          smooth: true,
          lineStyle: {
            color: '#3b82f6',
            width: 3,
          },
          itemStyle: {
            color: '#3b82f6',
            borderWidth: 2,
            borderColor: '#fff',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(59, 130, 246, 0.4)' },
                { offset: 1, color: 'rgba(59, 130, 246, 0.05)' },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 6,
          animationDuration: 1000,
        },
        {
          name: 'Tasks hoàn thành',
          type: 'line',
          data: [3, 4, 6, 4, 7, 8, 5],
          smooth: true,
          lineStyle: {
            color: '#10b981',
            width: 3,
          },
          itemStyle: {
            color: '#10b981',
            borderWidth: 2,
            borderColor: '#fff',
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(16, 185, 129, 0.4)' },
                { offset: 1, color: 'rgba(16, 185, 129, 0.05)' },
              ],
            },
          },
          symbol: 'circle',
          symbolSize: 6,
          animationDuration: 1200,
        },
      ],
    };

    return {
      commitsChart: commitsChartOption,
      skillsRadar: skillsRadarOption,
      roleDistribution: roleDistributionOption,
      trendChart: trendChartOption,
    };
  }, [theme]);

  const totalCommits = mockMemberData.reduce((sum, member) => sum + member.commits, 0);
  const totalTasks = mockMemberData.reduce((sum, member) => sum + member.tasksCompleted, 0);
  const avgScore = (
    mockMemberData.reduce((sum, member) => sum + member.score, 0) / mockMemberData.length
  ).toFixed(1);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <div className="relative overflow-hidden rounded-2xl mb-8">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 opacity-10"></div>
        <Card className="relative border-0 p-6 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div className="">
              <TitleHeader className="pb-0" title="Đóng góp thành viên" />
              <TextDescription>
                Theo dõi và phân tích chi tiết sự đóng góp của từng thành viên trong dự án. Đánh giá
                hiệu suất, tiến độ và chất lượng công việc một cách trực quan.
              </TextDescription>
            </div>
          </div>
        </Card>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          icon={Users}
          title="Thành viên"
          value={mockMemberData.length}
          subtitle="người trong nhóm"
          gradient="bg-gradient-to-r from-blue-500 to-blue-600"
          textColor="text-blue-700 dark:text-blue-400"
        />
        <MetricCard
          icon={GitCommit}
          title="Tổng Commits"
          value={totalCommits.toLocaleString()}
          subtitle="commits đã thực hiện"
          gradient="bg-gradient-to-r from-green-500 to-green-600"
          textColor="text-green-700 dark:text-green-400"
        />
        <MetricCard
          icon={Target}
          title="Tasks hoàn thành"
          value={totalTasks}
          subtitle="nhiệm vụ đã xong"
          gradient="bg-gradient-to-r from-purple-500 to-purple-600"
          textColor="text-purple-700 dark:text-purple-400"
        />
        <MetricCard
          icon={Award}
          title="Điểm trung bình"
          value={`${avgScore}/10`}
          subtitle="điểm đánh giá"
          gradient="bg-gradient-to-r from-orange-500 to-orange-600"
          textColor="text-orange-700 dark:text-orange-400"
        />
      </div>

      {/* Team Members List */}
      <Card className="mb-8 p-0 border-0 bg-gradient-to-br from-white/90 to-white/50 dark:from-gray-800/90 dark:to-gray-800/50 backdrop-blur-sm shadow-sm">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600">
              <Users className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              Danh sách thành viên
            </h3>
          </div>

          <div className="grid gap-4">
            {mockMemberData.map(member => {
              const roleConfig = getRoleConfig(member.role);
              const IconComponent = roleConfig.icon;

              return (
                <MemberCard
                  key={member.id}
                  member={member}
                  roleConfig={roleConfig}
                  IconComponent={IconComponent}
                />
              );
            })}
          </div>
        </div>
      </Card>

      {/* Charts Section */}
      <div className="space-y-8">
        {/* First Row Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl"></div>
            <ChartWrapper
              option={chartOptions.commitsChart}
              height="350px"
              className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-2xl"></div>
            <ChartWrapper
              option={chartOptions.trendChart}
              height="350px"
              className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-2xl"></div>
            <ChartWrapper
              option={chartOptions.skillsRadar}
              height="400px"
              className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl"></div>
            <ChartWrapper
              option={chartOptions.roleDistribution}
              height="400px"
              className="border-0 shadow-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const MemberCard = ({
  member,
  roleConfig,
  IconComponent,
}: {
  member: MemberContribution;
  roleConfig: any;
  IconComponent: any;
}) => {
  return (
    <div key={member.id} className="group relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700/80 dark:to-gray-700/40 backdrop-blur-sm rounded-xl border border-white/20 dark:border-gray-600/20"></div>
      <div className="relative p-6 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="w-14 h-14 ring-4 ring-white/50 shadow-lg">
                <AvatarImage src={member.avatar} />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold">
                  {member.name
                    .split(' ')
                    .map(n => n[0])
                    .join('')}
                </AvatarFallback>
              </Avatar>
              <div
                className={`absolute -bottom-1 -right-1 p-1 rounded-full ${roleConfig.color} shadow-md`}
              >
                <IconComponent className="w-3 h-3 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {member.name}
                </h4>
                <Badge
                  className={`${roleConfig.color} text-white text-xs px-3 py-1 font-medium shadow-md border-0`}
                >
                  {member.role}
                </Badge>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center gap-1">
                  <GitCommit className="w-4 h-4" />
                  <span className="font-medium">{member.commits}</span> commits
                </div>
                <div className="flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  <span className="font-medium">{member.tasksCompleted}</span> tasks
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span className="font-medium">{member.score}</span>/10
                </div>
              </div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-lg font-bold text-gray-800 dark:text-white">
              <span className="text-green-600">+{member.linesAdded.toLocaleString()}</span>
              <span className="text-gray-400 mx-1">/</span>
              <span className="text-red-500">-{member.linesDeleted.toLocaleString()}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
              lines of code
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
