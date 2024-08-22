import { createRoute } from "honox/factory";
import { WorksPresenter } from "../components/works/WorksPresenter";
import { fetchWorks } from "../api/works";

export default createRoute(async (c) => {
  const works = await fetchWorks(c);
  return c.render(<WorksPresenter works={works} />);
});
