import { css } from "hono/css";

const profilePhotoList = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media screen and (min-width:600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const profilePhotoImage = css`
  max-width: 100%;
  border-radius: 8px;
`;

export { profilePhotoList, profilePhotoImage };
