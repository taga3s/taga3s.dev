import type { FC } from "hono/jsx";
import type { IWorkHistory } from "../../api/workHistory";
import { HistoryEducationalBackground } from "./HistoryEducationalBackground";
import { WorkHistory } from "./HistoryWorkHistory";
import { HistoryCertification } from "./HistoryCertification";
import type { ICertification } from "../../api/certification";
import { presenter } from "../Presenter.css";

type Props = {
  workHistory: IWorkHistory[];
  certification: ICertification[];
};

const HistoryPresenter: FC<Props> = (props) => {
  const { workHistory, certification } = props;

  return (
    <div class={presenter}>
      <WorkHistory workHistory={workHistory} />
      <HistoryEducationalBackground />
      <HistoryCertification certification={certification} />
    </div>
  );
};

export { HistoryPresenter };
