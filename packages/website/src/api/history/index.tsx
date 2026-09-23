import { Hono } from "hono";
import type { ContextSet } from "../../index";
import { HTMLLayout } from "../../views/shared/HTMLLayout";
import { Header } from "../../views/shared/Header";
import { Footer } from "../../views/shared/Footer";
import { HistoryPage } from "../../views/History/HistoryPage";
import certification from "../../data/certification/data.json";
import workExperience from "../../data/workExperience/data.json";

export const historyRoutes = new Hono<ContextSet>();

historyRoutes.get("/", (c) => {
  return c.render(
    <HTMLLayout title="History - taga3s-dev">
      <Header />
      <HistoryPage workExperience={workExperience.content} certification={certification.content} />
      <Footer />
    </HTMLLayout>,
  );
});
