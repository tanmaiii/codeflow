import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { MetricCardProps } from '../types';
import { TextDescription } from '@/components/ui/text';
import TextHeading from '@/components/ui/text';

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  growth,
  icon: Icon,
  color,
}) => (
  <div className="bg-background-1 rounded-lg p-6 shadow-sm border border-border">
    <div className="flex items-center justify-between">
      <div>
        <TextDescription className="text-sm">{title}</TextDescription>
        <TextHeading className="text-2xl">{value}</TextHeading>
        <div className="flex items-center mt-2 gap-2">
          {growth >= 0 ? (
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span
            className={`text-sm font-medium ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}
          >
            {growth >= 0 ? '+' : ''}
            {growth}%
          </span>
          <TextDescription className="text-sm">so với kỳ trước</TextDescription>
        </div>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);
