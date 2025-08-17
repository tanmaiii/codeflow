import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';

export default function ChartPieLanguage() {
  const { theme } = useDarkMode();

  const projectTypes = [
    { name: 'JavaScript/React', value: 28 },
    { name: 'Python/Django', value: 22 },
    { name: 'Java/Spring', value: 18 },
    { name: 'C#/.NET', value: 15 },
    { name: 'PHP/Laravel', value: 17 },
  ];

  // Số lượng commit theo thời gian
  const Option = {
    title: {
      text: 'Phân loại theo ngôn ngữ, thư viện',
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
      left: '70%',
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
        name: 'Ngôn ngữ, thư viện',
        type: 'pie',
        radius: ['30%', '65%'],
        center: ['35%', '50%'],
        data: projectTypes,
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
  };

  return <ChartWrapper option={Option} />;
}
