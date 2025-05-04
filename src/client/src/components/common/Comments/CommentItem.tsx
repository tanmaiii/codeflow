import TextHeading, { TextDescription } from "@/components/ui/text";
import { IMAGES } from "@/data/images";
import { IconMessage2, IconPointFilled } from "@tabler/icons-react";
import Image from "next/image";
import CardPost_Button from "../CardPost/CardPost_Button";
import CommentInput from "./CommentInput";
import { useState } from "react";
import { IComment } from "@/interfaces/comment";
import { cx } from "class-variance-authority";
import { utils_TimeAgo } from "../../../utils/date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import commentService from "@/services/comment.service";
import { util_length_comment } from "@/utils/common";

interface CommentItemProps {
  comment?: IComment;
}

function flattenComments(comments: IComment[]) {
  const flat: IComment[] = [];

  function traverse(commentList: IComment[]) {
    commentList.forEach((comment) => {
      const { replies, ...rest } = comment;
      flat.push({ ...rest, replies: [] }); // đẩy comment cha KHÔNG kèm replies

      if (replies && replies.length > 0) {
        traverse(replies);
      }
    });
  }

  traverse(comments);

  return flat;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [reply, setReply] = useState<boolean>(false);
  const [visibleReplies, setVisibleReplies] = useState<number>(2); // hiển thị 3 reply đầu tiên
  const queryClient = useQueryClient();

  const mutionSubmit = useMutation({
    mutationFn: (value: string) => {
      return commentService.create({
        content: value,
        postId: comment?.postId,
        parentId: comment?.id,
      });
    },
    onSuccess: () => {
      setReply(false);
      queryClient.invalidateQueries({
        queryKey: ["post", "comments", comment?.postId],
      });
    },
  });

  const handleLoadMoreReplies = () => {
    setVisibleReplies((prev) => prev + 2);
  };

  // const visibleRepliesList = comment?.replies
  //   ? comment.replies.slice(0, visibleReplies)
  //   : [];

  const visibleRepliesList = comment?.replies
    ? flattenComments(comment.replies || [])
    : [];

  const flatComments = comment?.replies
    ? visibleRepliesList.slice(0, visibleReplies)
    : [];

  return (
    <div
      className={cx("flex flex-col w-full rounded-lg", {
        border: !comment?.parentId,
      })}
    >
      <div
        className={cx("p-3 relative rounded-lg hover:bg-input/20", {
          "border-b":
            !comment?.parentId &&
            comment?.replies &&
            comment?.replies.length > 0,
        })}
      >
        <header className="flex z-3 flex-row justify-start items-center gap-2">
          <div className="w-10 h-10 min-h-10 min-w-10 z-2 relative">
            <Image
              src={IMAGES.DEFAULT_COURSE}
              alt="logo"
              width={40}
              height={40}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex items-center gap-2">
            <TextHeading>{comment?.author?.name}</TextHeading>
            <IconPointFilled size={12} />
            <TextDescription>
              {utils_TimeAgo(new Date(comment?.createdAt ?? ""))}
            </TextDescription>
          </div>
        </header>

        <div className={cx("mt-1 " + (comment?.parentId ? "ml-12" : ""))}>
          <TextHeading className="text-md font-normal">
            {comment?.content}
          </TextHeading>
          <div>
            <CardPost_Button
              onClick={() => setReply(!reply)}
              icon={<IconMessage2 size={24} />}
              value={
                comment?.replies
                  ? util_length_comment(comment?.replies).toString()
                  : "0"
              }
            />
          </div>
        </div>

        {comment?.parentId && (
          <div className="absolute bottom-0 left-8 top-0 z-1 -ml-px w-0.5 bg-border"></div>
        )}
      </div>

      {reply && (
        <CommentInput
          onSubmit={(comment) => mutionSubmit.mutate(comment)}
          commentReply={comment}
          turnOff={() => {
            setReply(false);
          }}
        />
      )}

      {comment?.replies && (
        <div className="flex flex-col">
          {flatComments.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}

          {visibleReplies < visibleRepliesList.length && (
            <button
              onClick={handleLoadMoreReplies}
              className="self-start text-sm text-primary hover:underline mt-2 ml-12"
            >
              Tải thêm trả lời
            </button>
          )}
        </div>
      )}
    </div>
  );
}
