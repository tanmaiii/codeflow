'use client'
import { IGetAllQuery, ResponseAPIDtoWithPagination } from "@/interfaces/common";
import { IUser } from "@/interfaces/user";
import userService from "@/services/user.service";

import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export default function useQ_User_GetAll({
  options,
  params,
}: {
  options?: Partial<UseQueryOptions<ResponseAPIDtoWithPagination<IUser[]>, Error>>;
  params: IGetAllQuery;
}) {
  const query = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      const res = userService.getAll(params);
      return res;
    },
    ...options,
  });

  return query;
}
