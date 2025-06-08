'use client';

import { IPost } from '@/interfaces/post';
import { IComment } from '@/interfaces/comment';
import Comments from '@/components/common/Comments/Comments';
import NameTags from '@/components/common/NameTags/NameTags';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import useQ_Post_GetComments from '@/hooks/query-hooks/Post/useQ_Post_GetComments';
import apiConfig from '@/lib/api';
import commentService from '@/services/comment.service';
import { utils_DateToDDMonth, utils_TimeAgo } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'highlight.js/styles/github.css'; // Import theme
import { ArrowLeftIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SwapperHTML from '../../../common/SwapperHTML/SwapperHTML';

interface Post_Detail_Props {
  initialPostData: IPost;
  initialCommentsData: IComment[];
  postId: string;
}

export default function PostDetail({
  initialPostData,
  initialCommentsData,
  postId,
}: Post_Detail_Props) {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Use SSR data as initial data for React Query
  const { data: commentData } = useQ_Post_GetComments({
    id: postId,
    options: {
      initialData: { data: initialCommentsData, message: 'success' },
    },
  });

  const mutationComment = useMutation({
    mutationFn: (value: string) => {
      const res = commentService.create({
        content: value,
        postId: initialPostData.id,
      });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'comments', initialPostData.id],
      });
    },
  });

  return (
    <Card className="p-0 gap-0 rounded-lg overflow-hidden min-h-[100vh]">
      <div className="relative">
        <Image
          className="w-full max-h-[600px] object-cover rounded-md bg-background-1"
          src={
            initialPostData.thumbnail
              ? utils_ApiImageToLocalImage(initialPostData.thumbnail)
              : IMAGES.DEFAULT_COURSE
          }
          alt={initialPostData.title}
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
        <TextHeading className="text-4xl font-extrabold">{initialPostData.title}</TextHeading>
        <NameTags
          tags={initialPostData.tags}
          className="mt-2 mb-4"
          max={initialPostData.tags.length}
        />
        <div className="flex items-center gap-2 mt-4 mb-2">
          <Image
            className="w-12 h-12 object-cover rounded-full bg-background-1"
            src={
              initialPostData.author?.avatar
                ? utils_ApiImageToLocalImage(initialPostData.author.avatar)
                : apiConfig.avatar(initialPostData.author?.name ?? 'c')
            }
            alt={initialPostData.title}
            width={40}
            height={40}
          />
          <div>
            <TextHeading>{initialPostData.author?.name}</TextHeading>
            {initialPostData.createdAt && (
              <TextDescription>
                {utils_DateToDDMonth(new Date(initialPostData.createdAt))} -{' '}
                {utils_TimeAgo(new Date(initialPostData.createdAt))}
              </TextDescription>
            )}
          </div>
        </div>
      </div>

      <div className="px-6">
        <SwapperHTML content={initialPostData.content} />
      </div>

      {commentData?.data && (
        <div className="px-6 mt-6">
          <Comments onSubmit={value => mutationComment.mutate(value)} comments={commentData.data} />
        </div>
      )}
    </Card>
  );
}
