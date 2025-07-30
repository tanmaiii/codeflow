import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { ResponseAPIDto } from '@/interfaces/common';
import codeAnalysisService from '@/services/code_analysis.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQ_CodeAnalysis_GetByTopicIdWithTimeFilter = (
  topicId: string,
  timeframe: string,
  options?: UseQueryOptions<ResponseAPIDto<ICodeAnalysis[]>, Error>,
) => {
  const query = useQuery({
    queryKey: ['code-analysis', 'topic', topicId, 'timeframe', timeframe],
    queryFn: async () => {
      const res = await codeAnalysisService.getByTopicIdWithTimeFilter(topicId, timeframe);
      return res;
    },
    enabled: !!topicId && !!timeframe,
    staleTime: 1000 * 60 * 5, // 5 minutes
    ...options,
  });

  return query;
};
