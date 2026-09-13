import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";
import type { JSX } from "hono/jsx/jsx-runtime";

const bodyLayout = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  max-width: 680px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px 20px;
  font-family: "Zen Maru Gothic", sans-serif;
  color: #000000;
  background-color: #ffffff;

  > * {
    min-width: 0;
  }
`;

export const HTMLLayout: FC<{ children: JSX.Element[]; title: string; description?: string; ogpImage?: string }> = ({
  children,
  title,
  description,
  ogpImage,
}) => {
  const _description = description ?? "taga3s-dev is a personal website of taga3s.";
  const _ogpImage = ogpImage ?? "/ogp.png";
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />

        {/* google fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Maru+Gothic:wght@400;700;900&display=swap"
          rel="stylesheet"
        />

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@3.0.2/destyle.css" />
        <link rel="stylesheet" href="/static/index.css" />
        <link rel="stylesheet" href="/static/markdown.css" />
        <Style />

        <meta property="og:url" content="https://taga3s.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={_description} />
        <meta property="og:site_name" content="taga3s-dev" />
        <meta property="og:image" content={_ogpImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={title} />
        <meta name="twitter:image" content={_ogpImage} />
        <meta name="twitter:description" content={_description} />

        <meta name="description" content={_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" />
        <title>{title}</title>
      </head>
      <body class={bodyLayout}>{children}</body>
    </html>
  );
};
