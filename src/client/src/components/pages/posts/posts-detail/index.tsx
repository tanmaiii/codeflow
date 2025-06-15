import { IComment } from '@/interfaces/comment';
import { IPost } from '@/interfaces/post';
import PostDetail from './PostDetail';
import PostDetailMore from './PostDetailMore';
import { useTranslations } from 'next-intl';

interface Post_Detail_Layout_Props {
  initialPostData: IPost;
  initialCommentsData: IComment[];
  postId: string;
}

export default function PostDetailLayout({
  initialPostData,
  initialCommentsData,
  postId,
}: Post_Detail_Layout_Props) {
  const t = useTranslations();
  return (
    <div className="min-h-screen">
      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="col-span-1 lg:col-span-8 xl:col-span-9">
            <div className="space-y-6">
              <PostDetail
                initialPostData={initialPostData}
                initialCommentsData={initialCommentsData}
                postId={postId}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 lg:col-span-4 xl:col-span-3">
            <div className="lg:sticky lg:top-16 space-y-6">
              <PostDetailMore />

              {/* Additional sidebar content */}
              <div className="hidden lg:block bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <h3 className="font-bold text-lg mb-2">📚 {t('post.shareKnowledge')}</h3>
                <p className="text-blue-100 text-sm">
                  {t('post.shareKnowledgeDescription')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
