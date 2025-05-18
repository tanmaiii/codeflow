'use client';
import { IGetAllQuery, ResponseAPIDtoWithPagination } from '@/interfaces/common';
import { ITopic } from '@/interfaces/topic';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Topic_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDtoWithPagination<ITopic[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ['topics', params],
    queryFn: async () => {
      const res = topicService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
