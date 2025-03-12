import { css } from "hono/css";

const workHistoryList = css`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 32px;
`;

const workHistoryDescription = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px 0;
`;

export { workHistoryList, workHistoryDescription };
