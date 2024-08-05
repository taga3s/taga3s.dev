import { css } from "hono/css";

const Wrapper = css`
  cursor: pointer;
`

const Mask = css`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Close_Button = css`
  position: absolute;
  top: 16px;
  right: 16px;
`;

const Image_Container = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Image = css`
  max-width: 440px;
  width: 100%;
  height: auto;
  padding: 0 16px;
`;

export { Wrapper, Mask, Close_Button, Image, Image_Container };
