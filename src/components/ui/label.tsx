import * as React from "react";
import { cva } from "class-variance-authority";

const labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");

const Label = React.forwardRef<
  React.ElementRef<"label">,
  React.ComponentPropsWithoutRef<"label">
>(({ className, ...props }, ref) => (
  <label ref={ref} className={labelVariants({ className })} {...props} />
));
Label.displayName = "Label";

export { Label };
