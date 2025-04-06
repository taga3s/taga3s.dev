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
  padding: 8px;
  margin-top: 8px;
  line-height: 1.5;
  background-color: #efefef;
  border-radius: 8px;
`;

export { workHistoryList, workHistoryDescription };
