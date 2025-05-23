import { css } from "hono/css";

const profileMain = css`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const profileMainBox = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const profileMainImage = css`
  width: 120px;
  height: 120px;
  border-radius: 100%;

  @media screen and (min-width:600px) {
    width: 160px;
    height: 160px;
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
  margin-top: 24px;
  margin-bottom: 24px;
  font-size: 16px;
  font-style: italic;
`;

export {
  profileMain,
  profileMainBox,
  profileMainImage,
  profileMainName,
  profileMainBelonging,
  profileMainIntroduction,
};
