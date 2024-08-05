import { type FC, type JSX, useState } from "hono/jsx";
import { Close_Button, Image, Image_Container, Mask, Wrapper } from "./PhotoClickWrapper.css";
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
      <button type="button" onClick={() => handleClick()} class={Wrapper}>
        {children}
      </button>
      {isClicked && (
        <div class={Mask} id="photo-with-mask">
          <button type="button" onClick={handleClick} class={Close_Button}>
            <CloseIcon />
          </button>
          <div class={Image_Container}>
            <img src={imageUrl} alt={imageAlt} class={Image} />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoClickWrapper;
