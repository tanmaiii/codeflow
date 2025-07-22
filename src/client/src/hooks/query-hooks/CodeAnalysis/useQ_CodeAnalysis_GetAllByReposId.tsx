'use client';
import { ICodeAnalysis } from '@/interfaces/code_analysis';
import { PaginatedResponseAPIDto } from '@/interfaces/common';
import codeAnalysisService from '@/services/code_analysis.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_CodeAnalysis_GetAllByReposId({
  options,
  reposId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICodeAnalysis[]>, Error>>;
  reposId: string;
}) {
  const query = useQuery({
    queryKey: ['code-analysis-all', reposId],
    queryFn: async () => {
      // Fetch with large limit to get all records
      const res = await codeAnalysisService.getByReposId({ page: 1, limit: 1000 }, reposId);
      return res;
    },
    enabled: !!reposId,
    ...options,
  });

  return query;
} 