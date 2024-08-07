import { type FC, type JSX, useState } from "hono/jsx";
import {
  photoClickWrapperImage,
  photoClickWrapperExpandedImage,
  photoClickWrapperExpandedImageContainer,
  photoClickWrapperMask,
  photoClickWrapperMaskCloseButton,
} from "./PhotoClickWrapper.css";
import { CloseIcon } from "../components/icons/Close";

type Props = {
  children: JSX.HTMLAttributes;
  imageUrl: string;
  imageAlt: string;
};

const PhotoClickWrapper: FC<Props> = ({ children, imageUrl, imageAlt }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <>
      <button type="button" onClick={() => handleClick()} class={photoClickWrapperImage}>
        {children}
      </button>
      {isClicked && (
        <div class={photoClickWrapperMask} id="photo-with-mask">
          <button type="button" onClick={handleClick} class={photoClickWrapperMaskCloseButton}>
            <CloseIcon />
          </button>
          <div class={photoClickWrapperExpandedImageContainer}>
            <img src={imageUrl} alt={imageAlt} class={photoClickWrapperExpandedImage} />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoClickWrapper;
