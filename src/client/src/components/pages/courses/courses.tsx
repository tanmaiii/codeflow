import CardCourse from "@/components/common/CardCourse/CardCourse";
import TextHeading from "@/components/ui/text";

export default function Courses() {
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
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
        <CardCourse />
      </div>
    </div>
  );
}
