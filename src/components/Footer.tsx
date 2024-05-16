import { css } from "hono/css";

const Layout = css`
  margin-top: auto;
  position: absolute;
  bottom: 0;
`

const Content = css`
  padding: 20px 0;
`

const Footer = () => {
  return (
    <footer class={Layout}>
      <div class={Content}>
        <small>&copy; 2024 taga3</small>
      </div>
    </footer>
  );
}

export { Footer };