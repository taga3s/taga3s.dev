import type { FC } from "hono/jsx";
import type { Work } from "../../api/works";
import { WorksList } from "./WorksList";
import { presenterLayout } from "./WorksPresenter.css";

type Props = {
  works: Work[];
};

const WorksPresenter: FC<Props> = ({ works }) => {
  return (
    <div class={presenterLayout}>
      <WorksList works={works} />
    </div>
  );
};

export { WorksPresenter };
