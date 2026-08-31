import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";


export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  clean?: boolean;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
