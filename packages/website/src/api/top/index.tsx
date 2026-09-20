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

topRoutes.get("/atom.xml", async (c) => {
  const object = await c.env.TAGA3S_DEV_BUCKET.get("atom.xml");
  if (!object) {
    return c.notFound();
  }

  return new Response(object.body);
});
