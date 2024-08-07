import type { FC, JSX } from "hono/jsx";
import { sectionHeader } from "./Section.css";

type Props = {
  title: string;
  children: JSX.HTMLAttributes;
};

const Section: FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <section>
      <h2 class={sectionHeader}>{title}</h2>
      {children}
    </section>
  );
};

export { Section };
