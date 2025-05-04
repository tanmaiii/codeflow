import { TextDescription } from "@/components/ui/text";
import { IMAGES } from "@/data/images";
import Image from "next/image";
import { useState } from "react";
import CommentInput from "./CommentInput";

export default function CommnetInputDefault({
  onSubmit,
}: {
  onSubmit: (value: string) => void;
}) {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div className="mt-4">
      {!active ? (
        <div
          onClick={() => setActive(true)}
          className="flex flex-col w-full bg-input/20 border rounded-lg"
        >
          <div className="flex items-center gap-2 p-3 cursor-pointer">
            <div className="w-10 h-10 min-h-10 min-w-10 ">
              <Image
                src={IMAGES.DEFAULT_COURSE}
                alt="logo"
                width={40}
                height={40}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center gap-2">
              <TextDescription className="text-md">
                Write a comment...
              </TextDescription>
            </div>
          </div>
        </div>
      ) : ( 
        <CommentInput
          onSubmit={(value) => {
            if (value.length > 0) {
              onSubmit(value);
            }
            setActive(false);
          }}
          turnOff={() => {
            setActive(false);
          }}
        />
      )}
    </div>
  );
}
