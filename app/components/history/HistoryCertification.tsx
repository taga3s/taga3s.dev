import type { FC } from "hono/jsx";
import type { ICertification } from "../../api/certification";
import { Section } from "../Section";
import { certificationList, certificationListItem } from "./HistoryCertification.css";

type Props = {
  certification: ICertification[];
};

const HistoryCertification: FC<Props> = ({ certification }) => {
  return (
    <Section title="Certification">
      <ul class={certificationList}>
        {certification.map((item) => (
          <li key={item.name} class={certificationListItem}>
            <span>{item.when}</span>
            <span>
              {item.name} {item.url && <a href={item.url}>[link]</a>}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export { HistoryCertification };
