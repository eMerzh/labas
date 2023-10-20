import { useRouter } from "next/router";
import posthog, { PostHogConfig } from "posthog-js";
import { useEffect } from "react";

export const usePostHog = (
  apiKey: string,
  config?: Partial<PostHogConfig>,
): void => {
  const router = useRouter();

  useEffect((): (() => void) => {
    // Init PostHog
    posthog.init(apiKey, config);

    // Track page views
    const handleRouteChange = () => posthog.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [apiKey, config, router]);
};
