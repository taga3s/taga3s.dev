import { headerContent, headerNav } from "./Header.css";

const Header = () => {
  return (
    <header>
      <div class={headerContent}>
        <nav class={headerNav}>
          <a href="/">about me</a>
          <a href="/history">history</a>
          <a href="/posts">posts</a>
        </nav>
      </div>
    </header>
  );
};

export { Header };
