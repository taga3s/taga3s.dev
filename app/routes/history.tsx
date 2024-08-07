import { createRoute } from "honox/factory";
import { HistoryPresenter } from "../components/history/HistoryPresenter";
import { fetchWorkExperience } from "../api/workExperience";

export default createRoute(async (c) => {
  const workExperience = await fetchWorkExperience(c);
  return c.render(<HistoryPresenter workExperience={workExperience} />);
});
