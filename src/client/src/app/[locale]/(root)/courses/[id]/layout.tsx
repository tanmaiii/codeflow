'use client';

import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@/stores/user_store';
import courseService from '@/services/course.service';
import { useParams, useRouter } from 'next/navigation';
import { paths } from '@/data/path';
import { useEffect, useState } from 'react';
import CourseDetailSkeleton from '@/components/skeletons/CourseDetailSkeleton';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUserStore();
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Query kiểm tra tham gia khóa học
  const { data: isJoined, isLoading: isLoadingJoin } = useQuery({
    queryKey: ['course', courseId, user, 'join'],
    queryFn: async () => {
      const response = await courseService.checkJoinCourse(courseId);
      if (response.data.length > 0) {
        return response.data.some(enrollment => enrollment.userId === user?.id);
      }
      return false;
    },
    enabled: !!user && !!courseId,
  });

  // Query lấy thông tin khóa học
  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', courseId, 'detail'],
    queryFn: async () => {
      const response = await courseService.getById(courseId);
      return response.data;
    },
    enabled: !!courseId,
  });

  const isAuthor = course?.authorId === user?.id;
  const isLoading = isLoadingJoin || isLoadingCourse;

  useEffect(() => {
    if (!user) {
      router.push(paths.LOGIN);
      return;
    }

    if (!isLoading && !isJoined && !isAuthor) {
      router.push(paths.COURSES);
    }
  }, [user, isLoading, isJoined, isAuthor, router]);

  if (isLoading || !isReady) {
    return <CourseDetailSkeleton />;
  }

  return <div>{children}</div>;
}
