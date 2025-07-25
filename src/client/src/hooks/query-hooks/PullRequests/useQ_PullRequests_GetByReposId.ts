'use client';
import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IPullRequest } from '@/interfaces/repos';
import pullRequestsService from '@/services/pull_requests.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_PullRequests_GetByReposId({
  options,
  params,
  reposId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IPullRequest[]>, Error>>;
  params: IGetAllQuery;
  reposId: string;
}) {
  const query = useQuery({
    queryKey: ['pull-requests', params],
    queryFn: async () => {
      const res = pullRequestsService.getByReposId(params, reposId);
      return res;
    },
    ...options,
  });

  return query;
}
