"use client";

import DragDropImage from "@/components/common/Input/DragDropImage/DragDropImage";
import TextInput from "@/components/common/Input/TextInput/TextInput";
import MultiSelect from "@/components/common/MultiSelect/MultiSelect";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
// import { MultiSelect } from "@/components/ui/multi-select";
import { paths } from "@/data/path";
import useQ_Tag_GetAll from "@/hooks/query-hooks/Tag/useQ_Tag_GetAll";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import { postSchemaType, usePostSchema } from "@/lib/validations/postSchema";
import postService from "@/services/post.service";
import uploadService from "@/services/file.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Posts_Create() {
  const [file, setFile] = useState<File | null>(null);
  const schema = usePostSchema();
  const router = useRouter();
  const { localPath } = useH_LocalPath();

  const Q_Tag = useQ_Tag_GetAll();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<postSchemaType>({
    resolver: zodResolver(schema),
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const image = await uploadService.upload(formData);
    return image.data.path;
  };

  const mutation = useMutation({
    mutationFn: async (body: postSchemaType) => {
      const thumbnail = file ? await handleUpload(file) : null;
      // if (!thumbnail) throw new Error("Thumbnail is required");
      await postService.create({
        ...body,
        thumbnail: thumbnail || undefined,
      });
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error(
        (err as Error)?.message || "An error occurred while creating the post"
      );
    },
    onSuccess: () => {
      reset();
      router.push(localPath(paths.POSTS));
      toast.success("Post created successfully");
    },
  });

  return (
    <div className="flex flex-col gap-4 py-10 justify-center items-center mx-auto bg-backgroud-2">
      <Card className="bg-backgroud-1 w-full max-w-4xl py-4 px-4 lg:px-6 lg:py-10">
        <Label className="text-color-2">Thumbnail</Label>
        <div className="h-[300px] w-full">
          <DragDropImage
            file={file}
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full h-full"
            accept="image/*"
          />
        </div>

        <form
          onSubmit={handleSubmit((value) => mutation.mutate(value))}
          className="flex flex-col gap-3"
        >
          <TextInput
            label="Title"
            placeholder="Enter title"
            className="w-full"
            registration={register("title")}
            error={errors.title?.message ? errors.title : undefined}
          />

          {Q_Tag.data && (
            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  label="Select tags"
                  id="tags"
                  options={Q_Tag.data?.data?.map((tag) => ({
                    label: tag.name,
                    value: tag.id,
                  }))}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          )}

          <div className="flex flex-col gap-2">
            <Label className="text-color-2">Content</Label>
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor
                  content={field.value}
                  onChange={field.onChange}
                  error={errors.content}
                  className="min-h-[400px]"
                />
              )}
            />
          </div>
          <div className="flex items-center justify-end gap-2 mt-4">
            <Button variant={"outline"}>Cancel</Button>
            <Button disabled={isSubmitting} type="submit">
              Create
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
