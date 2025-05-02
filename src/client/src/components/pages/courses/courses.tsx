'use client'
import CardCourse from "@/components/common/CardCourse/CardCourse";
import TextHeading, { TextDescription } from "@/components/ui/text";
import useQ_Course_GetAll from "@/hooks/query-hooks/Course/useQ_Course_GetAll";

export default function Courses() {
  const Q_Courses = useQ_Course_GetAll();

  if (Q_Courses.isLoading) return <TextDescription>Loading...</TextDescription>;
  if (Q_Courses.error) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="w-full h-full">
      <div className="border-b py-2 flex items-center flex-row gap-4">
        <div className="flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md text-primary">
          <TextHeading>Tất cả khóa học</TextHeading>
        </div>
        <div className="flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md">
          <TextHeading>Đã đăng ký</TextHeading>
        </div>
        <div className="flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md">
          <TextHeading>Đã hoàn thành</TextHeading>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3 2xl:grid-cols-5 py-2">
        {Q_Courses.data &&
          Q_Courses.data?.data?.map((course) => (
            <CardCourse key={course.id} course={course} />
          ))}
      </div>
    </div>
  );
}
