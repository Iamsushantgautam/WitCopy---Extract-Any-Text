import { type HTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export interface DividerProps extends HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
}

export function Divider({
  orientation = "horizontal",
  className,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("h-full w-px bg-border", className)}
        {...props}
      />
    );
  }

  return (
    <hr
      role="separator"
      className={cn("w-full border-t border-border my-0", className)}
      {...props}
    />
  );
}
