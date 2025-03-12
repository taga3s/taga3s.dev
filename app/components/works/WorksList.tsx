import type { FC } from "hono/jsx";
import { Section } from "../Section";
import {
  worksList,
  worksListItem,
  worksListItemDetailHeader,
  worksListItemDetailIcon,
  worksListItemDetailTitle,
  worksListItemDetailWrapper,
} from "./WorksList.css";
import type { IWork } from "../../api/works";
import { GitHubIcon } from "../icons";

type Props = {
  works: IWork[];
};

const WorksList: FC<Props> = ({ works }) => {
  return (
    <Section title="Works">
      <ul class={worksList}>
        {works.map((work) => (
          <li key={work.title} class={worksListItem}>
            <div class={worksListItemDetailWrapper}>
              <div class={worksListItemDetailHeader}>
                <a href={work.githubUrl} class={worksListItemDetailIcon}>
                  <GitHubIcon />
                </a>
                <h3 class={worksListItemDetailTitle}>{work.title}</h3>
              </div>
              <p>{work.description}</p>
              <span>{work.techStack}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export { WorksList };
