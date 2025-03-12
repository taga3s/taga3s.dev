import { createRoute } from "honox/factory";
import { WorksPresenter } from "../components/works/WorksPresenter";
import { fetcher } from "../api/works";

export default createRoute(async (c) => {
  const works = await fetcher(c);
  return c.render(<WorksPresenter works={works} />);
});
