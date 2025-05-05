import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconTrash } from "@tabler/icons-react";
import { EllipsisVertical, PenIcon } from "lucide-react";
import CardPost_Button from "../CardPost/CardPost_Button";
import { useTranslations } from "next-intl";

interface Comment_MoreProps {
  onUpdate?: () => void;
  onDelete?: () => void;
}

export default function Comment_More({
  onUpdate,
  onDelete,
}: Comment_MoreProps) {
  const t = useTranslations("comment");

  if (!onUpdate && !onDelete) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <CardPost_Button
          className="p-x-0"
          icon={<EllipsisVertical size={20} />}
          onClick={() => {}}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {onUpdate && (
          <DropdownMenuItem className="cursor-pointer" onClick={onUpdate}>
            <PenIcon size={16} className="mr-2" />
            {t("editComment")}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem className="cursor-pointer" onClick={onDelete}>
            <IconTrash size={16} className="mr-2" />
            {t("deleteComment")}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
