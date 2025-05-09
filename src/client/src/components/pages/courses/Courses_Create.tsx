"use client";

import { DateInput } from "@/components/common/Input/DateInput/DateInput";
import { Card } from "@/components/ui/card";
import {
  courseSchemaType,
  useCourseSchema
} from "@/lib/validations/courseSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import NumberInput from "@/components/common/Input/NumberInput/NumberInput";
import TextHeading from "@/components/ui/text";
import useQ_Tag_GetAll from "@/hooks/query-hooks/Tag/useQ_Tag_GetAll";
import MyMultiSelect from "@/components/common/MyMultiSelect/MyMultiSelect";
import RichTextEditor from "@/components/common/RichTextEditor/RichTextEditor";
import { Label } from "@/components/ui/label";
import TextInput from "@/components/common/Input/TextInput/TextInput";
import { useState } from "react";
import DragDropImage from "@/components/common/Input/DragDropImage/DragDropImage";
import DragDropFile from "@/components/common/Input/DragDropFile/DragDropFile";
import { paths } from "@/data/path";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import useH_LocalPath from "@/hooks/useH_LocalPath";

export default function Courses_Create() {
  const t = useTranslations("course");
  const [image, setImage] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | []>([]);
  const schema = useCourseSchema();
  const router = useRouter();
  const { localPath } = useH_LocalPath()

  const Q_Tag = useQ_Tag_GetAll();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    // reset,
  } = useForm<courseSchemaType>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: courseSchemaType) => {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="py-6">
      <TextHeading className="pb-4 text-2xl font-bold">{t("createCourse")}</TextHeading>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-7 lg:col-span-9 flex flex-col gap-6 order-2 mdmd:order-1">
          <Card className="p-4">
            <div className="flex flex-row gap-4 w-full">
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
            <div className="flex flex-row gap-4 w-full">
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
                  <MyMultiSelect
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

          <Card className="p-4">
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
        </div>
        <div className="col-span-12 md:col-span-5 lg:col-span-3 flex flex-col gap-6 order-1 md:order-2">
          <Card className="w-full p-4">
            <Label className="text-color-2">{t("thumbnail")}</Label>
            <div className="h-[240px] w-full">
              <DragDropImage
                file={image}
                onChange={(e) => setImage(e.target.files?.[0] || null)}
                className="w-full h-full"
                accept="image/*"
              />
            </div>
          </Card>

          <Card className="w-full p-4">
            <Label className="text-color-2">PDF file</Label>
            <DragDropFile
              files={files}
              onChange={(e) => {
                if (e.target.files) {
                  setFiles(Array.from(e.target.files));
                }
              }}
              className="h-[240px] w-full"
              accept="application/pdf"
            />
          </Card>
        </div>
      </div>
    </form>
  );
}