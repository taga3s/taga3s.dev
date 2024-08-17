import { createRoute } from "honox/factory";
import { WorksPresenter } from "../components/works/WorksPresenter";

export default createRoute(async (c) => {
  return c.render(<WorksPresenter />);
});
