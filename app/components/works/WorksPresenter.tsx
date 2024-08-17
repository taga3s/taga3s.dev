import { WorksList } from "./WorksList";
import { presenterLayout } from "./WorksPresenter.css";

const WorksPresenter = () => {
  return (
    <div class={presenterLayout}>
      <WorksList />
    </div>
  );
};

export { WorksPresenter };
