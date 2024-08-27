import type { FC } from "hono/jsx";
import { Section } from "../Section";
import { worksList, worksListItem, worksListItemDetail, worksListItemImg } from "./WorksList.css";
import type { Work } from "../../api/works";
import { GitHubIcon } from "../icons";

type Props = {
  works: Work[];
};

const WorksList: FC<Props> = ({ works }) => {
  return (
    <Section title="Works">
      <ul class={worksList}>
        {works.map((work) => (
          <li key={work.title} class={worksListItem}>
            <img src={work.image.url} alt={work.title} class={worksListItemImg} />
            <div class={worksListItemDetail.wrapper}>
              <div class={worksListItemDetail.header}>
                <h3 class={worksListItemDetail.title}>{work.title}</h3>
                <a href={work.githubUrl} class={worksListItemDetail.icon}>
                  <GitHubIcon />
                </a>
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
