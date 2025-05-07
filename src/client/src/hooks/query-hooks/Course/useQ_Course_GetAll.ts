'use client'
import { IGetAllQuery, ResponseAPIDtoWithPagination } from "@/interfaces/common";
import { ICourse } from "@/interfaces/course";
import courseService from "@/services/course.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Course_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDtoWithPagination<ICourse[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ["courses", params],
    queryFn: async () => {
      const res = courseService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
