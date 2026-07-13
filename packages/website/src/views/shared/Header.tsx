import { headerContent, headerNav } from "./Header.css";

export const Header = () => {
  return (
    <header>
      <div class={headerContent}>
        <nav class={headerNav}>
          <a href="/">about</a>
          <a href="/history">history</a>
          <a href="/blog">blog</a>
        </nav>
      </div>
    </header>
  );
};
