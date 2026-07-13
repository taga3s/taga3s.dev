import { css } from "hono/css";

const blogWrapper = css`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 28px;
`;

const blogList = css`
  display: flex;
  flex-direction: column;
`;

const blogItem = css`
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

const blogItemTitle = css`
  font-size: 20px;
  font-weight: bold;
`;

export { blogItem, blogItemTitle, blogList, blogWrapper };
