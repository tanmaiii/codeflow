import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import TextHeading, { TextDescription } from "@/components/ui/text";
import Image from "next/image";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import NameTag from "../NameTag/NameTag";
import { paths } from "@/data/path";
import { IMAGES } from "@/data/images";

export default function CardCourse() {
  return (
    <Card className="w-full bg-white dark:bg-dark-2 gap-4 pt-2 overflow-hidden">
      <CardHeader className="px-2">
        <Image
          src={IMAGES.DEFAULT_COURSE}
          alt="Next.js"
          width={200}
          height={200}
          className="object-cover w-full h-24 rounded-md"
        />
      </CardHeader>
      <CardContent className="min-h-[60px] flex flex-col gap-2">
        <div className="flex flex-col gap-2">
          <Link href={"/"} className="flex items-center gap-2">
            <Image
              src={IMAGES.LOGO}
              alt="Next.js"
              width={100}
              height={100}
              className="object-cover w-6 h-6 circle rounded-full"
            />
            <TextDescription className="text-primary">CodeFlow</TextDescription>
          </Link>
          <Link href={paths.COURSES + "/123"} className="text-lg">
            <TextHeading>Học lập trình ReactJS</TextHeading>
          </Link>
          <div>
            <NameTag>ReactJS</NameTag>
            <NameTag>HTML/CSS</NameTag>
            <NameTag>Git</NameTag>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <TextDescription>Edited 2h ago</TextDescription>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-10 h-10 p-0 rounded-full">
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}
