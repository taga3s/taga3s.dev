import { createRoute } from "honox/factory";
import { fetcher } from "../api/works";
import { presenter } from "../components/Presenter.css";
import { WorksList } from "../components/works/WorksList";

export default createRoute(async (c) => {
  const works = await fetcher(c);
  return c.render(
    <div class={presenter}>
      <WorksList works={works} />
    </div>,
  );
});
