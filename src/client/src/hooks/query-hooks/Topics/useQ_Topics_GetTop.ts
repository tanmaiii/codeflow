import { useQuery } from '@tanstack/react-query';
import { ITopic } from '@/interfaces/topic';
import { api } from '@/lib/api';

interface GetTopTopicsParams {
  limit?: number;
  sortBy?: 'activityScore' | 'memberCount' | 'reposCount' | 'codeAnalysis';
  courseId?: string;
}

interface GetTopTopicsResponse {
  data: ITopic[];
  message: string;
}

const getTopTopics = async (params: GetTopTopicsParams): Promise<GetTopTopicsResponse> => {
  const searchParams = new URLSearchParams();
  
  if (params.limit) searchParams.append('limit', params.limit.toString());
  if (params.sortBy) searchParams.append('sortBy', params.sortBy);
  if (params.courseId) searchParams.append('courseId', params.courseId);

  const response = await api.get(`/topics/top?${searchParams.toString()}`);
  return response.data;
};

export const useQ_Topics_GetTop = (params: GetTopTopicsParams = {}) => {
  return useQuery({
    queryKey: ['topics', 'top', params],
    queryFn: () => getTopTopics(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
