import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IReposContributors } from '@/interfaces/repos';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_Contributors({
  options,
  id,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IReposContributors[]>, Error>>;
  id: string;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ['course', 'contributors', id, params],
    queryFn: async () => {
      const res = await courseService.getContributors(id, params);
      return res;
    },
    ...options,
  });

  return query;
}
