import { IComment } from "@/interfaces/comment";

export function util_length_comment(comments: IComment[]): number {
  return comments.length > 0
    ? comments.reduce((total: number, comment: IComment) => {
        // Count this comment
        let count = 1;
        // Add counts of nested replies if any
        if (comment.replies?.length) {
          count += comment.replies.length;
          // Recursively count deeper nested replies
          comment.replies.forEach((nestedReply: IComment) => {
            if (nestedReply.replies?.length) {
              count += nestedReply.replies.length;
            }
          });
        }
        return total + count;
      }, 0)
    : 0;
}
