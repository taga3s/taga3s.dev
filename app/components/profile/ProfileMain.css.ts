import { css } from "hono/css";

const profileMain = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const profileMainBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const profileMainImage = css`
  width: 100px;
  height: 100px;
  border-radius: 12px;

  @media screen and (min-width:600px) {
    width: 140px;
    height: 140px;
  }
`;

const profileMainName = css`
  font-size: 28px;
  font-weight: bold;
`;

const profileMainBelonging = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
`;

const profileMainIntroduction = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  font-size: 16px;
`;

export {
  profileMain,
  profileMainBox,
  profileMainImage,
  profileMainName,
  profileMainBelonging,
  profileMainIntroduction,
};
