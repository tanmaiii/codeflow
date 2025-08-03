'use client';
import PasswordInput from '@/components/common/Input/PasswordInput/PasswordInput';
import MyImage from '@/components/common/MyImage';
import NameTags from '@/components/common/NameTags/NameTags';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import TitleHeader from '@/components/layout/TitleHeader';
import { CourseDetailSkeleton } from '@/components/skeletons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import MemberAvatar from '@/components/ui/member-avatar';
import { Separator } from '@/components/ui/separator';
import { IMAGES } from '@/data/images';
import courseService from '@/services/course.service';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMMYYYY } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { BookOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const joinCourseSchema = z.object({
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

type JoinCourseFormData = z.infer<typeof joinCourseSchema>;

export default function CoursesCheck({ children }: { children: React.ReactNode }) {
  const { user } = useUserStore();
  const params = useParams();
  const queryClient = useQueryClient();
  const courseId = params?.id as string;
  const t = useTranslations('course');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<JoinCourseFormData>({
    resolver: zodResolver(joinCourseSchema),
  });

  const { data: isJoined, isLoading: isLoadingJoin } = useQuery({
    queryKey: ['course', courseId, user, 'join'],
    queryFn: async () => {
      const response = await courseService.checkJoinCourse(courseId);
      return response.data;
    },
    enabled: !!user && !!courseId,
  });

  const { data: course, isLoading: isLoadingCourse } = useQuery({
    queryKey: ['course', courseId, 'detail'],
    queryFn: async () => {
      const response = await courseService.getById(courseId);
      return response.data;
    },
    enabled: !!courseId,
  });

  const joinCourseMutation = useMutation({
    mutationFn: ({ password }: { password: string }) =>
      courseService.joinCourse(courseId, password),
    onSuccess: () => {
      toast.success('Tham gia khóa học thành công!');
      queryClient.invalidateQueries({ queryKey: ['course', courseId, user, 'join'] });
      reset();
    },
    onError: (error: unknown) => {
        reset();
        const message =
        (error as { response?: { data?: { message?: string } } })?.response?.data?.message ||
        'Có lỗi xảy ra khi tham gia khóa học';
      toast.error(message);
    },
  });

  const onSubmit = (data: JoinCourseFormData) => {
    joinCourseMutation.mutate({ password: data.password });
  };

  const isAuthor = course?.authorId === user?.id;
  if (isLoadingJoin || isLoadingCourse) return <CourseDetailSkeleton />;

  if (!isJoined && course && !isAuthor) {
    const isRegistrationOpen = () => {
      const now = new Date();
      const regStart = new Date(course.regStartDate);
      const regEnd = new Date(course.regEndDate);
      return now >= regStart && now <= regEnd;
    };

    return (
      <div className="min-h-screen">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Card className="overflow-hidden p-0">
            {/* Course Header */}
            <div className="relative">
              <div className="relative w-full h-48 md:h-64 overflow-hidden bg-black/40">
                <MyImage
                  src={
                    course?.thumbnail
                      ? utils_ApiImageToLocalImage(course.thumbnail)
                      : IMAGES.DEFAULT_COURSE
                  }
                  alt={course.title}
                  fill
                  defaultSrc={IMAGES.DEFAULT_COURSE.src}
                  className="object-cover transition-transform duration-300 hover:scale-105 opacity-80"
                />
              </div>
            </div>

            <CardContent className="p-6">
              {/* Course Info */}
              <div className="flex flex-col gap-6">
                <div className="">
                  <TitleHeader onBack title={course?.title} />
                  <div className="flex items-center gap-2">
                    <MemberAvatar
                      name={course?.author?.name ?? ''}
                      description=""
                      size={40}
                      id={course?.author?.id}
                    />
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2 flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    {t('description')}
                  </h3>
                  <SwapperHTML content={course?.description ?? ''} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">{t('tags')}</h3>
                  <NameTags
                    className="mt-2 p-4 rounded-sm bg-background-1 mb-6"
                    tags={course.tags}
                    max={course.tags.length}
                  />
                </div>
              </div>

              <Separator className="my-6" />

              {/* Join Form */}
              <div className="max-w-md mx-auto">
                <Card>
                  <CardHeader className="text-center">
                    <CardTitle>{t('joinCourse')}</CardTitle>
                    <CardDescription>
                      {isRegistrationOpen() ? t('enterPasswordToJoin') : t('registrationEnded')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {isRegistrationOpen() ? (
                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <PasswordInput
                          label={'Password'}
                          error={errors.password?.message}
                          description={t('joinDescription')}
                          registration={register('password')}
                        />
                        <Button
                          type="submit"
                          className="w-full"
                          disabled={joinCourseMutation.isPending}
                        >
                          {joinCourseMutation.isPending ? t('joining') : t('join')}
                        </Button>
                      </form>
                    ) : (
                      <div className="text-center py-4">
                        <p className="text-muted-foreground mb-4">
                          {t('registrationPeriod')}: {utils_DateToDDMMYYYY(course.regStartDate)} -{' '}
                          {utils_DateToDDMMYYYY(course.regEndDate)}
                        </p>
                        <Button variant="secondary" disabled className="w-full">
                          {t('registrationEnded')}
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return <div>{children}</div>;
}
