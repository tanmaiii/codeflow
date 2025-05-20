import { ResponseAPIDto } from '@/interfaces/common';
import { IUser } from '@/interfaces/user';
import courseService from '@/services/course.service';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_GetMembers({
  options,
  id,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<IUser[]>, Error>>;
  id: string;
}) {
  const query = useQuery({
    queryKey: ['courses', 'members', id],
    queryFn: () => courseService.memberInCourse(id),
    ...options,
  });

  return query;
}
