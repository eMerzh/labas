import "../styles/globals.css";
import type { AppProps } from "next/app";
import { usePostHog } from "next-use-posthog";

function MyApp({ Component, pageProps }: AppProps) {
  usePostHog("phc_f0Uk8a68uDl7LsYOORxU22Z51ifidvXL48hHldpdz3i", {
    api_host: "https://app.posthog.com",
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.opt_out_capturing();
    },
  });

  return <Component {...pageProps} />;
}

export default MyApp;
