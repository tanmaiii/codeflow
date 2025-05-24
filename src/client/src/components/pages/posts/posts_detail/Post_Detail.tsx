'use client';

import Comments from '@/components/common/Comments/Comments';
import NameTags from '@/components/common/NameTags/NameTags';
import NoData from '@/components/common/NoData/NoData';
import PostDetailSkeleton from '@/components/skeletons/post/PostDetailSkeleton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import useQ_Post_GetComments from '@/hooks/query-hooks/Post/useQ_Post_GetComments';
import useQ_Post_GetDetail from '@/hooks/query-hooks/Post/useQ_Post_GetDetail';
import apiConfig from '@/lib/api';
import commentService from '@/services/comment.service';
import { utils_DateToDDMonth, utils_TimeAgo } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'highlight.js/styles/github.css'; // Import theme
import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import SwapperHTML from '../../../common/SwapperHTML/SwapperHTML';
export default function Post_Detail() {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const idString = Array.isArray(id) ? id[0] : String(id || '');
  const quereClient = useQueryClient();

  const { data, error, isLoading } = useQ_Post_GetDetail({ id: idString });
  const { data: commentData } = useQ_Post_GetComments({
    id: idString,
  });

  const mutionComment = useMutation({
    mutationFn: (value: string) => {
      const res = commentService.create({
        content: value,
        postId: data?.data.id,
      });
      return res;
    },
    onSuccess: () => {
      quereClient.invalidateQueries({
        queryKey: ['post', 'comments', data?.data.id],
      });
    },
  });

  if (!idString || isLoading) return <PostDetailSkeleton />;
  if (error || !data) return <NoData />;

  return (
    <Card className="p-0 gap-0 rounded-lg overflow-hidden min-h-[100vh]">
      <div className="relative">
        <Image
          className="w-full max-h-[600px] object-cover rounded-md bg-background-1"
          src={data.data.thumbnail ? utils_ApiImageToLocalImage(data.data.thumbnail) : IMAGES.DEFAULT_COURSE}
          alt={data.data.title}
          width={1000}
          height={500}
        />
        <Button
          className="absolute top-4 left-4 bg-background-1/40"
          variant="outline"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </Button>
      </div>

      <div className="p-6">
        <TextHeading className="text-4xl font-extrabold">{data.data.title}</TextHeading>
        <NameTags tags={data.data.tags} className="mt-2 mb-4" max={data.data.tags.length} />
        <div className="flex items-center gap-2 mt-4 mb-2">
          <Image
            className="w-12 h-12 object-cover rounded-full bg-background-1"
            src={
              data.data.author?.avatar
                ? utils_ApiImageToLocalImage(data.data.author.avatar)
                : apiConfig.avatar(data.data.author?.name ?? 'c')
            }
            alt={data.data.title}
            width={40}
            height={40}
          />
          <div>
            <TextHeading>{data.data.author?.name}</TextHeading>
            {data.data.createdAt && (
              <TextDescription>
                {utils_DateToDDMonth(new Date(data.data.createdAt))} - {utils_TimeAgo(new Date(data.data.createdAt))}
              </TextDescription>
            )}
          </div>
        </div>
      </div>

      <div className="px-6">
        <SwapperHTML content={data.data.content} />
      </div>

      {commentData?.data && (
        <div className="px-6 mt-6">
          <Comments 
            onSubmit={value => mutionComment.mutate(value)} 
            comments={commentData.data} 
          />
        </div>
      )}
    </Card>
  );
}