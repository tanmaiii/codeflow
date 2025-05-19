import { Skeleton } from '@/components/ui/skeleton';

export default function CourseDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <div className="w-full space-y-6">
          {/* Thumbnail */}
          <div className="">
            <Skeleton className="w-full h-[40vh] rounded-lg" />
          </div>

          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3].map(i => (
              <Skeleton key={i} className="h-6 w-20 rounded-full" />
            ))}
          </div>

          {/* Content */}
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Footer */}
          <div className="flex justify-between items-center pt-4">
            <Skeleton className="h-10 w-[120px]" />
            <Skeleton className="h-10 w-[120px]" />
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 xl:col-span-3 sticky top-20">
        <div className="flex flex-col gap-4">
          <Skeleton className="w-full h-[100px] rounded-lg" />
          <Skeleton className="w-full h-[100px] rounded-lg" />
        </div>
      </div>
    </div>
  );
}
