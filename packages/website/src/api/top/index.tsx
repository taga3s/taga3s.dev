import { Hono } from "hono";
import type { ContextSet } from "../../type";
import { HTMLLayout } from "../../views/shared/HTMLLayout";
import { Header } from "../../views/shared/Header";
import { Footer } from "../../views/shared/Footer";
import { TopPage } from "../../views/Top/TopPage";
import photos from "../../data/photos/data.json";

export const topRoutes = new Hono<ContextSet>();

topRoutes.get("/", (c) => {
  return c.render(
    <HTMLLayout title="taga3s-dev">
      <Header />
      <TopPage photos={photos.content} />
      <Footer />
    </HTMLLayout>,
  );
});
