import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/data/path";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import { IPost } from "@/interfaces/post";
import postService from "@/services/post.service";
import { useUserStore } from "@/stores/user_store";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisIcon, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ActionDelete from "../Action/ActionDelete";

interface CardPost_MoreProps {
  post: IPost;
}

export default function CardPost_More({ post }: CardPost_MoreProps) {
  const user = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const queryClient = useQueryClient();

  const onView = () => {
    router.push(localPath(paths.POSTS + "/" + post.id));
  };

  const onUpdate = () => {
    router.push(localPath(paths.POST_UPDATE + "/" + post.id));
  };

  const mutationDelete = useMutation({
    mutationFn: () => {
      return postService.delete(post.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="rounded" className="p-x-0" size={"icon"}>
          <EllipsisIcon size={26} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem className="cursor-pointer" onClick={onView}>
          <IconEye size={16} className="mr-2" />
          View Post
        </DropdownMenuItem>
        {user?.user?.id === post?.author?.id && (
          <DropdownMenuItem className="cursor-pointer" onClick={onUpdate}>
            <PenIcon size={16} className="mr-2" />
            Update Post
          </DropdownMenuItem>
        )}
        {user?.user?.id === post?.author?.id && (
          <ActionDelete
            trigger={
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <IconTrash size={16} className="mr-2" />
                Delete Post
              </DropdownMenuItem>
            }
            title={post.title}
            onSubmit={() => mutationDelete.mutate()}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
