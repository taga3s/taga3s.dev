import { css } from "hono/css";

const Photo_Container = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;
`;

const Photo_Image = css`
  max-width: 100%;
  border-radius: 8px;
`;

export { Photo_Container, Photo_Image };
