import { css } from "hono/css";

const Main = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Main_Box = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Main_Image = css`
  width: 100px;
  height: 100px;
  border-radius: 12px;

  @media screen and (min-width:600px) {
    width: 140px;
    height: 140px;
  }
`;

const Main_Name = css`
  font-size: 28px;
  font-weight: bold;
`;

const Main_Belonging = css`
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

export { Main, Main_Box, Main_Image, Main_Name, Main_Belonging, Introduction };
