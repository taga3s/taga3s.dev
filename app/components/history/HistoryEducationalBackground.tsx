import { Section } from "../layout/Section";
import { list, listItem } from "./HistoryEducationalBackground.css";

const HistoryEducationalBackground = () => {
  return (
    <Section title="Educational background">
      <ul class={list}>
        <li class={listItem}>
          <span>2022年4月 - 現在</span>
          <span>早稲田大学法学部在学中</span>
        </li>
      </ul>
    </Section>
  );
};

export { HistoryEducationalBackground };
