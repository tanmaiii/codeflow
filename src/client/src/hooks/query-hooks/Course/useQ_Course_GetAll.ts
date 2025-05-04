'use client'
import { ResponseAPIDto } from "@/interfaces/common";
import { ICourse } from "@/interfaces/course";
import courseService from "@/services/course.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_Course_GetAll({
  options,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDto<ICourse[]>, Error>>;
} = {}) {
  const query = useQuery({
    queryKey: ["courses"],
    queryFn: async () => {
      const res = courseService.getAll();
      return res;
    },
    ...options,
  });

  return query;
}
