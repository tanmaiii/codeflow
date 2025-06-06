import { IPost } from "@/interfaces/post";
import { IComment } from "@/interfaces/comment";
import Post_Detail from "./Post_Detail";
import Post_Detail_More from "./Post_Detail_More";

interface Post_Detail_Layout_Props {
  initialPostData: IPost;
  initialCommentsData: IComment[];
  postId: string;
}

export default function Post_Detail_Layout({ 
  initialPostData, 
  initialCommentsData, 
  postId 
}: Post_Detail_Layout_Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mx-auto my-4">
      <div className="col-span-1 md:col-span-8 xl:col-span-9">
        <Post_Detail 
          initialPostData={initialPostData}
          initialCommentsData={initialCommentsData}
          postId={postId}
        />
      </div>
      <div className="hidden md:block col-span-1 md:col-span-4 xl:col-span-3">
        <div className="sticky top-20">
          <Post_Detail_More />
        </div>
      </div>
    </div>
  );
}
