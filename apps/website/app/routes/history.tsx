import { createRoute } from "honox/factory";
import { HistoryCertification } from "../components/history/HistoryCertification";
import { HistoryWorkHistory } from "../components/history/HistoryWorkHistory";
import { presenter } from "../components/Presenter.css";
import certification from "../data/certification/certification.json" with { type: "json" };
import workHistory from "../data/workHistory/work_history.json" with { type: "json" };

export default createRoute(async (c) => {
  return c.render(
    <div class={presenter}>
      <HistoryWorkHistory workHistory={workHistory.content} />
      <HistoryCertification certification={certification.content} />
    </div>,
    {
      title: "taga3s-dev - history",
      description: "taga3s-dev - history",
    },
  );
});
