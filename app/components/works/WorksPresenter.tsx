import type { FC } from "hono/jsx";
import type { IWork } from "../../api/works";
import { WorksList } from "./WorksList";
import { presenter } from "../Presenter.css";

type Props = {
  works: IWork[];
};

const WorksPresenter: FC<Props> = ({ works }) => {
  return (
    <div class={presenter}>
      <WorksList works={works} />
    </div>
  );
};

export { WorksPresenter };
