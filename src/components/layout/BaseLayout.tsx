import { html } from "hono/html";

const BaseLayout = (props: { children?: any }) => html`
    <div>
      ${props.children}
    </div>
  `;

export default BaseLayout;
