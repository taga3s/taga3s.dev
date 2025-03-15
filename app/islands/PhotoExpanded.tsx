import type { FC } from "hono/jsx";
import { photoExpandedStyle } from "./PhotoExpanded.css";
import { CloseIcon } from "../components/icons/Close";
import type { IPhoto } from "../api/photos";
import { ChevronLeft } from "../components/icons/ChevronLeft";
import { ChevronRight } from "../components/icons/ChevronRight";
import { cx } from "hono/css";

type Props = {
  expandedPhoto: IPhoto;
  handleOpenExpandedPhoto: () => void;
  handleSwitchExpandedPhoto: (direction: "left" | "right") => void;
};

const PhotoExpanded: FC<Props> = ({ expandedPhoto, handleOpenExpandedPhoto, handleSwitchExpandedPhoto }) => {
  return (
    <div class={photoExpandedStyle.mask} id="photo-with-mask">
      <button type="button" onClick={() => handleOpenExpandedPhoto()} class={photoExpandedStyle.maskCloseButton}>
        <CloseIcon />
      </button>
      <div class={photoExpandedStyle.expandedImageContainer}>
        <div class={photoExpandedStyle.expandedImageWrapper}>
          <button
            type="button"
            class={cx(photoExpandedStyle.expandedImageSwitchBase, photoExpandedStyle.expandedImageSwitchLeft)}
            onClick={() => handleSwitchExpandedPhoto("left")}
          >
            <ChevronLeft />
          </button>
          <img src={expandedPhoto.uri} alt={""} class={photoExpandedStyle.expandedImage} />
          <button
            type="button"
            class={cx(photoExpandedStyle.expandedImageSwitchBase, photoExpandedStyle.expandedImageSwitchRight)}
            onClick={() => handleSwitchExpandedPhoto("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export { PhotoExpanded };
