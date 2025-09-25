import type { FC } from "hono/jsx";
import { Section } from "../Section";
import { educationalBackgroundList, educationalBackgroundListItem } from "./HistoryEducationalBackground.css";
import type { IEducationalBackground } from "../../data/educationalBackground/model";

type Props = {
  educationalBackground: IEducationalBackground[];
};
const HistoryEducationalBackground: FC<Props> = ({ educationalBackground }) => {
  return (
    <Section title="Educational background">
      <ul class={educationalBackgroundList}>
        {educationalBackground.map((item) => (
          <li class={educationalBackgroundListItem} key={item.title}>
            <span>{item.span}</span>
            <span>{item.title}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export { HistoryEducationalBackground };
