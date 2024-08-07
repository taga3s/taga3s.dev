import { css } from "hono/css";

const educationalBackgroundList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const educationalBackgroundListItem = css`
  display: flex;
  gap: 16px;
`;

export { educationalBackgroundList, educationalBackgroundListItem };
