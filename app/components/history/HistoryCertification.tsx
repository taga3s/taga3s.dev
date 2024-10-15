import { Section } from "../Section";
import { certificationList, certificationListItem } from "./HistoryCertification.css";

const HistoryCertification = () => {
  return (
    <Section title="Certification">
      <ul class={certificationList}>
        <li class={certificationListItem}>
          <span>2024年10月</span>
          <span>基本情報取得</span>
        </li>
      </ul>
    </Section>
  );
};

export { HistoryCertification };
