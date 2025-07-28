import { ResponseAPIDto } from '@/interfaces/common';
import { IReposContributors } from '@/interfaces/repos';
import reposService from '@/services/repos.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Repos_GetContributors({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReposContributors[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['repos', 'contributors', id],
    queryFn: async () => {
      const res = await reposService.getContributors(id);
      return res;
    },
    ...options,
  });

  return query;
}
