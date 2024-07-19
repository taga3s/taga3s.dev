import { css } from "hono/css";

const Content = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Content_Box = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Content_MyImg = css`
  width: 100px;
  height: 100px;
  border-radius: 12px;
`;

const Content_Name = css`
  font-size: 28px;
  font-weight: bold;
`;

const Content_Belonging = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
`;

const Introduction = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  font-size: 16px;
`;

export { Content, Content_Box, Content_MyImg, Content_Name, Content_Belonging, Introduction };
