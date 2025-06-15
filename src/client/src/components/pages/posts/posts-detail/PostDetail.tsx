'use client';

import Comments from '@/components/common/Comments/Comments';
import NameTags from '@/components/common/NameTags/NameTags';
import SwapperHTML from '@/components/common/SwapperHTML/SwapperHTML';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import { paths } from '@/data/path';
import useQ_Post_CheckLike from '@/hooks/query-hooks/Post/useQ_Post_CheckLike';
import useQ_Post_GetComments from '@/hooks/query-hooks/Post/useQ_Post_GetComments';
import useH_LocalPath from '@/hooks/useH_LocalPath';
import { IComment } from '@/interfaces/comment';
import { IPost } from '@/interfaces/post';
import apiConfig from '@/lib/api';
import commentService from '@/services/comment.service';
import postService from '@/services/post.service';
import { useUserStore } from '@/stores/user_store';
import { utils_DateToDDMonth, utils_TimeAgo } from '@/utils/date';
import { utils_ApiImageToLocalImage } from '@/utils/image';
import { IconBookmark, IconBookmarkFilled, IconShare } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import 'highlight.js/styles/github.css'; // Import theme
import { ArrowLeftIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

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
  const { localPath } = useH_LocalPath();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  const uesQ_Post_Like = useQ_Post_CheckLike({
    id: initialPostData.id ?? '',
  });

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

  const mutationLike = useMutation({
    mutationFn: async () => {
      if (!user) {
        toast.error('Please login to like this post');
        return;
      }
      if (uesQ_Post_Like?.data?.data?.isLike) {
        await postService.unlike(initialPostData.id ?? '');
      } else {
        await postService.like(initialPostData.id ?? '');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['post', 'like', initialPostData.id],
      });
    },
  });

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <Card className="p-0 overflow-hidden shadow-xl border-0">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
          <Image
            className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
            src={
              initialPostData.thumbnail
                ? utils_ApiImageToLocalImage(initialPostData.thumbnail)
                : IMAGES.DEFAULT_COURSE
            }
            alt={initialPostData.title}
            width={1200}
            height={500}
            priority
          />

          {/* Navigation & Actions */}
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
            <Button
              className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 transition-all duration-300"
              variant="outline"
              size="icon"
              onClick={() => router.back()}
            >
              <ArrowLeftIcon className="w-4 h-4" />
            </Button>

            <div className="flex gap-2">
              <Button
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                variant="outline"
                size="icon"
                onClick={() => {
                  navigator.clipboard.writeText(
                    window.location.origin + localPath(paths.POSTS + '/' + initialPostData.id),
                  );
                  toast.success('Copied to clipboard');
                }}
              >
                <IconShare className="w-4 h-4" />
              </Button>

              <Button
                className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20"
                variant="outline"
                size="icon"
                onClick={() => mutationLike.mutate()}
              >
                {uesQ_Post_Like?.data?.data?.isLike ? (
                  <IconBookmarkFilled className="w-4 h-4" />
                ) : (
                  <IconBookmark className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="max-w-4xl">
              <NameTags tags={initialPostData.tags} className="mb-4 opacity-90" max={3} />
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4 drop-shadow-lg">
                {initialPostData.title}
              </h1>
            </div>
          </div>
        </div>
      </Card>

      {/* Author & Metadata */}
      <Card className="p-10 shadow-lg border-0">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                className="w-16 h-16 object-cover rounded-full ring-4 ring-blue-100 shadow-md"
                src={
                  initialPostData.author?.avatar
                    ? utils_ApiImageToLocalImage(initialPostData.author.avatar)
                    : apiConfig.avatar(initialPostData.author?.name ?? 'c')
                }
                alt={initialPostData.author?.name || 'Author'}
                width={64}
                height={64}
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <TextHeading className="text-xl">
                {initialPostData.author?.name}
              </TextHeading>
              {initialPostData.createdAt && (
                <TextDescription className="text-sm">
                  {utils_DateToDDMonth(new Date(initialPostData.createdAt))} •{' '}
                  {utils_TimeAgo(new Date(initialPostData.createdAt))}
                </TextDescription>
              )}
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <HeartIcon className="w-4 h-4" />
              <span>{initialPostData.likeCount ?? 0} likes</span>
            </div>
          </div>
        </div>

        <div className="prose prose-lg prose-blue max-w-none">
          <SwapperHTML content={initialPostData.content} />
        </div>

        <Comments
          onSubmit={value => mutationComment.mutate(value)}
          comments={commentData?.data ?? []}
        />
      </Card>
    </div>
  );
}
