import { Hono } from "hono";
import { ProfilePresenter } from "./components/profile/ProfilePresenter";
import { Style, css } from "hono/css";
import { jsxRenderer } from "hono/jsx-renderer";
import { Footer } from "./components/Footer";
import { fetchPhotos } from "./api/photos";
import { ErrorBoundary, memo } from "hono/jsx";

type Bindings = {
  [key in keyof CloudflareBindings]: CloudflareBindings[key];
};

const app = new Hono<{ Bindings: Bindings }>();

const BaseLayout = css`
  position: relative;
  max-width: 700px;
  min-height: 100vh;
  margin: 0 auto;
  padding: 48px 20px 0;
  font-family: "Zen Kaku Gothic New", sans-serif;
  background-color: #FCFAF2;
`;

const MemorizedFooter = memo(() => <Footer />);

app.use(
  "*",
  jsxRenderer(({ children }) => {
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

          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=yes" />
          <Style />
          <title>profile - taga3s</title>
        </head>
        <body class={BaseLayout}>
          <ErrorBoundary fallback={<p>Sorry, Out of Service.</p>}>
            {children}
            <MemorizedFooter />
          </ErrorBoundary>
        </body>
      </html>
    );
  }),
);

app.get("/", async (c) => {
  const photos = await fetchPhotos(c);
  return c.render(<ProfilePresenter photos={photos} />);
});

export default app;
