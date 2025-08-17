import { ChartWrapper } from '@/components/common/ChartWrapper';
import { useDarkMode } from '@/hooks';

interface SecurityDataItem {
  name: string;
  value: number;
  severity: string;
}

interface TooltipParams {
  name: string;
  value: number;
  percent: number;
}

export default function ChartSecurity() {
  const { theme } = useDarkMode();

  const securityData: SecurityDataItem[] = [
    { name: 'SQL Injection', value: 15, severity: 'Critical' },
    { name: 'XSS', value: 25, severity: 'High' },
    { name: 'CSRF', value: 20, severity: 'High' },
    { name: 'Authentication', value: 18, severity: 'Medium' },
    { name: 'Authorization', value: 12, severity: 'Medium' },
    { name: 'Input Validation', value: 10, severity: 'Low' },
  ];

  const getColorBySeverity = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return '#ef4444';
      case 'High':
        return '#f59e0b';
      case 'Medium':
        return '#3b82f6';
      case 'Low':
        return '#10b981';
      default:
        return '#6b7280';
    }
  };

  const Option = {
    title: {
      text: 'Phân loại lỗ hổng bảo mật',
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
      formatter: function (params: TooltipParams) {
        const item = securityData.find(d => d.name === params.name);
        return `${params.name}<br/>Số lượng: ${params.value}<br/>Mức độ: ${item?.severity}<br/>Tỷ lệ: ${params.percent}%`;
      },
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
        fontSize: 10,
        color: theme.textColor,
      },
    },
    series: [
      {
        name: 'Lỗ hổng bảo mật',
        type: 'pie',
        radius: ['35%', '60%'],
        center: ['65%', '50%'],
        data: securityData.map(item => ({
          name: item.name,
          value: item.value,
          itemStyle: {
            color: getColorBySeverity(item.severity),
          },
        })),
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
          fontSize: 11,
          color: '#ffffff',
          fontWeight: 'bold',
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };

  return <ChartWrapper option={Option} />;
}
