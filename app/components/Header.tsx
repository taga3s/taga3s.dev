import { headerContent, headerNav } from "./Header.css";

const Header = () => {
  return (
    <header>
      <div class={headerContent}>
        <nav class={headerNav}>
          <a href="/">about me</a>
          <a href="/history">history</a>
          <a href="/blogs">blogs</a>
          <a href="/works">works</a>
        </nav>
      </div>
    </header>
  );
};

export { Header };
