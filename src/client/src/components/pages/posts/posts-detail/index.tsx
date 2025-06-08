import { IComment } from "@/interfaces/comment";
import { IPost } from "@/interfaces/post";
import PostDetail from "./PostDetail";
import PostDetailMore from "./PostDetailMore";

interface Post_Detail_Layout_Props {
  initialPostData: IPost;
  initialCommentsData: IComment[];
  postId: string;
}

export default function PostDetailLayout({ 
  initialPostData, 
  initialCommentsData, 
  postId 
}: Post_Detail_Layout_Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-1 md:col-span-8 xl:col-span-9">
        <PostDetail 
          initialPostData={initialPostData}
          initialCommentsData={initialCommentsData}
          postId={postId}
        />
      </div>
      <div className="hidden md:block col-span-1 md:col-span-4 xl:col-span-3">
        <div className="sticky top-20">
          <PostDetailMore />
        </div>
      </div>
    </div>
  );
}
