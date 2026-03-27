import { createRoute } from "honox/factory";
import { HistoryCertification } from "../components/history/HistoryCertification";
import { HistoryWorkExperience } from "../components/history/HistoryWorkExperience";
import { presenter } from "../components/Presenter.css";
import certification from "../data/certification/data.json" with { type: "json" };
import workExperience from "../data/workExperience/data.json" with { type: "json" };

export default createRoute(async (c) => {
  return c.render(
    <div class={presenter}>
      <HistoryWorkExperience workExperience={workExperience.content} />
      <HistoryCertification certification={certification.content} />
    </div>,
    {
      title: "taga3s-dev - history",
      description: "taga3s-dev - history",
    },
  );
});
