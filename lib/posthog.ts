import posthog from "posthog-js";
import { getLocale } from "@/lib/i18n";

export function initPosthog() {
  if (typeof window === "undefined") return;
  if (posthog.__loaded) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
    capture_pageview: false,
    capture_pageleave: true,
  });

  // Register locale as super property — included in all events
  posthog.register({ locale: getLocale() });
}

/** Call after setLocale() to update PostHog super property */
export function updatePosthogLocale() {
  if (typeof window === "undefined") return;
  posthog.register({ locale: getLocale() });
}

export { posthog };
