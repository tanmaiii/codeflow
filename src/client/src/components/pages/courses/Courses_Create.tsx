"use client";

import DragDropImage from "@/components/common/Input/DragDropImage/DragDropImage";
import TextInput from "@/components/common/Input/TextInput/TextInput";
import MultiSelect from "@/components/common/MultiSelect/MultiSelect";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TextHeading from "@/components/ui/text";
import { paths } from "@/data/path";
import useQ_Tag_GetAll from "@/hooks/query-hooks/Tag/useQ_Tag_GetAll";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import {
  courseSchemaType,
  useCourseSchema,
} from "@/lib/validations/courseSchema";
import uploadService from "@/services/file.service";
import courseService from "@/services/course.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import NumberInput from "@/components/common/Input/NumberInput/NumberInput";
import { DateInput } from "@/components/common/Input/DateInput/DateInput";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export default function Courses_Create() {
  const [file, setFile] = useState<File | null>(null);
  const schema = useCourseSchema();
  const router = useRouter();
  const { localPath } = useH_LocalPath();
  const t = useTranslations("course");
  const Q_Tag = useQ_Tag_GetAll();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<courseSchemaType>({
    resolver: zodResolver(schema),
  });

  const handleUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const image = await uploadService.upload(formData); // TODO: Implement upload service
    return image.data.path;
  };

  const mutation = useMutation({
    mutationFn: async (body: courseSchemaType) => {
      const thumbnail = file ? await handleUpload(file) : null;
      await courseService.create({
        ...body,
        thumbnail: thumbnail || undefined,
      });
    },
    onError: (err: unknown) => {
      console.error(err);
      toast.error(
        (err as Error)?.message || "An error occurred while creating the course"
      );
    },
    onSuccess: () => {
      reset();
      router.push(localPath(paths.COURSES));
      toast.success("Course created successfully");
    },
  });

  return (
    <div className="flex flex-col gap-4 py-10 justify-center items-center mx-auto bg-background-2">
      <div className={'max-w-4xl flex flex-col gap-6'}>
        <TextHeading>{t("createCourse")}</TextHeading>
        <Card className="w-full py-4 px-4 lg:px-6 lg:py-6">
          <div className="flex flex-col gap-4">
            <Label className="text-color-2">{t("thumbnail")}</Label>
            <div className="h-[300px] w-full">
              <DragDropImage
                file={file}
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full h-full"
                accept="image/*"
              />
            </div>
          </div>
        </Card>
        <form
          onSubmit={handleSubmit((value) => mutation.mutate(value))}
          className="flex flex-col gap-6"
        >
          <Card className="w-full py-4 px-4 lg:px-6 lg:py-8 gap-4">

            <div className="flex flex-row gap-2 w-full">
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    label={t("startDate")}
                    id="startDate"
                    registration={register("startDate")}
                    error={
                      errors.startDate?.message ? errors.startDate : undefined
                    }
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => (
                  <DateInput
                    label={t("endDate")}
                    id="endDate"
                    registration={register("endDate")}
                    error={errors.endDate?.message ? errors.endDate : undefined}
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>

            <div className="flex flex-row gap-2 w-full">
              <Controller
                name="topicDeadline"
                control={control}
                render={({ field }) => (
                  <DateInput
                    label={t("topicDeadline")}
                    id="topicDeadline"
                    registration={register("topicDeadline")}
                    error={
                      errors.topicDeadline?.message
                        ? errors.topicDeadline
                        : undefined
                    }
                    defaultValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              <NumberInput
                label={t("maxGroupMembers")}
                className="w-full"
                id="maxGroupMembers"
                registration={register("maxGroupMembers", {
                  setValueAs: (value) => Number(value),
                })}
                min={1}
                max={100}
                error={
                  errors.maxGroupMembers?.message
                    ? errors.maxGroupMembers
                    : undefined
                }
              />
            </div>

            {Q_Tag.data && (
              <Controller
                name="tags"
                control={control}
                render={({ field }) => (
                  <MultiSelect
                    label={t("tags")}
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
          </Card>

          <Card className="w-full py-4 px-4 lg:px-6 lg:py-8 gap-4">
            <TextInput
              label={t("title")}
              className="w-full"
              registration={register("title")}
              error={errors.title?.message ? errors.title : undefined}
            />

            <div className="flex flex-col gap-2">
              <Label className="text-color-2">{t("description")}</Label>
              <Controller
                control={control}
                name="description"
                render={({ field }) => (
                  <RichTextEditor
                    content={field.value}
                    onChange={field.onChange}
                    error={errors.description}
                    className="min-h-[400px]"
                  />
                )}
              />
            </div>

            <div className="flex items-center justify-end gap-2 mt-4">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => router.push(localPath(paths.COURSES))}
              >
                {t("cancel")}
              </Button>
              <Button disabled={isSubmitting} type="submit">
                {t("save")}
              </Button>
            </div>
          </Card>
        </form>
      </div>
    </div>
  );
}
