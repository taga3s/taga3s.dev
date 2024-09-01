import type { FC } from "hono/jsx";
import { photoExpandedStyle } from "./PhotoExpanded.css";
import { CloseIcon } from "../components/icons/Close";
import type { Photo } from "../api/photos";
import { ChevronLeft } from "../components/icons/ChevronLeft";
import { ChevronRight } from "../components/icons/ChevronRight";
import { cx } from "hono/css";

type Props = {
  expandedPhoto: Photo;
  handleOpenExpandedPhoto: (open: boolean) => void;
  handleSwitchExpandedPhoto: (direction: "left" | "right") => void;
};

const PhotoExpanded: FC<Props> = ({ expandedPhoto, handleOpenExpandedPhoto, handleSwitchExpandedPhoto }) => {
  return (
    <div class={photoExpandedStyle.mask} id="photo-with-mask">
      <button type="button" onClick={() => handleOpenExpandedPhoto(false)} class={photoExpandedStyle.maskCloseButton}>
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
          <img src={expandedPhoto.url} alt={expandedPhoto.title} class={photoExpandedStyle.expandedImage} />
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
