"use client";
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
import { IMAGES } from "@/data/images";
import { paths } from "@/data/path";
import userService from "@/services/user.service";
import NameTag from "../NameTag/NameTag";

export default function CardCourse() {
  return (
    <Card className="w-full bg-backgroud-2 gap-4 pt-3 overflow-hidden">
      <CardHeader className="px-3">
        <Image
          src={IMAGES.DEFAULT_COURSE}
          alt="Next.js"
          width={200}
          height={200}
          className="object-cover w-full h-24 rounded-md"
        />
      </CardHeader>
      <CardContent className="min-h-[60px] px-4 flex flex-col gap-2">
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
      <CardFooter className="flex flex-col px-4 w-full gap-2 items-start">
        <Button
          className="w-full dark:text-white"
          onClick={() => userService.getUsers()}
        >
          Xem khóa học
        </Button>
        <TextDescription>Edited 2h ago</TextDescription>
      </CardFooter>
    </Card>
  );
}
