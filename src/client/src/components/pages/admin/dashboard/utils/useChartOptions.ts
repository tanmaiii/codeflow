import { useMemo } from 'react';
import { ChartData } from '../types';
import { 
  createScoresChartOption,
  createProjectsChartOption,
  createScoreDistributionOption,
  createProjectTypesOption,
  createActivityChartOption
} from './chartOptions';
import { useDarkMode } from '@/hooks/useDarkMode';

export const useChartOptions = (chartData: ChartData) => {
  const { theme } = useDarkMode();
  
  const chartOptions = useMemo(() => ({
    scoresChart: createScoresChartOption(chartData, theme),
    projectsChart: createProjectsChartOption(chartData, theme),
    scoreDistribution: createScoreDistributionOption(chartData, theme),
    projectTypes: createProjectTypesOption(chartData, theme),
    activityChart: createActivityChartOption(chartData, theme)
  }), [chartData, theme]);

  return chartOptions;
}; 