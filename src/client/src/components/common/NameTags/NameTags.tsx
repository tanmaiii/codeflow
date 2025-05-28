import { ITag } from "@/interfaces/tags";
import { cn } from "@/lib/utils";
import { cx } from "class-variance-authority";

interface NameTagsProps extends Omit<React.HTMLAttributes<HTMLParagraphElement>, 'onClick'> {
  max?: number;
  tags: ITag[];
  className?: string;
  onClick?: (tag: ITag) => void;
}

export default function NameTags({
  tags,
  max = 3,
  className,
  onClick,
  ...rest
}: NameTagsProps) {
  if (tags.length === 0) return null;

  return (
    <p
      className={cx("flex flex-wrap gap-1.5 mt-2", className)}
      {...rest}
    >
      {tags.slice(0, max).map((tag, index) => {
        return (
          <span
            key={tag.id || index}
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              "bg-primary/10 text-primary hover:bg-primary/20 transition-colors",
              "dark:bg-primary/20 dark:hover:bg-primary/30",
              { "cursor-pointer": onClick }
            )}
            onClick={() => onClick?.(tag)}
          >
            {tag.name}
          </span>
        );
      })}
      {tags.length > max && (
        <span
          className={cn(
            "text-xs font-medium px-2 py-0.5 rounded-full",
            "bg-muted text-muted-foreground hover:bg-muted/80 transition-colors",
            "dark:bg-muted/50 dark:hover:bg-muted/70"
          )}
        >
          +{tags.length - max} more
        </span>
      )}
    </p>
  );
}
