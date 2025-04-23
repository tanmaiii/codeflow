import { cn } from "@/lib/utils";

export default function NameTag({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <span
      className={cn(
        "text-sm font-normal text-muted-foreground dark:bg-zinc-600 bg-gray-200 rounded-xs px-1 mr-2",
        className
      )}
      {...props}
    >
      {props.children}
    </span>
  );
}
