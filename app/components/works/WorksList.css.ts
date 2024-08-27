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
  position: relative;
`;

const worksListItemImg = css`
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
    color: #6a5ed1;
  `,
  header: css`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  icon: css`
    width: 24px;
    height: 24px;
    fill: #6a5ed1;
  `,
  title: css`
    font-size: 24px;
    font-weight: bold;
  `,
};

export { worksListContainer, worksList, worksListItem, worksListItemImg, worksListItemDetail };
