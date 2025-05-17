'use client';
import CardFile from '@/components/common/CardFile/CardFile';
import NameTags from '@/components/common/NameTags/NameTags';
import NoData from '@/components/common/NoData/NoData';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
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
import { TYPE_COURSE } from '@/contants/object';
import TitleHeader from '@/components/layout/TitleHeader';

export default function Courses_Detail() {
  const params = useParams();
  const id = params.id as string;
  const t = useTranslations('course');
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const { user } = useUserStore();

  const {
    data: Q_data,
    isLoading,
    isError,
  } = useQ_Course_GetDetail({
    id: id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!Q_data) return <NoData />;
  if (isError) return <div>Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-12 md:col-span-8 xl:col-span-9">
        <Card className="flex flex-col gap-2 p-4 lg:p-6 min-h-[90vh]">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center justify-between gap-2">
              <TitleHeader
                title={`${TYPE_COURSE.find(item => item.value === Q_data.data?.type)?.label}: ${
                  Q_data.data?.title
                }`}
                onBack={true}
              />
              {user?.id === Q_data.data?.author?.id && (
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
                  Q_data.data?.author?.avatar
                    ? utils_ApiImageToLocalImage(Q_data.data?.author?.avatar)
                    : apiConfig.avatar(Q_data.data?.author?.name ?? 'c')
                }
                alt={Q_data.data?.title}
                width={40}
                height={40}
              />
              <div>
                <TextHeading>{Q_data.data?.author?.name}</TextHeading>
                {Q_data.data?.createdAt && (
                  <TextDescription>
                    {utils_DateToDDMonth(Q_data.data?.createdAt ?? '')} -{' '}
                    {utils_TimeAgo(Q_data.data?.createdAt ?? '')}
                  </TextDescription>
                )}
              </div>
            </div>
            <NameTags tags={Q_data.data?.tags} max={Q_data.data?.tags.length} />
            <div className="">
              {new Date(Q_data?.data?.startDate) < new Date() && (
                <div className="flex flex-row items-center rounded-md gap-2  bg-primary/30  p-4 relative overflow-hidden mb-2">
                  <IconClockHour1 className="text-color-1 size-5" />
                  <TextHeading>{t('topicDeadline') + ': '}</TextHeading>
                  <TextDescription className="text-color-1 ">
                    {utils_DateToDDMMYYYY(Q_data.data?.topicDeadline)} (
                    {utils_TimeRemaining(Q_data.data?.topicDeadline)})
                  </TextDescription>
                  <div
                    className={cx('h-1 bg-input/60 w-full absolute right-0 bottom-0 rounded-md')}
                  >
                    <div
                      className={cx('h-1 bg-green-500 w-full absolute left-0 bottom-0 rounded-md')}
                      style={{
                        width: `${utils_CalculateProgress(
                          Q_data.data?.startDate ?? '',
                          Q_data.data?.topicDeadline ?? '',
                        )}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {new Date(Q_data?.data?.startDate) > new Date() && (
                <div className="flex flex-row items-center rounded-md gap-2  bg-primary/30  p-4 relative overflow-hidden">
                  <IconClockHour1 className="text-color-1 size-5" />
                  {new Date(Q_data?.data?.regStartDate) > new Date() && (
                    <TextHeading>{t('notStartRegister')}</TextHeading>
                  )}
                  {new Date(Q_data?.data?.regStartDate) < new Date() &&
                    new Date(Q_data?.data?.regEndDate) > new Date() && (
                      <>
                        <TextHeading>{t('regEndDate') + ': '}</TextHeading>
                        <TextDescription className="text-color-1">{`${utils_DateToDDMMYYYY(
                          Q_data.data?.regEndDate,
                        )} (${utils_TimeRemaining(Q_data.data?.regEndDate)})`}</TextDescription>
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
                                Q_data.data?.regStartDate ?? '',
                                Q_data.data?.regEndDate ?? '',
                              )}%`,
                            }}
                          />
                        </div>
                      </>
                    )}
                  {new Date(Q_data?.data?.regEndDate) < new Date() && (
                    <TextHeading>{t('endRegister')}</TextHeading>
                  )}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('regStartDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(Q_data.data?.regStartDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('regEndDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(Q_data.data?.regEndDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('startDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(Q_data.data?.startDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconCalendar className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('endDate') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(Q_data.data?.endDate)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconClockHour1 className="text-color-2 size-5" />
                  <TextDescription className="text-md">{t('topicDeadline') + ': '}</TextDescription>
                  <TextHeading>{utils_DateToDDMMYYYY(Q_data.data?.topicDeadline)}</TextHeading>
                </div>
                <div className="flex flex-row items-center gap-2">
                  <IconUsers className="text-color-2 size-5" />
                  <TextDescription className="text-md">
                    {t('maxGroupMembers') + ': '}
                  </TextDescription>
                  <TextHeading>{Q_data.data?.maxGroupMembers}</TextHeading>
                </div>
              </div>
            </div>
            <SwapperHTML content={Q_data.data?.description ?? ''} />
          </div>
          <div className="flex flex-col">
            {Q_data.data?.documents.length > 0 && (
              <>
                <TextHeading className="font-bold mb-4">{t('documents')}</TextHeading>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {Q_data.data?.documents?.map(file => (
                    <CardFile key={file.id} file={file} />
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
      <div className="col-span-12 md:col-span-4 xl:col-span-3 sticky top-20">
        <div className="sticky top-20">
          {Q_data.data && <Courses_Summary course={Q_data.data} />}
        </div>
      </div>
    </div>
  );
}
