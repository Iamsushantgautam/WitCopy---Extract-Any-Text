import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";
import { Badge } from "./Badge";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 max-w-3xl",
        align === "center" ? "mx-auto text-center items-center" : "items-start text-left",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <Badge variant="primary" className="mb-1">
          {eyebrow}
        </Badge>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl leading-[1.15]">
        {title}
      </h2>
      {description && (
        <p className="text-base text-muted sm:text-lg lg:text-xl leading-relaxed font-normal">
          {description}
        </p>
      )}
    </div>
  );
}
