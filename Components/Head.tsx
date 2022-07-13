import Head from "next/head";
import { useRouter } from "next/router";

const DOMAIN = "https://emerzh.github.io/labas/";

const Meta = ({
  title = "Là-bas",
  description = "A DESC",
  siteName = "Là-bas",
  canonical,
  ogImage,
  ogType = "website",
  twitterHandle = "@eMerzh",
}: {
  title?: string;
  keywords?: string;
  description?: string;
  ogTitle?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  siteName?: string;
  canonical?: string;
  twitterHandle?: string;
}) => {
  const router = useRouter();

  if (ogImage === undefined) {
    ogImage = `${router.basePath}/og_image.png`;
  }

  return (
    <Head>
      <title key="title">{`${title} – ${siteName}`}</title>
      <meta name="description" content={description} />
      <meta key="og_type" property="og:type" content={ogType} />
      <meta key="og_title" property="og:title" content={title} />
      <meta
        key="og_description"
        property="og:description"
        content={description}
      />
      <meta key="og_locale" property="og:locale" content="en_IE" />
      <meta key="og_site_name" property="og:site_name" content={siteName} />
      <meta key="og_url" property="og:url" content={canonical ?? DOMAIN} />
      <meta key="og_image" property="og:image" content={ogImage} />
      <meta
        key="og_image:alt"
        property="og:image:alt"
        content={`${title} | ${siteName}`}
      />
      <meta key="og_image:width" property="og:image:width" content="1200" />
      <meta key="og_image:height" property="og:image:height" content="631" />
      <meta name="robots" content="index,follow" />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:site" name="twitter:site" content={twitterHandle} />
      <meta
        key="twitter:creator"
        name="twitter:creator"
        content={twitterHandle}
      />
      <meta key="twitter:title" property="twitter:title" content={title} />
      <meta
        key="twitter:description"
        property="twitter:description"
        content={description}
      />{" "}
      <meta key="twitter:image" property="twitter:image" content={ogImage} />
      <link rel="canonical" href={canonical ?? DOMAIN} />
      <link rel="shortcut icon" href={`${router.basePath}/favicon.ico`} />
    </Head>
  );
};

export default Meta;
