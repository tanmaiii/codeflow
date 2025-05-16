'use client';
import { IGetAllQuery, ResponseAPIDtoWithPagination } from '@/interfaces/common';
import { ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

interface ParamsProps extends IGetAllQuery {
  courseId: string;
}

interface UseQ_Topic_GetAllByCourseIdProps {
  options?: Partial<UseQueryOptions<ResponseAPIDtoWithPagination<ITopic[]>, Error>>;
  params: ParamsProps;
}

export default function useQ_Topic_GetAllByCourseId({
  options,
  params,
}: UseQ_Topic_GetAllByCourseIdProps) {
  const query = useQuery({
    queryKey: ['topics', 'course', params],
    queryFn: async () => {
      const res = topicService.getAllByCourseId(params, params.courseId);
      return res;
    },
    ...options,
  });

  return query;
}
