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

export default function CommentItem({ comment }: CommentItemProps) {
  const [reply, setReply] = useState<boolean>(false);
  const quereClient = useQueryClient();

  const mutionSubmit = useMutation({
    mutationFn: (value: string) => {
      const res = commentService.create({
        content: value,
        postId: comment?.postId,
        parentId: comment?.id,
      });
      return res;
    },
    onSuccess: () => {
      setReply(false);
      quereClient.invalidateQueries({
        queryKey: ["post", "comments", comment?.postId],
      });
    },
  });

  return (
    <div
      className={cx("flex flex-col w-full rounded-lg ", {
        border: !comment?.parentId,
      })}
    >
      <div
        className={cx("p-3 relative rounded-lg hover:bg-input/20", {
          border: !comment?.parentId,
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
              value={comment?.replies ? util_length_comment(comment?.replies).toString() : "0"}
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
          {comment?.replies?.map((reply) => (
            <CommentItem key={reply.id} comment={reply} />
          ))}
        </div>
      )}
    </div>
  );
}
