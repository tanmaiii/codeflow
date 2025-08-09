import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDarkMode } from '@/hooks';
import ReactECharts from 'echarts-for-react';
import { BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { mockProjectProgress } from './mockData';

export default function ProjectProgressChart() {
  const { theme } = useDarkMode();
  const t = useTranslations('courseDashboard.charts.projectProgress');

  // Xử lý dữ liệu cho biểu đồ
  const processedData = mockProjectProgress.map(item => ({
    project: item.project.length > 20 ? item.project.substring(0, 20) + '...' : item.project,
    fullProject: item.project,
    completionRate: item.completionRate,
    participationRate: item.participationRate,
    milestonesCompleted: item.milestonesCompleted,
    totalMilestones: item.totalMilestones,
    studentsWorking: item.studentsWorking,
    difficulty: item.difficulty,
    status: item.status,
  }));

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
      formatter: function(params: { dataIndex: number }[]) {
        const data = processedData[params[0].dataIndex];
        const difficultyMap = {
          easy: '🟢 Dễ',
          medium: '🟡 Trung bình',
          hard: '🔴 Khó'
        };
        const statusMap = {
          early_stage: '🟡 Giai đoạn đầu',
          in_progress: '🔵 Đang thực hiện',
          nearly_completed: '🟢 Sắp hoàn thành'
        };
        return `
          <div style="font-weight: bold; margin-bottom: 8px;">${data.fullProject}</div>
          <div style="margin-bottom: 4px;">
            <span style="color: #10b981;">✅ ${t('completionRate')}: ${data.completionRate}%</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #f59e0b;">👥 ${t('participation')}: ${data.participationRate}%</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #3b82f6;">👨‍💻 ${t('studentsWorking')}: ${data.studentsWorking} sinh viên</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #8b5cf6;">🎯 ${t('milestones')}: ${data.milestonesCompleted}/${data.totalMilestones}</span>
          </div>
          <div style="margin-bottom: 4px;">
            <span style="color: #06b6d4;">📊 ${t('status')}: ${statusMap[data.status as keyof typeof statusMap]}</span>
          </div>
          <div>
            <span>🎯 Độ khó: ${difficultyMap[data.difficulty as keyof typeof difficultyMap]}</span>
          </div>
        `;
      }
    },
    grid: {
      left: '20%',
      right: '10%',
      top: '5%',
      bottom: '5%',
    },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { 
        color: theme.textColor,
        formatter: '{value}%'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: theme.splitLineColor,
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: processedData.map(item => item.project),
      axisLabel: { 
        color: theme.textColor,
        interval: 0
      },
      axisTick: { show: false },
      axisLine: { show: false }
    },
    series: [
      {
        name: t('completionRate'),
        type: 'bar',
        data: processedData.map(item => item.completionRate),
        barWidth: '60%',
        itemStyle: {
          color: function(params: { value: number }) {
            const rate = params.value;
            if (rate >= 90) return '#22c55e'; // Xanh lá đậm - xuất sắc
            if (rate >= 80) return '#10b981'; // Xanh lá - tốt
            if (rate >= 70) return '#3b82f6'; // Xanh dương - khá
            if (rate >= 60) return '#f59e0b'; // Vàng - trung bình
            if (rate >= 50) return '#ef4444'; // Đỏ - yếu
            return '#dc2626'; // Đỏ đậm - rất yếu
          },
          borderRadius: [0, 4, 4, 0]
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}%',
          color: theme.textColor,
          fontSize: 12,
          fontWeight: 'bold'
        }
      }
    ]
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>
          {t('description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={topicProgressChartOptions} style={{ height: '320px' }} />
      </CardContent>
    </Card>
  );
}
