'use client';

import Comments from '@/components/common/Comments/Comments';
import NameTags from '@/components/common/NameTags/NameTags';
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
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import SwapperHTML from '../../../common/SwapperHTML/SwapperHTML';
import PostDetailSkeleton from '@/components/skeletons/PostDetailSkeleton';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';
import { IComment } from '@/interfaces/comment';
import { ITag } from '@/interfaces/tags';
import { IUser } from '@/interfaces/user';

// Post Header Section
const PostHeader = ({ 
  thumbnail, 
  title,
  onBack 
}: { 
  thumbnail?: string; 
  title: string;
  onBack: () => void;
}) => (
  <div className="relative">
    <Image
      className="w-full max-h-[600px] object-cover rounded-md bg-background-1"
      src={thumbnail ? utils_ApiImageToLocalImage(thumbnail) : IMAGES.DEFAULT_COURSE}
      alt={title}
      width={1000}
      height={500}
    />
    <Button
      className="absolute top-4 left-4 bg-background-1/40"
      variant="outline"
      size="icon"
      onClick={onBack}
    >
      <ArrowLeftIcon className="w-4 h-4" />
    </Button>
  </div>
);

// Post Meta Section
const PostMeta = ({ 
  title, 
  tags, 
  author, 
  createdAt 
}: { 
  title: string;
  tags: ITag[];
  author?: IUser;
  createdAt?: Date | string | null;
}) => (
  <div className="p-6">
    <TextHeading className="text-4xl font-extrabold">{title}</TextHeading>
    <NameTags
      tags={tags}
      className="mt-2 mb-4"
      max={tags.length}
    />
    <div className="flex items-center gap-2 mt-4 mb-2">
      <Image
        className="w-12 h-12 object-cover rounded-full bg-background-1"
        src={
          author?.avatar
            ? utils_ApiImageToLocalImage(author.avatar)
            : apiConfig.avatar(author?.name ?? 'c')
        }
        alt={title}
        width={40}
        height={40}
      />
      <div>
        <TextHeading>{author?.name}</TextHeading>
        {createdAt && (
          <TextDescription>
            {utils_DateToDDMonth(new Date(createdAt))} - {utils_TimeAgo(new Date(createdAt))}
          </TextDescription>
        )}
      </div>
    </div>
  </div>
);

// Post Content Section
const PostContent = ({ content }: { content: string }) => (
  <div className="px-6">
    <SwapperHTML content={content} />
  </div>
);

// Post Comments Section
const PostComments = ({ 
  comments, 
  onSubmit 
}: { 
  comments: IComment[];
  onSubmit: (value: string) => void;
}) => (
  <div className="px-6 mt-6">
    <Comments onSubmit={onSubmit} comments={comments} />
  </div>
);

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
  if (error) return <div>Error...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <Card className="p-0 gap-0 rounded-lg overflow-hidden min-h-[100vh]">
      <PostHeader 
        thumbnail={data.data.thumbnail} 
        title={data.data.title}
        onBack={() => router.back()}
      />
      <PostMeta
        title={data.data.title}
        tags={data.data.tags}
        author={data.data.author}
        createdAt={data.data.createdAt}
      />
      <PostContent content={data.data.content} />
      {commentData?.data && (
        <PostComments
          comments={commentData.data}
          onSubmit={(value) => mutionComment.mutate(value)}
        />
      )}
    </Card>
  );
}
