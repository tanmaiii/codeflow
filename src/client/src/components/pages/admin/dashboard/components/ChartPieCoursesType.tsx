'use client';
import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';
import { ICourseType } from '@/interfaces/course';
import { ChartPie } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function ChartPieCoursesType({
  courseTypes,
  isLoading,
}: {
  courseTypes: ICourseType[];
  isLoading: boolean;
}) {
  const { theme } = useDarkMode();
  const t = useTranslations();

  const courseTypesData = courseTypes.map(courseType => ({
    name: t(`course.type.${courseType.type}`),
    value: courseType.count,
  }));

  const Option = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}%',
      backgroundColor: theme.backgroundColor,
      textStyle: {
        color: theme.textColor,
      },
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
        color: theme.textColor,
      },
    },
    series: [
      {
        name: 'Loại khóa học',
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['65%', '50%'],
        data: courseTypesData,
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
  };

  return (
    <ChartWrapper
      icon={<ChartPie className="w-4 h-4" />}
      label={'Số lượng khóa học theo loại'}
      option={Option}
      isLoading={isLoading}
    />
  );
}
