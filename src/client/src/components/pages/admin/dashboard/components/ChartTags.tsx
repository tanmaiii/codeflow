import { ChartWrapper } from "@/components/common/ChartWrapper";
import { useDarkMode } from "@/hooks";

export default function ChartTags() {
    const { theme } = useDarkMode();

    const tagsData = [
      { name: 'JavaScript', khoaHoc: 25, baiViet: 20 },
      { name: 'React', khoaHoc: 22, baiViet: 16 },
      { name: 'Python', khoaHoc: 18, baiViet: 14 },
      { name: 'HTML/CSS', khoaHoc: 15, baiViet: 13 },
      { name: 'Node.js', khoaHoc: 14, baiViet: 11 },
      { name: 'TypeScript', khoaHoc: 12, baiViet: 10 },
      { name: 'Java', khoaHoc: 10, baiViet: 8 },
      { name: 'PHP', khoaHoc: 8, baiViet: 7 },
    ];
  
    const Option = {
      title: {
        text: 'Số lượng tags được sử dụng',
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          fontFamily: 'nunito',
          color: theme.textColor,
        },
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: { axisValue: string; seriesName: string; value: number }[]) => {
          let result = `<div style="font-weight: bold;">${params[0].axisValue}</div>`;
          params.forEach((param) => {
            result += `<div>${param.seriesName}: ${param.value} lượt sử dụng</div>`;
          });
          return result;
        },
        backgroundColor: theme.backgroundColor,
        textStyle: {
          color: theme.textColor,
        },
      },
      legend: {
        data: ['Khóa học', 'Bài viết'],
        textStyle: {
          color: theme.textColor,
        },
        top: 30,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '15%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: tagsData.map(item => item.name),
        axisLine: {
          lineStyle: {
            color: theme.axisLineColor,
          },
        },
        axisLabel: {
          color: theme.textColor,
          rotate: 45,
          fontSize: 10,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `${value}`,
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
          },
        },
      },
      series: [
        {
          name: 'Khóa học',
          type: 'bar',
          data: tagsData.map(item => item.khoaHoc),
          itemStyle: {
            color: '#10b981',
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: {
              color: '#059669',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(16, 185, 129, 0.5)',
            },
          },
        },
        {
          name: 'Bài viết',
          type: 'bar',
          data: tagsData.map(item => item.baiViet),
          itemStyle: {
            color: '#3b82f6',
            borderRadius: [4, 4, 0, 0],
          },
          emphasis: {
            itemStyle: {
              color: '#2563eb',
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(59, 130, 246, 0.5)',
            },
          },
        },
      ],
    };
  
    return <ChartWrapper option={Option} />;
}