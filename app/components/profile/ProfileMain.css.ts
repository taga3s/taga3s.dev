import { css } from "hono/css";

const main = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const mainBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const mainImage = css`
  width: 100px;
  height: 100px;
  border-radius: 12px;

  @media screen and (min-width:600px) {
    width: 140px;
    height: 140px;
  }
`;

const mainName = css`
  font-size: 28px;
  font-weight: bold;
`;

const mainBelonging = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
`;

const mainIntroduction = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  font-size: 16px;
`;

export { main, mainBox, mainImage, mainName, mainBelonging, mainIntroduction };
