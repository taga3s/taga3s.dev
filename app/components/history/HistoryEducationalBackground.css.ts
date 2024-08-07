import { css } from "hono/css";

const list = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const listItem = css`
  display: flex;
  gap: 16px;
`;

export { list, listItem };
