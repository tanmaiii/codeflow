import { useState, useEffect } from 'react';
import { ChartData, TimeRange } from '../types';

export const useChartData = (timeRange: TimeRange) => {
  const [chartData, setChartData] = useState<ChartData>({
    scores: [],
    projects: [],
    submissions: [],
    scoreDistribution: [],
    projectTypes: [],
    projectStatus: [],
    activity: []
  });

  const generateSampleData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    const scores = [];
    const projects = [];
    const submissions = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toLocaleDateString('vi-VN', { month: 'short', day: 'numeric' });

      scores.push({
        date: dateStr,
        value: Math.floor(Math.random() * 3) + 7 + Math.random() // 7.0 - 10.0
      });

      projects.push({
        date: dateStr,
        value: Math.floor(Math.random() * 15) + 5
      });

      submissions.push({
        date: dateStr,
        value: Math.floor(Math.random() * 25) + 10
      });
    }

    const scoreDistribution = [
      { name: '9.0 - 10.0 (Xuất sắc)', value: 15 },
      { name: '8.0 - 8.9 (Giỏi)', value: 28 },
      { name: '7.0 - 7.9 (Khá)', value: 35 },
      { name: '6.0 - 6.9 (Trung bình)', value: 18 },
      { name: '< 6.0 (Yếu)', value: 4 }
    ];

    const projectTypes = [
      { name: 'Web Development', value: 32 },
      { name: 'Mobile App', value: 25 },
      { name: 'AI/Machine Learning', value: 18 },
      { name: 'Data Analysis', value: 15 },
      { name: 'IoT/Hardware', value: 10 }
    ];

    const projectStatus = [
      { name: 'Đã nộp', value: 68 },
      { name: 'Đang thực hiện', value: 25 },
      { name: 'Chưa bắt đầu', value: 7 }
    ];

    const activity = [];
    for (let i = 0; i < 24; i++) {
      activity.push({
        hour: i,
        value: Math.floor(Math.random() * 80) + 20
      });
    }

    setChartData({
      scores,
      projects,
      submissions,
      scoreDistribution,
      projectTypes,
      projectStatus,
      activity
    });
  };

  useEffect(() => {
    generateSampleData();
  }, [timeRange]);

  return { chartData, generateSampleData };
}; 