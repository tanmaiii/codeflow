'use client'
import { IGetAllQuery, PaginatedResponseAPIDto } from "@/interfaces/common";
import { ICourse } from "@/interfaces/course";
import courseService from "@/services/course.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Course_GetAllRegistered({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<PaginatedResponseAPIDto<ICourse[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ["courses", "registered", params],
    queryFn: async () => {
      const res = courseService.getAllRegistered(params);
      return res;
    },
    ...options,
  });

  return query;
}
