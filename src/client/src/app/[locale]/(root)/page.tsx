import CardCourse from "@/components/common/CardCourse/CardCourse";

export default function Page() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 2xl:grid-cols-4">
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
