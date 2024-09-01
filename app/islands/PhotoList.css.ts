import { css } from "hono/css";

const photoList = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media screen and (min-width:600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const photoImage = css`
  max-width: 100%;
  border-radius: 8px;
`;

export { photoList, photoImage };
