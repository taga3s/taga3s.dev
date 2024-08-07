import { css } from "hono/css";

const photoList = css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 16px;
  margin-top: 16px;
`;

const photoImage = css`
  max-width: 100%;
  border-radius: 8px;
`;

export { photoList, photoImage };
