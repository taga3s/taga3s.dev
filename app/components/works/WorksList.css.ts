import { css } from "hono/css";

const worksListContainer = css`
  margin-top: 20px;
`;

const worksList = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  margin-top: 32px;
`;

const worksListItem = css`
  max-width: 540px;
  width: 100%;
  min-height: 180px;
  position: relative;

  @media screen and (min-width:600px) {
    min-height: 300px;
  }
`;

const worksListItemImg = css`
  width: 100%;
  border-radius: 8px;
`;

const worksListItemDetailWrapper = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 16px;
  opacity: 0.9;
  border-radius: 4px;
  color: #6a5ed1;
`;

const worksListItemDetailHeader = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const worksListItemDetailTitle = css`
  font-size: 20px;
  font-weight: bold;
`;

const worksListItemDetailIcon = css`
  width: 24px;
  height: 24px;
  fill: #6a5ed1;
`;

export {
  worksListContainer,
  worksList,
  worksListItem,
  worksListItemImg,
  worksListItemDetailWrapper,
  worksListItemDetailHeader,
  worksListItemDetailTitle,
  worksListItemDetailIcon,
};
