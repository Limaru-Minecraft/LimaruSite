import NextHead from "next/head";

const SITE_URL = "https://www.limaru.net";
const SITE_NAME = "Limaru";
const DEFAULT_IMAGE = `${SITE_URL}/limaru_logo.png`;

function absoluteUrl(value) {
  if (!value) {
    return "";
  }

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const path = value.startsWith("/") ? value : `/${value}`;
  return `${SITE_URL}${path}`;
}

function imageTypeFromUrl(value) {
  const extension = value.split("?")[0].split(".").pop()?.toLowerCase();

  switch (extension) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return "";
  }
}

export default function Head({
  title,
  description,
  author,
  keywords,
  url = "",
  path = "",
  image = DEFAULT_IMAGE,
  imageAlt = `${SITE_NAME} preview image`,
  type = "website",
  includeSiteStructuredData = false,
  viewport = "width=device-width, initial-scale=1",
}) {
  const pageUrl = url || absoluteUrl(path);
  const previewImage = absoluteUrl(image) || DEFAULT_IMAGE;
  const previewImageType = imageTypeFromUrl(previewImage);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Limaru Minecraft Server",
    url: SITE_URL,
  };

  return (
    <NextHead>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta name="description" content={description} />
      {author && <meta name="author" content={author} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content={viewport} />
      <meta name="theme-color" content="#ffffff" />
      {pageUrl && <link rel="canonical" href={pageUrl} />}

      {/* Favicon (generated from https://realfavicongenerator.net/) */}
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />

      {/* Social Media Meta Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {pageUrl && <meta property="og:url" content={pageUrl} />}
      <meta property="og:image" content={previewImage} />
      <meta property="og:image:secure_url" content={previewImage} />
      {previewImageType && <meta property="og:image:type" content={previewImageType} />}
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewImage} />
      <meta name="twitter:image:alt" content={imageAlt} />

      {includeSiteStructuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </NextHead>
  );
}
