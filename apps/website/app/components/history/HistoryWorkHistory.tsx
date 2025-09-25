import type { FC } from "hono/jsx";
import type { IWorkHistory } from "../../data/workHistory";
import { Section } from "../Section";
import { workHistoryDescription, workHistoryList } from "./HistoryWorkHistory.css";

type Props = {
  workHistory: IWorkHistory[];
};

const HistoryWorkHistory: FC<Props> = (props) => {
  const { workHistory } = props;

  return (
    <Section title="Work history">
      <ul class={workHistoryList}>
        {workHistory
          .toSorted((a, b) => a.order - b.order)
          .map((item) => (
            <li key={item.company}>
              <details>
                <summary>
                  {item.span}: {item.company}
                </summary>
                <p class={workHistoryDescription}>
                  <span>{item.description}</span>
                  <span>言語・技術スタック: {item.tech_stack}</span>
                </p>
              </details>
            </li>
          ))}
      </ul>
    </Section>
  );
};

export { HistoryWorkHistory };
