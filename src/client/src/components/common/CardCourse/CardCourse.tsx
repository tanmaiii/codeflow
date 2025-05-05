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
import { ICourse } from "@/interfaces/course";
import NameTags from "../NameTags/NameTags";
import apiConfig from "@/lib/api";
import { utils_TimeAgo } from "@/utils/date";

interface CardCourseProps {
  course: ICourse;
}

export default function CardCourse({ course }: CardCourseProps) {
  return (
    <Card className="w-full gap-4 pt-3 overflow-hidden">
      <CardHeader className="px-3">
        <Image
          src={course?.thumbnail ?? IMAGES.DEFAULT_COURSE}
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
              src={
                course?.author?.avatar ??
                apiConfig.avatar(course?.author?.name ?? "c")
              }
              alt="Next.js"
              width={100}
              height={100}
              className="object-cover w-6 h-6 circle rounded-full"
            />
            <TextDescription className="text-primary">
              {course?.author?.name}
            </TextDescription>
          </Link>
          <Link href={paths.COURSES + "/123"} className="text-lg">
            <TextHeading>{course.title}</TextHeading>
          </Link>
          <NameTags tags={course?.tags} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col px-4 w-full gap-2 items-start mt-auto">
        <Button
          className="w-full dark:text-white"
          onClick={() => userService.getUsers()}
        >
          Xem khóa học
        </Button>
        <TextDescription>
          Cập nhật {utils_TimeAgo(new Date(course.updatedAt ?? ""))}
        </TextDescription>
      </CardFooter>
    </Card>
  );
}
