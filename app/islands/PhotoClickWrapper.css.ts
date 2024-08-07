import { css } from "hono/css";

const photoClickWrapperImage = css`
  cursor: pointer;
`;

const photoClickWrapperMask = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;

const photoClickWrapperMaskCloseButton = css`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const photoClickWrapperExpandedImageContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const photoClickWrapperExpandedImage = css`
  max-width: 440px;
  width: 100%;
  height: auto;
  padding: 0 16px;
  user-select: none;

  @media screen and (min-width:600px) {
    max-width: 560px;
  }
`;

export {
  photoClickWrapperImage,
  photoClickWrapperMask,
  photoClickWrapperMaskCloseButton,
  photoClickWrapperExpandedImage,
  photoClickWrapperExpandedImageContainer,
};
