import React from 'react';
import ReactECharts from 'echarts-for-react';
import TextHeading from '@/components/ui/text';

interface ChartWrapperProps {
  option: Record<string, unknown>;
  height?: string;
  className?: string;
  rightComponent?: React.ReactNode;
  label?: string;
}

export const ChartWrapper: React.FC<ChartWrapperProps> = ({
  option,
  height = '350px',
  className = '',
  rightComponent,
  label,
}) => (
  <div className={`bg-background-1 rounded-lg p-4 shadow-sm border border-border ${className}`}>
    <div className="flex justify-between items-center">
      {label ? <TextHeading className="text-color-1 text-md">{label}</TextHeading> : null}
      {rightComponent}
    </div>
    <ReactECharts option={option} style={{ height, width: '100%' }} opts={{ renderer: 'svg' }} />
  </div>
);
