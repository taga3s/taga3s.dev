import { css } from "hono/css";

const profilePhotoExpandedStyle = {
  mask: css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
  `,
  maskCloseButton: css`
    position: absolute;
    top: 16px;
    right: 16px;
  `,
  expandedImageContainer: css`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `,
  expandedImageWrapper: css`
    position: relative;
    margin: 0 16px;
    touch-action: manipulation;
  `,
  expandedImage: css`
    max-width: 440px;
    width: 100%;
    height: auto;
    user-select: none;
    
    @media screen and (min-width:600px) {
      max-width: 560px;
    }
  `,
  expandedImageSwitchBase: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 8px;
    height: 100%;
    background: rgb(66, 66, 66, 0.3);
  `,
  expandedImageSwitchLeft: css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
  `,
  expandedImageSwitchRight: css`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
  `,
};

export { profilePhotoExpandedStyle };
