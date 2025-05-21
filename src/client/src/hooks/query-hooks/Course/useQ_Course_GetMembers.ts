import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { IUser } from '@/interfaces/user';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_GetMembers({
  options,
  params,
  id,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<IUser[]>, Error>>;
  params: IGetAllQuery;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['courses', 'members', id, params],
    queryFn: () => courseService.memberInCourse(id, params),
    ...options,
  });

  return query;
}
