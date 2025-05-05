import { Button } from "@/components/ui/button";
import TextHeading, { TextDescription } from "@/components/ui/text";
import { Textarea } from "@/components/ui/textarea";
import { IComment } from "@/interfaces/comment";
import apiConfig from "@/lib/api";
import { useUserStore } from "@/stores/user_store";
import { IconX } from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRef, useState } from "react";
import SectionDivider from "../SectionDivider/SectionDivider";
import MyEmojiPicker from "./MyEmojiPicker";

interface CommentInputProps {
  onSubmit: (comment: string) => void;
  turnOff: () => void;
  commentReply?: IComment;
  value?: string;
}

export default function Comment_Input({
  onSubmit,
  turnOff,
  commentReply,
  value,
}: CommentInputProps) {
  const [keyword, setKeyword] = useState<string>(value ?? "");
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const t = useTranslations("comment");
  const { user } = useUserStore();

  function handleEmojiClick(emoji: string) {
    const input = inputRef.current;

    if (input) {
      const selectionStart = input.selectionStart;
      const selectionEnd = input.selectionEnd;

      setKeyword(
        keyword.substring(0, selectionStart) +
          emoji +
          keyword.substring(selectionEnd)
      );

      // Move the cursor to the end of the inserted emoji
      input.selectionStart = input.selectionEnd = selectionStart + 1;
    }
  }

  return (
    <div className="flex flex-col w-full bg-input/20 border rounded-lg">
      <div className="flex items-center justify-between px-4 py-2">
        {commentReply && (
          <div className="flex flex-row items-center gap-2">
            <TextDescription>{t("replyTo")}</TextDescription>
            <TextHeading>{commentReply?.author?.name}</TextHeading>
          </div>
        )}
        <Button
          variant="rounded"
          className="ml-auto"
          size="icon"
          onClick={() => turnOff()}
        >
          <IconX size={26} className="size-5 text-muted-foreground" />
        </Button>
      </div>

      <SectionDivider />

      <div className="flex items-start gap-2 mb-4 p-4">
        <div className="w-10 h-10 min-h-10 min-w-10 ">
          <Image
            src={user?.avatar ?? apiConfig.avatar(user?.name ?? "c")}
            alt="logo"
            width={40}
            height={40}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <Textarea
          ref={inputRef}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder={t("placeholder")}
          className="border-none focus-visible:ring-0 shadow-none min-h-[100px]"
        />
      </div>

      <SectionDivider />

      <div className="flex items-center justify-between p-2 shadow-none">
        <div className="flex items-center gap-2">
          <div className="relative">
            <MyEmojiPicker onSelect={handleEmojiClick} />
          </div>
        </div>
        <Button variant={"default"} onClick={() => onSubmit(keyword)}>
          {t("postComment")}
        </Button>
      </div>
    </div>
  );
}
