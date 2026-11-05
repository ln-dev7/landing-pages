"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

// shadcn/ui Sonner, customized for this project's art direction.
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster"
      position="bottom-center"
      duration={2800}
      visibleToasts={1}
      offset="max(22px, env(safe-area-inset-bottom))"
      mobileOffset={{
        bottom: "max(16px, env(safe-area-inset-bottom))",
        left: 16,
        right: 16,
      }}
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: "motion-toast",
          title: "motion-toast-title",
          description: "motion-toast-description",
          icon: "motion-toast-icon",
        },
      }}
      {...props}
    />
  );
}
export { Toaster };
