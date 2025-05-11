'use client';
import SectionDivider from '@/components/common/SectionDivider/SectionDivider';
import { Card } from '@/components/ui/card';
import TextHeading, { TextDescription } from '@/components/ui/text';
import { IMAGES } from '@/data/images';
import Image from 'next/image';
import useQ_Post_GetAll from '@/hooks/query-hooks/Post/useQ_Post_GetAll';
import apiConfig from '@/lib/api';
import { useRouter } from 'next/navigation';
import { paths } from '@/data/path';
import { useParams } from 'next/navigation';
export default function Post_Detail_More() {
  const router = useRouter();
  const { id } = useParams();
  const Q_Post = useQ_Post_GetAll({
    params: {
      page: 1,
      limit: 5,
      sortBy: 'createdAt',
      order: 'DESC',
    },
  });

  if (Q_Post.isLoading) return <TextDescription>Loading...</TextDescription>;
  if (Q_Post.error) return <TextDescription>Error...</TextDescription>;

  if (Q_Post.data?.data.filter(post => post.id !== id).length === 0) return null;

  return (
    <Card className="p-0">
      <div className="p-4">
        <TextHeading className="text-xl">More post</TextHeading>
        <SectionDivider className="my-2" />
        <div>
          {Q_Post.data?.data
            .filter(post => post.id !== id)
            .map((post, index) => {
              return (
                <button
                  key={index}
                  className="flex items-center gap-2 mt-4 mb-2 cursor-pointer"
                  onClick={() => {
                    router.push(paths.POSTS + '/' + post.id);
                  }}
                >
                  <div className="w-12 h-12 min-w-12 min-h-12 object-cover rounded-md bg-background-1">
                    <Image
                      className="w-full h-full object-cover rounded-md bg-background-1"
                      src={
                        post?.thumbnail ? apiConfig.imageUrl(post.thumbnail) : IMAGES.DEFAULT_COURSE
                      }
                      alt="Post Thumbnail"
                      width={100}
                      height={100}
                    />
                  </div>
                  <TextHeading className="text-lg font-medium leading-none line-clamp-2">
                    {post.title}
                  </TextHeading>
                </button>
              );
            })}
        </div>
      </div>
    </Card>
  );
}
