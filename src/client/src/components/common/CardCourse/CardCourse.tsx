"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { IMAGES } from "@/data/images";
import { paths } from "@/data/path";
import { ICourse } from "@/interfaces/course";
import NameTags from "../NameTags/NameTags";
import apiConfig from "@/lib/api";
import { utils_TimeAgo } from "@/utils/date";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import CardCourse_More from "./CardCourse_More";
import { utils_ApiImageToLocalImage } from "@/utils/image";
import TextHeading, { TextDescription } from "@/components/ui/text";

interface CardCourseProps {
  course: ICourse;
}

export default function CardCourse({ course }: CardCourseProps) {
  const t = useTranslations("course");
  const router = useRouter();
  const { localPath } = useH_LocalPath();

  const onShowCourse = () => {
    router.push(`${localPath(paths.COURSES)}/${course.id}`);
  };

  return (
    <Card className="w-full gap-4 pt-3 overflow-hidden group">
      <CardHeader className="px-3">
        <div className="relative">
          <Image
            src={
              course?.thumbnail
                ? utils_ApiImageToLocalImage(course.thumbnail)
                : IMAGES.DEFAULT_COURSE
            }
            alt={course?.thumbnail ?? ''}
            width={200}
            height={160}
            className="object-cover w-full h-[120px] rounded-md cursor-pointer"
            onClick={onShowCourse}
          />
          <CardCourse_More
            course={course}
            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
      </CardHeader>
      <CardContent className="min-h-[60px] px-4 flex flex-1 flex-col gap-2">
        <Link href={"/"} className="flex items-center gap-2">
          <Image
            src={
              course?.author?.avatar ??
              apiConfig.avatar(course?.author?.name ?? "c")
            }
            alt={course?.author?.avatar ?? ''}
            width={100}
            height={100}
            className="object-cover w-6 h-6 circle rounded-full"
          />
          <TextDescription className="text-primary line-clamp-1 ">
            {course?.author?.name}
          </TextDescription>
        </Link>
        <Link href={`${localPath(paths.COURSES)}/${course.id}`} className="text-lg">
          <TextHeading className="line-clamp-2 hover:underline">{course.title}</TextHeading>
        </Link>
        <NameTags className="mt-auto" tags={course?.tags} />
      </CardContent>
      <CardFooter className="flex flex-col px-4 w-full gap-2 items-start mt-auto">
        <Button
          className="w-full dark:text-white"
          onClick={onShowCourse}
        >
          {t("view")}
        </Button>
        <TextDescription>
          {t("updated")} {utils_TimeAgo(new Date(course.updatedAt ?? ""))}
        </TextDescription>
      </CardFooter>
    </Card>
  );
}
