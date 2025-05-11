import { ITag } from "@/interfaces/tags";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";

interface NameTagsProps extends React.HTMLAttributes<HTMLParagraphElement> {
  max?: number;
  tags: ITag[];
  className?: string;
}

export default function NameTags({
  tags,
  max = 3,
  className,
  ...rest
}: NameTagsProps) {
  if (tags.length === 0) return null;

  return (
    <p
      className={cx("flex flex-wrap gap-2 mt-2", className)}
      {...rest}
    >
      {tags.slice(0, max).map((tag, index) => {
        return (
          <span
            key={tag.id || index}
            className={cn(
              "text-sm font-normal text-muted-foreground dark:bg-zinc-600 bg-gray-200 rounded-xs px-1"
            )}
          >
            {tag.name}
          </span>
        );
      })}
      {tags.length > max && (
        <span
          className={cn(
            "text-sm font-normal text-muted-foreground dark:bg-zinc-600 bg-gray-200 rounded-xs px-1"
          )}
        >
          +{tags.length - max} more
        </span>
      )}
    </p>
  );
}
