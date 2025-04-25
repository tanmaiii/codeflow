import { cn } from "@/lib/utils";

export default function TextHeading({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <h4
      className={cn(
        "flex items-center gap-2 text-m text-center leading-none font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {props.children}
    </h4>
  );
}

export function TextDescription({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"h4">) {
  return (
    <span
      className={cn(
        "text-sm font-normal text-muted-foreground leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-20",
        className
      )}
      {...props}
    >
      {props.children}
    </span>
  );
}
