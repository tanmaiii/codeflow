import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useDarkMode } from '@/hooks';
import useQ_Topic_GetAllByCourseId from '@/hooks/query-hooks/Topic/useQ_Topic_GetAllByCourseId';
import ReactECharts from 'echarts-for-react';
import { FileText } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { ENUM_STATUS_TOPIC } from '@/constants/enum';

export default function TopicApprovalChart({ courseId }: { courseId: string }) {
  const { theme } = useDarkMode();
  const t = useTranslations('courseDashboard.charts.topicApproval');

  // Lấy dữ liệu cho từng trạng thái và loại đề xuất
  const { data: dataTopicApprovedTeacher } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: -1,
      status: ENUM_STATUS_TOPIC.APPROVED,
      isCustom: false, // Giáo viên đề xuất
    },
  });

  const { data: dataTopicApprovedSelf } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: -1,
      status: ENUM_STATUS_TOPIC.APPROVED,
      isCustom: true, // Tự đề xuất
    },
  });

  const { data: dataTopicPendingTeacher } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: -1,
      status: ENUM_STATUS_TOPIC.PENDING,
      isCustom: false, // Giáo viên đề xuất
    },
  });

  const { data: dataTopicPendingSelf } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: -1,
      status: ENUM_STATUS_TOPIC.PENDING,
      isCustom: true, // Tự đề xuất
    },
  });

  const { data: dataTopicRejectedTeacher } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: -1,
      status: ENUM_STATUS_TOPIC.REJECTED,
      isCustom: false, // Giáo viên đề xuất
    },
  });

  const { data: dataTopicRejectedSelf } = useQ_Topic_GetAllByCourseId({
    params: {
      courseId: courseId,
      page: 1,
      limit: -1,
      status: ENUM_STATUS_TOPIC.REJECTED,
      isCustom: true, // Tự đề xuất
    },
  });

  // Tính tổng số lượng cho từng loại
  const approvedTeacher = dataTopicApprovedTeacher?.pagination?.totalItems || 0;
  const approvedSelf = dataTopicApprovedSelf?.pagination?.totalItems || 0;
  const pendingTeacher = dataTopicPendingTeacher?.pagination?.totalItems || 0;
  const pendingSelf = dataTopicPendingSelf?.pagination?.totalItems || 0;
  const rejectedTeacher = dataTopicRejectedTeacher?.pagination?.totalItems || 0;
  const rejectedSelf = dataTopicRejectedSelf?.pagination?.totalItems || 0;

  const barChartOptions = {
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
      axisPointer: {
        type: 'shadow',
      },
    },
    legend: {
      data: ['Giáo viên đề xuất', 'Tự đề xuất'],
      textStyle: { color: theme.textColor },
      top: 'top',
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Chờ duyệt', 'Đã chấp nhận', 'Đã từ chối'],
      axisLabel: {
        color: theme.textColor,
      },
      axisLine: {
        lineStyle: {
          color: theme.axisLineColor,
        },
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
          opacity: 0.3,
        },
      },
    },
    series: [
      {
        name: 'Giáo viên đề xuất',
        type: 'bar',
        data: [pendingTeacher, approvedTeacher, rejectedTeacher],
        itemStyle: {
          color: '#3b82f6', // Blue
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
      {
        name: 'Tự đề xuất',
        type: 'bar',
        data: [pendingSelf, approvedSelf, rejectedSelf],
        itemStyle: {
          color: '#10b981', // Green
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          {t('title')}
        </CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={barChartOptions} style={{ height: '300px' }} />
      </CardContent>
    </Card>
  );
}
