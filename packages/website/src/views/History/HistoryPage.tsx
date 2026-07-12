import type { FC } from "hono/jsx";
import type { ICertification } from "../../data/certification";
import type { IWorkExperience } from "../../data/workExperience";
import { presenter } from "../shared/Presenter.css";
import { HistoryCertification } from "./HistoryCertification";
import { HistoryWorkExperience } from "./HistoryWorkExperience";

export const HistoryPage: FC<{ workExperience: IWorkExperience[]; certification: ICertification[] }> = ({
  workExperience,
  certification,
}) => {
  return (
    <div class={presenter}>
      <HistoryWorkExperience workExperience={workExperience} />
      <HistoryCertification certification={certification} />
    </div>
  );
};
