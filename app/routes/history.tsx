import { createRoute } from "honox/factory";
import { HistoryPresenter } from "../components/history/HistoryPresenter";
import { fetcher as workHistoryFetcher } from "../api/workHistory";
import { fetcher as certificationFetcher } from "../api/certification";

export default createRoute(async (c) => {
  const workHistory = await workHistoryFetcher(c);
  const certification = await certificationFetcher(c);
  return c.render(<HistoryPresenter workHistory={workHistory} certification={certification} />);
});
