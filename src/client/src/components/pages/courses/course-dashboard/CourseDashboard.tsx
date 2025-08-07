'use client';

import TitleHeader from '@/components/layout/TitleHeader';
import StatCard from '@/components/pages/dashboard/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TextDescription } from '@/components/ui/text';
import { useDarkMode } from '@/hooks';
import ReactECharts from 'echarts-for-react';
import { Award, BookOpen, Clock, GraduationCap, TrendingUp, Users } from 'lucide-react';

// Mock data for demo
const mockCourseData = {
  totalStudents: 45,
  activeStudents: 38,
  completionRate: 76,
  totalAssignments: 12,
  submittedAssignments: 420,
  totalTopics: 8,
  discussionPosts: 89,
};

const mockStudentProgress = [
  { name: 'Tuần 1', enrolled: 12, active: 10, completed: 8 },
  { name: 'Tuần 2', enrolled: 25, active: 22, completed: 15 },
  { name: 'Tuần 3', enrolled: 35, active: 30, completed: 25 },
  { name: 'Tuần 4', enrolled: 42, active: 35, completed: 30 },
  { name: 'Tuần 5', enrolled: 45, active: 38, completed: 34 },
];

const mockTopicProgress = [
  { topic: 'Chương 1: Giới thiệu', completed: 42, inProgress: 3, notStarted: 0 },
  { topic: 'Chương 2: Cơ bản', completed: 38, inProgress: 5, notStarted: 2 },
  { topic: 'Chương 3: Nâng cao', completed: 25, inProgress: 15, notStarted: 5 },
  { topic: 'Chương 4: Thực hành', completed: 18, inProgress: 20, notStarted: 7 },
  { topic: 'Chương 5: Dự án', completed: 5, inProgress: 25, notStarted: 15 },
];

const mockActiveStudents = [
  { name: 'Nguyễn Văn A', assignments: 12, participation: 95, lastActive: '2 giờ trước' },
  { name: 'Trần Thị B', assignments: 11, participation: 92, lastActive: '5 giờ trước' },
  { name: 'Lê Văn C', assignments: 12, participation: 88, lastActive: '1 ngày trước' },
  { name: 'Phạm Thị D', assignments: 10, participation: 85, lastActive: '3 giờ trước' },
  { name: 'Hoàng Văn E', assignments: 11, participation: 82, lastActive: '6 giờ trước' },
];

const mockDailyActivity = [
  { date: '2024-01-15', logins: 28, submissions: 12, discussions: 8 },
  { date: '2024-01-16', logins: 32, submissions: 15, discussions: 12 },
  { date: '2024-01-17', logins: 25, submissions: 8, discussions: 6 },
  { date: '2024-01-18', logins: 35, submissions: 18, discussions: 14 },
  { date: '2024-01-19', logins: 30, submissions: 14, discussions: 10 },
  { date: '2024-01-20', logins: 20, submissions: 5, discussions: 3 },
  { date: '2024-01-21', logins: 15, submissions: 3, discussions: 2 },
];

const mockClassPerformance = {
  avgAttendance: 85,
  avgCompletion: 76,
  avgParticipation: 78,
  avgEngagement: 82,
  avgPunctuality: 90,
  avgCollaboration: 75,
};

