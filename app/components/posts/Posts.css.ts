import { css } from "hono/css";

const postsWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 28px;
`;

const postsCategorySelector = css`
  display: flex;
  gap: 16px;
`;

const postsCategorySelectorActive = css`
  display: inherit;
  padding: 6px 12px;
  border-radius: 8px;
  background-color: #000000;
  color: #fff;
  &:hover {
    background-color: #0056b3;
  }
`;

const postsCategorySelectorItemInactive = css`
  display: inherit;
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const postsList = css`
  display: flex;
  flex-direction: column;
`;

const postsItem = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  padding: 16px;
  border-top: 1px solid #ccc;

  &:hover {
    span {
      opacity: 0.7;
      text-decoration: underline;
    }
  }
`;

const postsItemTitle = css`
  font-size: 20px;
  font-weight: bold;
`;

export {
  postsWrapper,
  postsCategorySelector,
  postsCategorySelectorActive,
  postsCategorySelectorItemInactive,
  postsItem,
  postsItemTitle,
  postsList,
};
