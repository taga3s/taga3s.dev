import { css, Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { ErrorBoundary, memo } from "hono/jsx";
import { Footer, Header } from "../components";

const htmlLayout = css`
  :has(#photo-with-mask) {
    overflow: hidden;
  }
`;

const bodyLayout = css`
  position: relative;
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 16px 20px;
  font-family: "Zen Kaku Gothic New", sans-serif;
  background-color: #FCFAF2;
`;

const HeaderMemorized = memo(() => <Header />);
const FooterMemorized = memo(() => <Footer />);

export default jsxRenderer(({ children, title, description }) => {
  const _title = title ?? "taga3s-dev";
  const _description = description ?? "taga3sのWebページです。主に趣味や技術系の発信をしています。";

  return (
    <html lang="ja" class={htmlLayout}>
      <head>
        <meta charset="UTF-8" />

        {/* google fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />

        {/* reset css */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/destyle.css@3.0.2/destyle.css" />

        {/* global css */}
        <link rel="stylesheet" href="/static/markdown-styles.css" />
        <Style />

        <Script src="/app/client.ts" async />

        <meta property="og:url" content="https://taga3s.dev" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={_title} />
        <meta property="og:description" content={_description} />
        <meta property="og:site_name" content="taga3s-dev" />
        <meta property="og:image" content="/static/images/og-image.png" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={_title} />
        <meta name="twitter:image" content="/static/images/og-image.png" />
        <meta name="twitter:description" content={_description} />

        <meta name="description" content={_description} />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" />
        <title>{_title}</title>
      </head>
      <body class={bodyLayout}>
        <HeaderMemorized />
        <ErrorBoundary fallback={<p>Sorry, something wrong with this page.</p>}>
          <main>{children}</main>
        </ErrorBoundary>
        <FooterMemorized />
      </body>
    </html>
  );
});
