'use client';
import CardFile from '@/components/common/CardFile/CardFile';
import NameTags from '@/components/common/NameTags/NameTags';
import NoData from '@/components/common/NoData/NoData';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import TitleHeader from '@/components/layout/TitleHeader';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { TYPE_COURSE } from '@/contants/object';
import { paths } from '@/data/path';
import useQ_Course_GetDetail from '@/hooks/query-hooks/Course/useQ_Course_GetDetail';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import apiConfig from '@/lib/api';
import { useUserStore } from '@/stores/user_store';
import {
  utils_CalculateProgress,
  utils_DateToDDMMYYYY,
  utils_DateToDDMonth,
  utils_TimeAgo,
  utils_TimeRemaining,
} from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { IconCalendar, IconClockHour1, IconPencil, IconUsers } from '@tabler/icons-react';
import { cx } from 'class-variance-authority';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Courses_Summary from './Courses_Summary';
import useQ_Course_GetComments from '@/hooks/query-hooks/Course/useQ_Course_GetComments';
import Comments from '@/components/common/Comments/Comments';
import commentService from '@/services/comment.service';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function Courses_Detail() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations('course');
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const { user } = useUserStore();
  const queryClient = useQueryClient();

  const {
    data: dataCourse,
    isLoading,
    isError,
  } = useQ_Course_GetDetail({
    id: id,
  });

  const mutionComment = useMutation({
    mutationFn: (value: string) => {
      return commentService.create({
        content: value,
        courseId: dataCourse?.data?.id ?? '',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course', 'comments', id] });
    },
  });

  const { data: dataComments } = useQ_Course_GetComments({
    id: id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!dataCourse) return <NoData />;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <Card className="flex flex-col gap-2 p-4 lg:p-6 min-h-[90vh]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <TitleHeader
                title={`${TYPE_COURSE.find(item => item.value === dataCourse.data?.type)?.label}: ${
                  dataCourse.data?.title
                }`}
                onBack={true}
              />
              {user?.id === dataCourse.data?.author?.id && (
                <Button
                  variant="none"
                  size="sm"
                  onClick={() => router.push(localPath(paths.COURSE_UPDATE(id)))}
                >
                  <IconPencil className="size-6" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 mt-4 mb-2">
              <Image
                className="w-12 h-12 object-cover rounded-full bg-background-1"
                src={
                  dataCourse.data?.author?.avatar
                    ? utils_ApiImageToLocalImage(dataCourse.data?.author?.avatar)
                    : apiConfig.avatar(dataCourse.data?.author?.name ?? 'c')
                }
                alt={dataCourse.data?.title}
                width={40}
                height={40}
              />
              <div>
                <TextHeading>{dataCourse.data?.author?.name}</TextHeading>
                {dataCourse.data?.createdAt && (
                  <TextDescription>
                    {utils_DateToDDMonth(dataCourse.data?.createdAt ?? '')} -{' '}
                    {utils_TimeAgo(dataCourse.data?.createdAt ?? '')}
                  </TextDescription>
                )}
              </div>
            </div>
            <NameTags tags={dataCourse.data?.tags} max={dataCourse.data?.tags.length} />
            <div className="">
              {new Date(dataCourse?.data?.startDate) < new Date() && (
                <div className="flex flex-row items-center rounded-md gap-2  bg-primary/30  p-4 relative overflow-hidden mb-2">
                  <IconClockHour1 className="text-color-1 size-5" />
                  <TextHeading>{t('topicDeadline') + ': '}</TextHeading>
                  <TextDescription className="text-color-1 ">
                    {utils_DateToDDMMYYYY(dataCourse.data?.topicDeadline)} (
                    {utils_TimeRemaining(dataCourse.data?.topicDeadline)})
                  </TextDescription>
                  <div
                    className={cx('h-1 bg-input/60 w-full absolute right-0 bottom-0 rounded-md')}
                  >
                    <div
                      className={cx('h-1 bg-green-500 w-full absolute left-0 bottom-0 rounded-md')}
                      style={{
                        width: `${utils_CalculateProgress(
                          dataCourse.data?.startDate ?? '',
                          dataCourse.data?.topicDeadline ?? '',
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {new Date(dataCourse?.data?.startDate) > new Date() && (
                <div className="flex flex-row items-center rounded-md gap-2  bg-primary/30  p-4 relative overflow-hidden">
                  <IconClockHour1 className="text-color-1 size-5" />
                  {new Date(dataCourse?.data?.regStartDate) > new Date() && (
                    <TextHeading>{t('notStartRegister')}</TextHeading>
                  )}
                  {new Date(dataCourse?.data?.regStartDate) < new Date() &&
                    new Date(dataCourse?.data?.regEndDate) > new Date() && (
                      <>
                        <TextHeading>{t('regEndDate') + ': '}</TextHeading>
                        <TextDescription className="text-color-1">{`${utils_DateToDDMMYYYY(
                          dataCourse.data?.regEndDate,
                        )} (${utils_TimeRemaining(dataCourse.data?.regEndDate)})`}</TextDescription>
                        <div
                          className={cx(
                            'h-1 bg-input/60 w-full absolute right-0 bottom-0 rounded-md',
                          )}
                        >
                          <div
                            className={cx(
                              'h-1 bg-green-500 w-full absolute left-0 bottom-0 rounded-md',
                            )}
                            style={{
                              width: `${utils_CalculateProgress(
                                dataCourse.data?.regStartDate ?? '',
                                dataCourse.data?.regEndDate ?? '',
                              )}%`,
                            }}
                          />
                        </div>
                      </>
                    )}
                  {new Date(dataCourse?.data?.regEndDate) < new Date() && (
                    <TextHeading>{t('endRegister')}</TextHeading>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('regStartDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(dataCourse.data?.regStartDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('regEndDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(dataCourse.data?.regEndDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('startDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(dataCourse.data?.startDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('endDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(dataCourse.data?.endDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconClockHour1 className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('topicDeadline') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(dataCourse.data?.topicDeadline)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconUsers className="text-color-2 size-5" />
                  <TextDescription className="text-md">
                    {t('maxGroupMembers') + ': '}
                  </TextDescription>
                  <TextHeading>{dataCourse.data?.maxGroupMembers}</TextHeading>
                </div>
              </div>
            </div>
            <SwapperHTML content={dataCourse.data?.description ?? ''} />
          </div>
          <div className="flex flex-col">
            {dataCourse.data?.documents.length > 0 && (
              <>
                <TextHeading className="font-bold mb-4">{t('documents')}</TextHeading>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {dataCourse.data?.documents?.map(file => (
                    <CardFile key={file.id} file={file} />
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col gap-2 mt-auto">
            {dataComments?.data && (
              <Comments
                onSubmit={value => mutionComment.mutate(value)}
                comments={dataComments.data}
              />
            )}
          </div>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-4 xl:col-span-3 sticky top-20">
        <div className="sticky top-20">
          {dataCourse.data && <Courses_Summary course={dataCourse.data} />}
        </div>
      </div>
    </div>
  );
}
