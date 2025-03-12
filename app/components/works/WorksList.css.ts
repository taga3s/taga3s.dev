import { css } from "hono/css";

const worksListContainer = css`
  margin-top: 20px;
`;

const worksList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;

const worksListItem = css`
  max-width: 540px;
  width: 100%;
`;

const worksListItemDetailWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  padding: 16px 0;
`;

const worksListItemDetailHeader = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const worksListItemDetailTitle = css`
  font-size: 20px;
  font-weight: bold;
`;

const worksListItemDetailIcon = css`
  width: 20px;
  height: 20px;
`;

export {
  worksListContainer,
  worksList,
  worksListItem,
  worksListItemDetailWrapper,
  worksListItemDetailHeader,
  worksListItemDetailTitle,
  worksListItemDetailIcon,
};
