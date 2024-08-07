import { css } from "hono/css";

const list = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const description = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

export { list, description };
