import TextHeading from "@/components/ui/text";
import { IComment } from "@/interfaces/comment";
import CommentItem from "./CommentItem";
import CommnetInputDefault from "./CommnetInputDefault";
import { util_length_comment } from "@/utils/common";

interface ICommentsProps {
  comments?: IComment[];
  onSubmit: (value: string) => void;
}

export default function Comments({ comments, onSubmit }: ICommentsProps) {
  return (
    <div className="w-full mt-4 mb-4 flex flex-col gap-4">
      <TextHeading className="text-lg">{`Comments(${comments && util_length_comment(comments)})`}</TextHeading>
      <CommnetInputDefault onSubmit={onSubmit} />
      {comments &&
        comments.map((comment) => ( 
          <CommentItem key={comment.id} comment={comment} />
        ))}
    </div>
  );
}
