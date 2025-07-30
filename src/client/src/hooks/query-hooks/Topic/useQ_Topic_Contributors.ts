import { ResponseAPIDto } from '@/interfaces/common';
import { IReposContributors } from '@/interfaces/repos';
import topicService from '@/services/topic.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Topic_Contributors({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IReposContributors[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['topic', 'contributors', id],
    queryFn: async () => {
      const res = await topicService.getContributors(id);
      return res;
    },
    ...options,
  });

  return query;
}
