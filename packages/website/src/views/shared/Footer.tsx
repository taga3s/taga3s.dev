import { footerContent, footerLayout } from "./Footer.css";

const Footer = () => {
  return (
    <footer class={footerLayout}>
      <div class={footerContent}>
        <small>&copy; 2026 taga3s</small>
      </div>
    </footer>
  );
};

export { Footer };
