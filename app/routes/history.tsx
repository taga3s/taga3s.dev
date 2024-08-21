import { createRoute } from "honox/factory";
import { HistoryPresenter } from "../components/history/HistoryPresenter";
import { fetchWorkExperiences } from "../api/workExperience";

export default createRoute(async (c) => {
  const workExperiences = await fetchWorkExperiences(c);
  return c.render(<HistoryPresenter workExperiences={workExperiences} />);
});
