import { Layout, Links } from "./Header.css";

const Header = () => {
  return (
    <header class={Layout}>
      <ul class={Links}>
        <li>
          <a href="/">about me</a>
        </li>
        <li>
          <a href="/history">history</a>
        </li>
        <li>
          <a href="/works">works</a>
        </li>
      </ul>
    </header>
  );
}

export { Header };
