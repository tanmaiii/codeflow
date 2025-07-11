'use client';
import { Award, BookOpen, GraduationCap, RefreshCw, Users } from 'lucide-react';
import { useState } from 'react';

// Import types and components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MetricCard } from './components/MetricCard';
import { QuickActions } from './components/QuickActions';
import { DashboardStats, TimeRange } from './types';
import { useChartData } from './utils/useChartData';
import { useChartOptions } from './utils/useChartOptions';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { ChartWrapper } from '@/components/common/ChartWrapper';

export default function Dashboard() {
  const [dashboardStats] = useState<DashboardStats>({
    totalStudents: 1420,
    totalProjects: 876,
    totalTeachers: 45,
    averageScore: 7.8,
    studentGrowth: 8.5,
    projectGrowth: 12.3,
    teacherGrowth: 3.2,
    scoreGrowth: 2.1,
  });

  const [timeRange, setTimeRange] = useState<TimeRange>('7d');
  const [isLoading, setIsLoading] = useState(false);

  const { chartData, generateSampleData } = useChartData(timeRange);
  const chartOptions = useChartOptions(chartData);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      generateSampleData();
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-full">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <TextHeading className="text-4xl font-bold">Codeflow</TextHeading>
              <TextDescription className="text-sm text-gray-500">
                Tổng quan về hoạt động đánh giá và quản lý dự án sinh viên
              </TextDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={timeRange} onValueChange={value => setTimeRange(value as TimeRange)}>
                <SelectTrigger className="bg-background-1">
                  <SelectValue placeholder="Chọn khoảng thời gian" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 ngày qua</SelectItem>
                  <SelectItem value="30d">30 ngày qua</SelectItem>
                  <SelectItem value="90d">90 ngày qua</SelectItem>
                </SelectContent>
              </Select>
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                Làm mới
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Tổng sinh viên"
            value={dashboardStats.totalStudents.toLocaleString('vi-VN')}
            growth={dashboardStats.studentGrowth}
            icon={Users}
            color="bg-blue-500"
          />
          <MetricCard
            title="Tổng dự án"
            value={dashboardStats.totalProjects.toLocaleString('vi-VN')}
            growth={dashboardStats.projectGrowth}
            icon={BookOpen}
            color="bg-green-500"
          />
          <MetricCard
            title="Tổng giảng viên"
            value={dashboardStats.totalTeachers.toLocaleString('vi-VN')}
            growth={dashboardStats.teacherGrowth}
            icon={GraduationCap}
            color="bg-purple-500"
          />
          <MetricCard
            title="Điểm trung bình"
            value={`${dashboardStats.averageScore}/10`}
            growth={dashboardStats.scoreGrowth}
            icon={Award}
            color="bg-orange-500"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <ChartWrapper option={chartOptions.scoresChart} />
          <ChartWrapper option={chartOptions.projectsChart} />
        </div>

        {/* Second Row Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartWrapper option={chartOptions.scoreDistribution} />
          <ChartWrapper option={chartOptions.projectTypes} />
          <ChartWrapper option={chartOptions.activityChart} />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
}
