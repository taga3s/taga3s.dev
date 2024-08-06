import type { FC, JSX } from "hono/jsx";
import { Header, Layout } from "./Section.css";

type Props = {
  title: string;
  children: JSX.HTMLAttributes;
};

const Section: FC<Props> = (props) => {
  const { title, children } = props;

  return (
    <section class={Layout}>
      <h2 class={Header}>{title}</h2>
      {children}
    </section>
  );
};

export { Section };
