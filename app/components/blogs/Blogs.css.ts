import { css } from "hono/css";

const blogs = {
  wrapper: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 32px;
  `,
  item: css`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 8px;
  `,
  itemTitle: css`
    font-size: 20px;
    font-weight: bold;
  `,
};

export { blogs };
