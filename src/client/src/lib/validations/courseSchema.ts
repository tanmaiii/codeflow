import { z } from "zod";
import { useTranslations } from "next-intl";

export function useCourseSchema() {
    const t = useTranslations("validate");
    const tCourse = useTranslations("course");
    return courseSchema({ t, tCourse });
}

const courseSchema = ({
    t,
    tCourse,
}: {
    t: ReturnType<typeof useTranslations>;
    tCourse: ReturnType<typeof useTranslations>;
}) =>
    z.object({
        title: z
            .string({ message: t("required", { field: tCourse("title") }) })
            .min(1, { message: t("minLength", { field: tCourse("title"), length: 1 }) })
            .max(255, {
                message: t("maxLength", { field: tCourse("title"), length: 255 }),
            }),
        description: z
            .string({ message: t("required", { field: tCourse("description") }) })
            .min(1, {
                message: t("minLength", { field: tCourse("description"), length: 1 }),
            })
            .max(10000, {
                message: t("maxLength", { field: tCourse("description"), length: 10000 }),
            }),
        thumbnail: z.string().optional(),
        tags: z.array(z.string()).optional(),
        startDate: z.date({ message: t("required", { field: tCourse("startDate") }) }),
        endDate: z.date({ message: t("required", { field: tCourse("endDate") }) }),
        topicDeadline: z.date({ message: t("required", { field: tCourse("topicDeadline") }) }),
        maxGroupMembers: z.number({ message: t("required", { field: tCourse("maxGroupMembers") }) }).min(1, { message: t("min", { field: tCourse("maxGroupMembers"), length: 1 }) }).max(100, { message: t("max", { field: tCourse("maxGroupMembers"), length: 100 }) }),
        documents: z.array(z.string()).optional(),
    });

export type courseSchemaType = z.infer<ReturnType<typeof courseSchema>>;
