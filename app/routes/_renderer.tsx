import { css, Style } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Script } from "honox/server";
import { Footer } from "../components/Footer";
import { ErrorBoundary, memo } from "hono/jsx";

const BaseLayout = css`
  position: relative;
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 48px 20px 0;
  font-family: "Zen Kaku Gothic New", sans-serif;
  background-color: #FCFAF2;
`;

const FooterMemorized = memo(() => <Footer />);

export default jsxRenderer(({ children }) => {
  return (
    <html lang="ja">
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
        <Style />
        <Script src="/app/client.ts" async />

        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" />
        <title>taga3s-dev</title>
      </head>
      <body class={BaseLayout}>
        <ErrorBoundary fallback={<p>Sorry, Out of Service.</p>}>
          {children}
          <FooterMemorized />
        </ErrorBoundary>
      </body>
    </html>
  );
});