export default function CourseDashboard() {
  const { theme } = useDarkMode();

  // Student progress chart options
  const progressChartOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
    },
    legend: {
      data: ['Đăng ký', 'Hoạt động', 'Hoàn thành'],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data: mockStudentProgress.map(item => item.name),
      axisLabel: { color: theme.textColor },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: theme.textColor },
    },
    series: [
      {
        name: 'Đăng ký',
        type: 'line',
        data: mockStudentProgress.map(item => item.enrolled),
        smooth: true,
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: 'Hoạt động',
        type: 'line',
        data: mockStudentProgress.map(item => item.active),
        smooth: true,
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'Hoàn thành',
        type: 'line',
        data: mockStudentProgress.map(item => item.completed),
        smooth: true,
        itemStyle: { color: '#f59e0b' },
      },
    ],
  };

  // Topic progress chart options
  const topicProgressChartOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
    },
    legend: {
      data: ['Hoàn thành', 'Đang học', 'Chưa bắt đầu'],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data: mockTopicProgress.map(item => item.topic.replace('Chương ', 'C')),
      axisLabel: { color: theme.textColor, rotate: 45 },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: theme.textColor },
    },
    series: [
      {
        name: 'Hoàn thành',
        type: 'bar',
        stack: 'total',
        data: mockTopicProgress.map(item => item.completed),
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'Đang học',
        type: 'bar',
        stack: 'total',
        data: mockTopicProgress.map(item => item.inProgress),
        itemStyle: { color: '#f59e0b' },
      },
      {
        name: 'Chưa bắt đầu',
        type: 'bar',
        stack: 'total',
        data: mockTopicProgress.map(item => item.notStarted),
        itemStyle: { color: '#ef4444' },
      },
    ],
  };

  // Daily activity chart options
  const activityChartOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
    },
    legend: {
      data: ['Đăng nhập', 'Nộp bài', 'Thảo luận'],
      textStyle: { color: theme.textColor },
    },
    xAxis: {
      type: 'category',
      data: mockDailyActivity.map(item => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      axisLabel: { color: theme.textColor },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: theme.textColor },
    },
    series: [
      {
        name: 'Đăng nhập',
        type: 'bar',
        data: mockDailyActivity.map(item => item.logins),
        itemStyle: { color: '#3b82f6' },
      },
      {
        name: 'Nộp bài',
        type: 'bar',
        data: mockDailyActivity.map(item => item.submissions),
        itemStyle: { color: '#10b981' },
      },
      {
        name: 'Thảo luận',
        type: 'bar',
        data: mockDailyActivity.map(item => item.discussions),
        itemStyle: { color: '#f59e0b' },
      },
    ],
  };

  // Performance radar chart options
  const performanceRadarOptions = {
    textStyle: {
      fontSize: 14,
      fontFamily: 'Inter, sans-serif',
      color: theme.textColor,
    },
    tooltip: {
      backgroundColor: theme.backgroundColor,
      textStyle: { color: theme.textColor },
      borderWidth: 0,
      borderRadius: 8,
    },
    radar: {
      indicator: [
        { name: 'Chuyên cần', max: 100 },
        { name: 'Hoàn thành', max: 100 },
        { name: 'Tham gia', max: 100 },
        { name: 'Tương tác', max: 100 },
        { name: 'Đúng giờ', max: 100 },
        { name: 'Hợp tác', max: 100 },
      ],
      axisName: {
        color: theme.textColor,
        fontSize: 12,
      },
      splitLine: {
        lineStyle: { color: theme.textColor, opacity: 0.2 },
      },
      axisLine: {
        lineStyle: { color: theme.textColor, opacity: 0.3 },
      },
    },
    series: [
      {
        type: 'radar',
        data: [
          {
            value: [
              mockClassPerformance.avgAttendance,
              mockClassPerformance.avgCompletion,
              mockClassPerformance.avgParticipation,
              mockClassPerformance.avgEngagement,
              mockClassPerformance.avgPunctuality,
              mockClassPerformance.avgCollaboration,
            ],
            name: 'Hiệu suất lớp học',
            itemStyle: { color: '#3b82f6' },
            areaStyle: { color: '#3b82f6', opacity: 0.2 },
          },
        ],
      },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          {/* <h1 className="text-3xl font-bold">Bảng điều khiển khóa học</h1> */}
          <TitleHeader title={'Bảng điều khiển khóa học'} onBack />
          <TextDescription>
            {' '}
            Theo dõi tiến độ và hiệu suất của học viên trong khóa học
          </TextDescription>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Tổng học viên"
          value={mockCourseData.totalStudents}
          icon={Users}
          description="Đã đăng ký khóa học"
          color="default"
        />
        <StatCard
          title="Học viên hoạt động"
          value={mockCourseData.activeStudents}
          icon={GraduationCap}
          description="Trong 7 ngày qua"
          color="success"
          progress={(mockCourseData.activeStudents / mockCourseData.totalStudents) * 100}
        />
        <StatCard
          title="Tỷ lệ hoàn thành"
          value={mockCourseData.completionRate}
          icon={TrendingUp}
          description="% bài tập đã nộp"
          color="warning"
        />
        <StatCard
          title="Tổng đề tài"
          value={mockCourseData.totalTopics}
          icon={Award}
          description="Đề tài khóa học"
          color="success"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Student Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Tiến độ học viên theo thời gian
            </CardTitle>
            <CardDescription>
              Thống kê số lượng học viên đăng ký, hoạt động và hoàn thành bài tập
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts option={progressChartOptions} style={{ height: '300px' }} />
          </CardContent>
        </Card>

        {/* Topic Progress Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Tiến độ theo chủ đề
            </CardTitle>
            <CardDescription>Thống kê tiến độ học tập của học viên theo từng chủ đề</CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts option={topicProgressChartOptions} style={{ height: '300px' }} />
          </CardContent>
        </Card>
      </div>

      {/* Daily Activity Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Hoạt động hàng ngày (7 ngày qua)
          </CardTitle>
          <CardDescription>
            Theo dõi hoạt động đăng nhập, nộp bài và thảo luận của học viên
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactECharts option={activityChartOptions} style={{ height: '350px' }} />
        </CardContent>
      </Card>

      {/* Performance Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Đánh giá tổng quan hiệu suất lớp học
          </CardTitle>
          <CardDescription>
            Biểu đồ radar thể hiện các chỉ số hiệu suất trung bình của lớp học
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactECharts option={performanceRadarOptions} style={{ height: '400px' }} />
        </CardContent>
      </Card>

      {/* Additional Stats and Student List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Thống kê nhanh
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tổng bài tập</span>
              <span className="font-semibold">{mockCourseData.totalAssignments}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bài đã nộp</span>
              <span className="font-semibold">{mockCourseData.submittedAssignments}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Tổng đề tài</span>
              <span className="font-semibold">{mockCourseData.totalTopics}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Bài thảo luận</span>
              <span className="font-semibold">{mockCourseData.discussionPosts}</span>
            </div>
          </CardContent>
        </Card>

        {/* Active Students */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Học viên hoạt động tích cực
            </CardTitle>
            <CardDescription>Danh sách học viên có mức độ tham gia cao nhất</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActiveStudents.map((student, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.assignments}/12 bài tập • {student.participation}% tham gia
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm">{student.lastActive}</p>
                    <p className="text-xs text-muted-foreground">hoạt động cuối</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
