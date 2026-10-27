import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";

// shadcn/ui base-maia. The brand owns every visual variant.
const buttonVariants = cva("ui-button", {
  variants: {
    variant: {
      default: "button",
      outline: "button button-outline",
      secondary: "button button-secondary",
      ghost: "text-button",
      link: "text-link",
      unstyled: "",
    },
    size: {
      default: "",
      sm: "button-sm",
      lg: "button-lg",
      icon: "button-icon",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});
function Button({
  className,
  variant,
  size,
  nativeButton = true,
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      nativeButton={nativeButton}
      role={nativeButton ? undefined : "link"}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
export { Button, buttonVariants };
