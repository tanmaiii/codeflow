import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { paths } from "@/data/path";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import courseService from "@/services/course.service";
import { useUserStore } from "@/stores/user_store";
import { IconEye, IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EllipsisIcon, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import ActionDelete from "../Action/ActionDelete";
import { ICourse } from "@/interfaces/course";
interface CardCourse_MoreProps {
  course: ICourse;
}

export default function CardCourse_More({ course }: CardCourse_MoreProps) {
  const user = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const queryClient = useQueryClient();

  const onView = () => {
    router.push(localPath(paths.POSTS + "/" + course.id));
  };

  const onUpdate = () => {
    router.push(localPath(paths.POST_UPDATE + "/" + course.id));
  };

  const mutationDelete = useMutation({
    mutationFn: () => {
      return courseService.delete(course.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
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
          View Course
        </DropdownMenuItem>
        {user?.user?.id === course?.author?.id && (
          <DropdownMenuItem className="cursor-pointer" onClick={onUpdate}>
            <PenIcon size={16} className="mr-2" />
            Update Course
          </DropdownMenuItem>
        )}
        {user?.user?.id === course?.author?.id && (
          <ActionDelete
            trigger={
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <IconTrash size={16} className="mr-2" />
                Delete Course
              </DropdownMenuItem>
            }
            title={course.title}
            onSubmit={() => mutationDelete.mutate()}
          />
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
