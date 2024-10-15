import type { FC } from "hono/jsx";
import type { WorkExperience } from "../../api/workExperience";
import { HistoryEducationalBackground } from "./HistoryEducationalBackground";
import { presenterLayout } from "./HistoryPresenter.css";
import { HistoryWorkExperience } from "./HistoryWorkExperience";
import { HistoryCertification } from "./HistoryCertification";

type Props = {
  workExperiences: WorkExperience[];
};

const HistoryPresenter: FC<Props> = (props) => {
  const { workExperiences } = props;

  return (
    <div class={presenterLayout}>
      <HistoryWorkExperience workExperiences={workExperiences} />
      <HistoryEducationalBackground />
      <HistoryCertification />
    </div>
  );
};

export { HistoryPresenter };
