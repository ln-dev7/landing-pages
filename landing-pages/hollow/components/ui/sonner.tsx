"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";

// shadcn/ui Sonner, customized for this project's art direction.
function Toaster(props: ToasterProps) {
  return (
    <Sonner
      className="toaster"
      position="top-center"
      duration={2600}
      visibleToasts={1}
      offset="max(22px, env(safe-area-inset-top))"
      mobileOffset={{
        top: "max(16px, env(safe-area-inset-top))",
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
