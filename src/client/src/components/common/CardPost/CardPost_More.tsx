import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconShare3, IconTrash } from "@tabler/icons-react";
import { EllipsisIcon, PenIcon } from "lucide-react";

interface CardPost_MoreProps {
  onUpdate?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export default function CardPost_More({
  onUpdate,
  onDelete,
  onView,
}: CardPost_MoreProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="rounded" className="p-x-0" size={"icon"}>
          <EllipsisIcon size={26} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {onView && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              onView?.();
            }}
          >
            <IconShare3 size={16} className="mr-2" />
            Share
          </DropdownMenuItem>
        )}
        {onUpdate && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              onUpdate?.();
            }}
          >
            <PenIcon size={16} className="mr-2" />
            Update Post
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              onDelete?.();
            }}
          >
            <IconTrash size={16} className="mr-2" />
            Delete Post
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
