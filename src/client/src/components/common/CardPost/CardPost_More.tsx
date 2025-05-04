import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import { IconShare3, IconTrash } from "@tabler/icons-react";
import { EllipsisIcon, EyeIcon, PenIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CardPost_More() {
  const { localPath } = useH_LocalPath()
  const route = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="rounded" className="p-x-0" size={"icon"}>
          <EllipsisIcon size={26} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>
          <IconShare3 size={16} className="mr-2" />
          Share
        </DropdownMenuItem>
        <DropdownMenuItem>
          <EyeIcon size={16} className="mr-2" />
          View Post
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => {
            route.push(localPath(`/posts/update/${'123123123'}`))
          }}
        >
          <PenIcon size={16} className="mr-2" />
          Update Post
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconTrash size={16} className="mr-2" />
          Delete Post
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
