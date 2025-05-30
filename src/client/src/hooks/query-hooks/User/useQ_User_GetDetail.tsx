import {
    ResponseAPIDto
} from "@/interfaces/common";
import { IUser } from "@/interfaces/user";
import userService from "@/services/user.service";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";

  export default function useQ_User_GetDetail({
    options,
    id,
  }: {
    options?: Partial<UseQueryOptions<ResponseAPIDto<IUser>, Error>>;
    id: string;
  }) {
    const query = useQuery({
      queryKey: ["courses", "detail", id],
      queryFn: async () => {
        const res = userService.getById(id);
        return res;
      },
      ...options,
    });
  
    return query;
  }
  