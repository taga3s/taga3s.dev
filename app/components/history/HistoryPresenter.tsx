import type { FC } from "hono/jsx";
import type { IWorkHistory } from "../../api/workHistory";
import { HistoryEducationalBackground } from "./HistoryEducationalBackground";
import { presenterLayout } from "./HistoryPresenter.css";
import { WorkHistory } from "./HistoryWorkHistory";
import { HistoryCertification } from "./HistoryCertification";
import type { ICertification } from "../../api/certification";

type Props = {
  workHistory: IWorkHistory[];
  certification: ICertification[];
};

const HistoryPresenter: FC<Props> = (props) => {
  const { workHistory, certification } = props;

  return (
    <div class={presenterLayout}>
      <WorkHistory workHistory={workHistory} />
      <HistoryEducationalBackground />
      <HistoryCertification certification={certification} />
    </div>
  );
};

export { HistoryPresenter };
