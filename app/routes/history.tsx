import { createRoute } from "honox/factory";
import { presenter } from "../components/Presenter.css";
import { HistoryWorkHistory } from "../components/history/HistoryWorkHistory";
import { HistoryEducationalBackground } from "../components/history/HistoryEducationalBackground";
import { HistoryCertification } from "../components/history/HistoryCertification";
import workHistory from "../data/workHistory/work_history.json" with { type: "json" };
import educationalBackground from "../data/educationalBackground/educational_background.json" with { type: "json" };
import certification from "../data/certification/certification.json" with { type: "json" };

export default createRoute(async (c) => {
  return c.render(
    <div class={presenter}>
      <HistoryWorkHistory workHistory={workHistory.content} />
      <HistoryEducationalBackground educationalBackground={educationalBackground.content} />
      <HistoryCertification certification={certification.content} />
    </div>,
  );
});
