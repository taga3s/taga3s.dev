import { css } from "hono/css";

const blogContentHeaderWrapper = css`
  margin-bottom: 32px;
`;

const blogContentHeaderTitle = css`
  font-size: 32px;
  font-weight: bold;
`;

const blogContentHeaderDivider = css`
  margin-top: 16px;
  margin-bottom: 12px;
  background: transparent;
  border-bottom: 1px solid #d0d7de;
  height: 1px;
  padding: 0;
  background-color: #d0d7de;
  border: 0;
`;

const blogContentHeaderDate = css`
  display: flex;
  gap: 16px;
`;

export { blogContentHeaderDate, blogContentHeaderDivider, blogContentHeaderTitle, blogContentHeaderWrapper };
