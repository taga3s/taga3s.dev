import type { FC } from "hono/jsx";
import type { WorkExperience } from "../../api/workExperience";
import { Section } from "../Section";
import { workExperienceDescription, workExperienceList } from "./HistoryWorkExperience.css";

type Props = {
  workExperiences: WorkExperience[];
};

const HistoryWorkExperience: FC<Props> = (props) => {
  const { workExperiences } = props;

  return (
    <Section title="Work experience">
      <ul class={workExperienceList}>
        {workExperiences
          .toSorted((a, b) => a.order - b.order)
          .map((item) => (
            <li key={item.company}>
              <details>
                <summary>
                  {item.span}: {item.company}
                </summary>
                <p class={workExperienceDescription}>
                  <span>{item.description}</span>
                  <span>使用技術: {item.techStack}</span>
                </p>
              </details>
            </li>
          ))}
      </ul>
    </Section>
  );
};

export { HistoryWorkExperience };
