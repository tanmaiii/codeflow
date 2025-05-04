import { Button } from "@/components/ui/button";
import TextHeading from "@/components/ui/text";
import { cx } from "class-variance-authority";
import { ImageUp, Trash } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface DragDropImageProps extends React.HTMLProps<HTMLInputElement> {
  file: File | null;
  onChange: (_: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  accept?: string;
}

export default function DragDropImage(props: DragDropImageProps) {
  const { file, onChange } = props;
  // const [file, setFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [openDrop, setOpenDrop] = useState(false);
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (onChange) {
        onChange(e);
      }
    }
    setOpenDrop(false);
  };

  const onRemove = () => {
    console.log("remove file");
    onChange({
      target: { files: null },
    } as unknown as React.ChangeEvent<HTMLInputElement>);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className="flex flex-col gap-2 w-full h-full"
      onDragEnter={() => setOpenDrop(true)}
      onDragLeave={() => setOpenDrop(false)}
    >
      <div className="relative flex flex-col gap-2 w-full h-full min-h-[200px]">
        {file && (
          <>
            <div className="absolute top-0 left-0 w-full h-full rounded-lg flex justify-center items-center">
              <Image
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-full h-full object-cover rounded-lg"
                width={200}
                height={200}
              />
            </div>
            <Button
              variant={"outline"}
              onClick={onRemove}
              className="absolute top-2 right-2 z-20"
            >
              <Trash size={12} width={12} height={12} />
            </Button>
          </>
        )}
        <label
          htmlFor="file-image"
          className={cx(
            "flex flex-col absolute gap-4 w-full h-full border-2 border-dashed rounded-lg justify-center items-center cursor-pointer z-10",
            { "opacity-0 bg-backgroud-1/80 hover:opacity-100": file },
            { "opacity-100 ": openDrop }
          )}
        >
          <motion.div
            animate={{
              y: openDrop ? -10 : 0, // Di chuyển lên 10px nếu openDrop
              opacity: openDrop ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          >
            <ImageUp size={60} className={cx("text-color-2")} />
          </motion.div>
          <TextHeading className="text-color-2">
            Drag and drop your images anywhere or
          </TextHeading>
          <Button id={"file-image"} variant={"outline"} className="w-fit">
            Upload a file
          </Button>
          <input
            ref={inputRef}
            type="file"
            className="w-full h-full absolute opacity-0 cursor-pointer"
            onChange={onChangeInput}
          />
        </label>
      </div>
    </div>
  );
}
