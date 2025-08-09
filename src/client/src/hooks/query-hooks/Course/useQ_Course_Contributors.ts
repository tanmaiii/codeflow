import { ResponseAPIDto } from '@/interfaces/common';
import { IReposContributors } from '@/interfaces/repos';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_Contributors({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReposContributors[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['course', 'contributors', id],
    queryFn: async () => {
      const res = await courseService.getContributors(id);
      return res;
    },
    ...options,
  });

  return query;
}
