import { css } from "hono/css";

const postDetailHeaderWrapper = css`
  margin-bottom: 32px;
`;

const postDetailHeaderTitle = css`
  font-size: 32px;
  font-weight: bold;
`;

const postDetailHeaderDivider = css`
  margin-top: 16px;
  margin-bottom: 12px;
  background: transparent;
  border-bottom: 1px solid #d0d7de;
  height: 1px;
  padding: 0;
  background-color: #d0d7de;
  border: 0;
`;

export { postDetailHeaderWrapper, postDetailHeaderTitle, postDetailHeaderDivider };
