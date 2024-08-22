import { css } from "hono/css";

const worksListContainer = css`
  margin-top: 20px;
`;

const worksList = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-top: 32px;
`;

const worksListItem = css`
  position: relative;
`;

const worksListItemImg = css`
  max-width: 540px;
  width: 100%;
  border-radius: 8px;
`;

const worksListItemDetail = {
  wrapper: css`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px;
    opacity: 0.9;
    border-radius: 4px;
    color: #ffffff;
  `,
  title: css`
    font-size: 24px;
    font-weight: bold;
  `,
};

export { worksListContainer, worksList, worksListItem, worksListItemImg, worksListItemDetail };
