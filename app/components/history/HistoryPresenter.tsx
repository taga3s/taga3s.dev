import type { FC } from "hono/jsx";
import type { WorkExperience } from "../../api/workExperience";
import { HistoryEducationalBackground } from "./HistoryEducationalBackground";
import { layout } from "./HistoryPresenter.css";
import { HistoryWorkExperience } from "./HistoryWorkExperience";

type Props = {
  workExperience: WorkExperience[];
};

const HistoryPresenter: FC<Props> = (props) => {
  const { workExperience } = props;

  return (
    <div class={layout}>
      <HistoryWorkExperience workExperience={workExperience} />
      <HistoryEducationalBackground />
    </div>
  );
};

export { HistoryPresenter };
