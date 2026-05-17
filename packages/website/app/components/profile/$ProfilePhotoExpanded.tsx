import { cx } from "hono/css";
import type { FC } from "hono/jsx";
import type { IPhoto } from "../../data/photos";
import { ChevronLeft } from "../icons/ChevronLeft";
import { ChevronRight } from "../icons/ChevronRight";
import { CloseIcon } from "../icons/Close";
import { profilePhotoExpandedStyle } from "./$ProfilePhotoExpanded.css";

type Props = {
  expandedPhoto: IPhoto;
  handleOpenExpandedPhoto: () => void;
  handleSwitchExpandedPhoto: (direction: "left" | "right") => void;
};

const ProfilePhotoExpanded: FC<Props> = ({ expandedPhoto, handleOpenExpandedPhoto, handleSwitchExpandedPhoto }) => {
  return (
    <div class={profilePhotoExpandedStyle.mask} id="photo-with-mask">
      <button type="button" onClick={() => handleOpenExpandedPhoto()} class={profilePhotoExpandedStyle.maskCloseButton}>
        <CloseIcon />
      </button>
      <div class={profilePhotoExpandedStyle.expandedImageContainer}>
        <div class={profilePhotoExpandedStyle.expandedImageWrapper}>
          <button
            type="button"
            class={cx(
              profilePhotoExpandedStyle.expandedImageSwitchBase,
              profilePhotoExpandedStyle.expandedImageSwitchLeft,
            )}
            onClick={() => handleSwitchExpandedPhoto("left")}
          >
            <ChevronLeft />
          </button>
          <img src={expandedPhoto.url} alt={""} class={profilePhotoExpandedStyle.expandedImage} />
          <button
            type="button"
            class={cx(
              profilePhotoExpandedStyle.expandedImageSwitchBase,
              profilePhotoExpandedStyle.expandedImageSwitchRight,
            )}
            onClick={() => handleSwitchExpandedPhoto("right")}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export { ProfilePhotoExpanded };
