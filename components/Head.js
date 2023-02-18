import { Helmet } from 'react-helmet';

export default function Head({ title, description, lang = 'en', author, keywords, viewport = 'width=device-width, initial-scale=1' }) {
  return (
    <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="author" content={author} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content={viewport} />
        <meta name="theme-color" content="#ffffff" />

        {/* Favicon (generated from https://realfavicongenerator.net/) */}
        <link rel="apple-touch-icon" sizes="180x180" href="favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon/favicon-16x16.png" />
        <link rel="manifest" href="favicon/site.webmanifest" />
        <link rel="mask-icon" href="favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        {/* Social Media Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://limaru.net" />
        <meta property="og:image" content="/path/to/og-image.jpg" /> {/* REPLACE THIS! */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content="/path/to/twitter-image.jpg" />

        {/* Document Language */}
        <html lang={lang} />
    </Helmet>
  );
}
