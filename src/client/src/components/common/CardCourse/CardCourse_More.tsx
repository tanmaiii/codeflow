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
import { useTranslations } from "next-intl";
interface CardCourse_MoreProps {
  course: ICourse;
  className?: string;
}

export default function CardCourse_More({
  course,
  className,
}: CardCourse_MoreProps) {
  const user = useUserStore();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const queryClient = useQueryClient();
  const t = useTranslations("course");

  const onView = () => {
    router.push(localPath(paths.COURSES + "/" + course.id));
  };

  const onUpdate = () => {
    router.push(localPath(paths.COURSE_UPDATE + "/" + course.id));
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
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="rounded" size={"icon"} className="bg-white/30">
            <EllipsisIcon size={26} className="text-color-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem className="cursor-pointer" onClick={onView}>
            <IconEye size={16} className="mr-2" />
            {t("viewCourse")}
          </DropdownMenuItem>
          {user?.user?.id === course?.author?.id && (
            <DropdownMenuItem className="cursor-pointer" onClick={onUpdate}>
              <PenIcon size={16} className="mr-2" />
              {t("updateCourse")}
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
                  {t("deleteCourse")}
                </DropdownMenuItem>
              }
              title={course.title}
              onSubmit={() => mutationDelete.mutate()}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
