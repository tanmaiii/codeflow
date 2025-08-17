import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';

export default function ChartPieCoursesType() {
  const { theme } = useDarkMode();

  const courseTypes = [
    { name: 'Cơ sở ngành', value: 35 },
    { name: 'Chuyên ngành', value: 28 },
    { name: 'Môn học', value: 22 },
    { name: 'Tốt nghiệp', value: 15 },
  ];

  const Option = {
    title: {
      text: 'Loại khóa học',
      textStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'nunito',
        color: theme.textColor,
      },
      left: 'center',
      top: 10,
    },
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
        data: courseTypes,
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

  return <ChartWrapper option={Option} />;
}
