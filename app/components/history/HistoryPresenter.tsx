import type { FC } from "hono/jsx";
import type { IWorkHistory } from "../../api/workHistory";
import { HistoryEducationalBackground } from "./HistoryEducationalBackground";
import { presenterLayout } from "./HistoryPresenter.css";
import { WorkHistory } from "./HistoryWorkHistory";
import { HistoryCertification } from "./HistoryCertification";

type Props = {
  workHistory: IWorkHistory[];
};

const HistoryPresenter: FC<Props> = (props) => {
  const { workHistory } = props;

  return (
    <div class={presenterLayout}>
      <WorkHistory workHistory={workHistory} />
      <HistoryEducationalBackground />
      <HistoryCertification />
    </div>
  );
};

export { HistoryPresenter };
