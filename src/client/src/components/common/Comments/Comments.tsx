import TextHeading from "@/components/ui/text";
import { IComment } from "@/interfaces/comment";
import CommentItem from "./CommentItem";
import CommnetInputDefault from "./CommnetInputDefault";
import { util_length_comment } from "@/utils/common";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ICommentsProps {
  comments?: IComment[];
  onSubmit: (value: string) => void;
}

const MAX_VISIBLE_COMMENTS = 2;

export default function Comments({ comments, onSubmit }: ICommentsProps) {
  const [visibleCount, setVisibleCount] = useState(MAX_VISIBLE_COMMENTS);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + MAX_VISIBLE_COMMENTS);
  };

  const visibleComments = comments ? comments.slice(0, visibleCount) : [];

  return (
    <div className="w-full mt-4 mb-4 flex flex-col gap-4">
      <TextHeading className="text-lg">{`Comments(${
        comments && util_length_comment(comments)
      })`}</TextHeading>
      
      <CommnetInputDefault onSubmit={onSubmit} />

      {visibleComments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      {comments && visibleCount < comments.length && (
        <Button variant="text" onClick={handleLoadMore}>
          Tải thêm
        </Button>
      )}
    </div>
  );
}
