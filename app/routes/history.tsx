import { createRoute } from "honox/factory";
import { fetcher as workHistoryFetcher } from "../api/workHistory";
import { fetcher as certificationFetcher } from "../api/certification";
import { presenter } from "../components/Presenter.css";
import { WorkHistory } from "../components/history/HistoryWorkHistory";
import { HistoryEducationalBackground } from "../components/history/HistoryEducationalBackground";
import { HistoryCertification } from "../components/history/HistoryCertification";

export default createRoute(async (c) => {
  const workHistory = await workHistoryFetcher(c);
  const certification = await certificationFetcher(c);
  return c.render(
    <div class={presenter}>
      <WorkHistory workHistory={workHistory} />
      <HistoryEducationalBackground />
      <HistoryCertification certification={certification} />
    </div>,
  );
});
