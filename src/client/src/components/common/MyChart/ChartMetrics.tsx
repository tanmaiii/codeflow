import { ENUM_METRICS_CODE_ANALYSIS } from '@/constants/enum';
import { METRICS_CODE_ANALYSIS } from '@/constants/object';
import { ITopicMetrics } from '@/interfaces/code_analysis';
import { useTranslations } from 'next-intl';

export default function ChartMetrics({ metrics }: { metrics: ITopicMetrics[] }) {
  const t = useTranslations();

  if (!metrics || metrics.length === 0) return null;

  const formatMetricsValue = (value: number, name: string) => {
    const numValue = typeof value === 'number' ? value : parseInt(value) || 0;

    // Convert rating values to letter grades (A, B, C, D, E)
    const convertRatingToLetter = (rating: number) => {
      if (rating <= 1.0) return 'A';
      if (rating <= 2.0) return 'B';
      if (rating <= 3.0) return 'C';
      if (rating <= 4.0) return 'D';
      return 'E';
    };

    switch (name.toLowerCase()) {
      // Rating metrics - display as letter grades
      case ENUM_METRICS_CODE_ANALYSIS.SECURITY_RATING:
      case ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS:
      case ENUM_METRICS_CODE_ANALYSIS.RELIABILITY_RATING:
      case ENUM_METRICS_CODE_ANALYSIS.SQALE_RATING:
      case ENUM_METRICS_CODE_ANALYSIS.SECURITY_REVIEW_RATING:
        return convertRatingToLetter(numValue);

      // Percentage metrics
      case ENUM_METRICS_CODE_ANALYSIS.COVERAGE:
      case ENUM_METRICS_CODE_ANALYSIS.LINE_COVERAGE:
      case ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS_REVIEWED:
      case ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES_DENSITY:
        return `${Math.round(numValue)}%`;

      // Decimal metrics
      case ENUM_METRICS_CODE_ANALYSIS.COMPLEXITY:
      case ENUM_METRICS_CODE_ANALYSIS.COGNITIVE_COMPLEXITY:
        return numValue % 1 === 0 ? numValue.toString() : numValue.toFixed(1);

      // Integer metrics with locale formatting
      case ENUM_METRICS_CODE_ANALYSIS.NCLoc:
      case ENUM_METRICS_CODE_ANALYSIS.FILES:
      case ENUM_METRICS_CODE_ANALYSIS.BUGS:
      case ENUM_METRICS_CODE_ANALYSIS.VULNERABILITIES:
      case ENUM_METRICS_CODE_ANALYSIS.CODE_SMELLS:
      case ENUM_METRICS_CODE_ANALYSIS.UNCOVERED_LINES:
      case ENUM_METRICS_CODE_ANALYSIS.LINES_TO_COVER:
      case ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_BLOCKS:
      case ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES:
      case ENUM_METRICS_CODE_ANALYSIS.FUNCTIONS:
      case ENUM_METRICS_CODE_ANALYSIS.CLASSES:
        return Math.round(numValue).toLocaleString();

      default:
        return numValue.toString();
    }
  };

  const isRatingMetric = (metricName: string) =>
    [
      ENUM_METRICS_CODE_ANALYSIS.SECURITY_RATING,
      ENUM_METRICS_CODE_ANALYSIS.RELIABILITY_RATING,
      ENUM_METRICS_CODE_ANALYSIS.SQALE_RATING,
      ENUM_METRICS_CODE_ANALYSIS.SECURITY_REVIEW_RATING,
    ].includes(metricName as ENUM_METRICS_CODE_ANALYSIS);

  const isPercentageMetric = (metricName: string) =>
    [
      ENUM_METRICS_CODE_ANALYSIS.COVERAGE,
      ENUM_METRICS_CODE_ANALYSIS.LINE_COVERAGE,
      ENUM_METRICS_CODE_ANALYSIS.SECURITY_HOTSPOTS_REVIEWED,
      ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES_DENSITY,
    ].includes(metricName as ENUM_METRICS_CODE_ANALYSIS);

  const getRatingColor = (value: string) => {
    switch (value) {
      case 'A':
        return 'text-green-700 bg-green-100 border-green-300 dark:text-green-300 dark:bg-green-900 dark:border-green-700';
      case 'B':
        return 'text-blue-700 bg-blue-100 border-blue-300 dark:text-blue-300 dark:bg-blue-900 dark:border-blue-700';
      case 'C':
        return 'text-yellow-700 bg-yellow-100 border-yellow-300 dark:text-yellow-300 dark:bg-yellow-900 dark:border-yellow-700';
      case 'D':
        return 'text-orange-700 bg-orange-100 border-orange-300 dark:text-orange-300 dark:bg-orange-900 dark:border-orange-700';
      case 'E':
        return 'text-red-700 bg-red-100 border-red-300 dark:text-red-300 dark:bg-red-900 dark:border-red-700';
      default:
        return 'text-gray-700 bg-gray-100 border-gray-300 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600';
    }
  };

  const getPercentageProgressColor = (value: number, metricName: string) => {
    // Coverage metrics - higher is better
    if (
      metricName === ENUM_METRICS_CODE_ANALYSIS.COVERAGE ||
      metricName === ENUM_METRICS_CODE_ANALYSIS.LINE_COVERAGE
    ) {
      if (value >= 80) return { stroke: '#15803d', text: 'text-green-700' };
      if (value >= 60) return { stroke: '#1d4ed8', text: 'text-blue-700' };
      if (value >= 40) return { stroke: '#a16207', text: 'text-yellow-700' };
      if (value >= 20) return { stroke: '#c2410c', text: 'text-orange-700' };
      return { stroke: '#dc2626', text: 'text-red-700' };
    }

    // Duplicated lines density - lower is better
    if (metricName === ENUM_METRICS_CODE_ANALYSIS.DUPLICATED_LINES_DENSITY) {
      if (value <= 3) return { stroke: '#15803d', text: 'text-green-700' };
      if (value <= 5) return { stroke: '#1d4ed8', text: 'text-blue-700' };
      if (value <= 10) return { stroke: '#a16207', text: 'text-yellow-700' };
      if (value <= 20) return { stroke: '#c2410c', text: 'text-orange-700' };
      return { stroke: '#dc2626', text: 'text-red-700' };
    }

    return { stroke: '#6b7280', text: 'text-gray-700' };
  };

  // Circular Progress Component
  const CircularProgress = ({
    percentage,
    size = 48,
    strokeWidth = 4,
    colors,
  }: {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    colors: { stroke: string; text: string };
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="transparent"
            className="dark:stroke-gray-600"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-300 ease-out"
          />
        </svg>
        {/* Percentage text */}
        <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
          {Math.round(percentage)}%
        </span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 my-6">
      {metrics.map((metric, index) => {
        const formattedValue = formatMetricsValue(metric.value, metric.name);
        const metricLabel = t(
          METRICS_CODE_ANALYSIS.find(m => m.value === metric.name)?.labelKey || '',
        );
        return (
          <div
            key={index}
            className="bg-white dark:bg-zinc-800 p-4 cursor-pointer rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
          >
            {/* Visual indicator */}
            <div className="flex flex-col items-center mb-3">
              {isRatingMetric(metric.name) ? (
                <div
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-lg font-bold ${getRatingColor(
                    formattedValue,
                  )}`}
                >
                  {formattedValue}
                </div>
              ) : isPercentageMetric(metric.name) ? (
                <CircularProgress
                  percentage={metric.value}
                  colors={getPercentageProgressColor(metric.value, metric.name)}
                />
              ) : (
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 h-12 flex items-center justify-center">
                    {formattedValue}
                  </div>
                </div>
              )}
            </div>

            {/* Metric name */}
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 text-center mb-2 flex items-center justify-center">
              {metricLabel}: {metric.value}
            </h3>

            {/* Value and optimization status */}
            <div className="text-center space-y-1">
              <div className="text-xs mt-2">
                {metric.bestValue === true ? (
                  <span className="text-green-600 dark:text-green-400 flex items-center justify-center gap-1">
                    <span>✓</span> {t('codeAnalysis.optimized')}
                  </span>
                ) : metric.bestValue === false ? (
                  <span className="text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                    <span>⚠</span> {t('codeAnalysis.notOptimized')}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
