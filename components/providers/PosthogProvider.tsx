"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { initPosthog, posthog } from "@/lib/posthog";

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPosthog();
  }, []);

  const pathname = usePathname();
  useEffect(() => {
    if (pathname) {
      posthog.capture("$pageview", { $current_url: pathname });
    }
  }, [pathname]);

  return <>{children}</>;
}
