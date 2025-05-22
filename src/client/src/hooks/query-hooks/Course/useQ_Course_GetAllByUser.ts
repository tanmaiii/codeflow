'use client';
import { IGetAllQuery, PaginatedResponseAPIDto } from '@/interfaces/common';
import { ICourse } from '@/interfaces/course';
import courseService from '@/services/course.service';

import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export default function useQ_Course_GetAllByUser({
  options,
  params,
  userId,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICourse[]>, Error>>;
  params: IGetAllQuery;
  userId: string;
}) {
  const query = useQuery({
    queryKey: ['courses', 'author', params],
    queryFn: async () => {
      const res = courseService.getAllByUser(userId, params);
      return res;
    },
    ...options,
  });

  return query;
}
