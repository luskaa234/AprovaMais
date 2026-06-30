import { Children } from "react";
import { cn } from "@/lib/utils";

export const AvatarStack = ({
  children,
  className,
  animate = false,
  size = 40,
  ...props
}) => (
  <div
    className={cn(
      "-space-x-1 flex items-center",
      animate && "hover:space-x-0 [&>*]:transition-all",
      className
    )}
    {...props}>
    {Children.map(children, (child) => {
      if (!child) {
        return null;
      }

      return (
        <div
          className={cn(
            "size-full shrink-0 overflow-hidden rounded-full",
            '[&_[data-slot="avatar"]]:size-full',
            className
          )}
          style={{
            width: size,
            height: size,
          }}>
          {child}
        </div>
      );
    })}
  </div>
);
