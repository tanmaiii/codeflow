"use client";
import CardPost from "@/components/common/CardPost/CardPost";
import { MyPagination } from "@/components/common/MyPagination/MyPagination";
import { Button } from "@/components/ui/button";
import TextHeading, { TextDescription } from "@/components/ui/text";
import { paths } from "@/data/path";
import useQ_Post_GetAll from "@/hooks/query-hooks/Post/useQ_Post_GetAll";
import useH_LocalPath from "@/hooks/useH_LocalPath";
import { IPost } from "@/interfaces/post";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Posts() {
  const route = useRouter();
  const [page, setPage] = useState(1);
  const { localPath } = useH_LocalPath();
  const t = useTranslations("post");

  const Q_Post = useQ_Post_GetAll({
    params: {
      page: page,
      limit: 8,
      sortBy: "createdAt",
      order: "DESC",
    },
  });

  if (Q_Post.isLoading) return <TextDescription>Loading...</TextDescription>;
  if (Q_Post.error) return <TextDescription>Error...</TextDescription>;

  return (
    <div className="flex flex-col h-full w-full">
      <div className="border-b py-2 flex items-center justify-between flex-row gap-4">
        <div className="flex items-center gap-2 p-2 hover:text-primary cursor-pointer rounded-md text-primary">
          <TextHeading>{t("post")}</TextHeading>
        </div>
        <Button
          onClick={() => route.push(localPath(paths.POST_CREATE))}
          variant="outline"
          className="bg-background-1"
          size="sm"
        >
          {t("createPost")}
        </Button>
      </div>
      <div className="min-h-[600px]">
        <div className="grid grid-cols-1 gap-4 md:gap-4 xl:gap-8 md:grid-cols-3 xl:grid-cols-4 py-2 mt-6">
          {Q_Post.data &&
            Q_Post.data?.data?.map((post: IPost) => (
              <CardPost key={post.id} post={post} />
            ))}
        </div>
      </div>
      <div className="my-6">
        <MyPagination
          currentPage={page}
          totalPages={Q_Post.data?.pagination.totalPages ?? 1}
          onPageChange={(page: number) => {
            setPage(page);
            Q_Post.refetch();
          }}
        />
      </div>
    </div>
  );
}
