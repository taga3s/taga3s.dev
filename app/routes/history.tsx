import { createRoute } from "honox/factory";
import { HistoryPresenter } from "../components/history/HistoryPresenter";
import { fetcher } from "../api/workHistory";

export default createRoute(async (c) => {
  const workHistory = await fetcher(c);
  return c.render(<HistoryPresenter workHistory={workHistory} />);
});
