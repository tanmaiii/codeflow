import React from 'react';
import ReactECharts from 'echarts-for-react';

interface ChartWrapperProps {
  option: Record<string, unknown>;
  height?: string;
  className?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  option,
  height = '350px',
  className = '',
}) => (
  <div className={`bg-background-1 rounded-lg p-6 shadow-sm border border-border ${className}`}>
    <ReactECharts option={option} style={{ height, width: '100%' }} opts={{ renderer: 'svg' }} />
  </div>
);
