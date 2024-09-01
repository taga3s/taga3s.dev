import { useState, startViewTransition, type FC } from "hono/jsx";
import type { Photo } from "../api/photos";
import { photoImage, photoList } from "./PhotoList.css";
import { PhotoExpanded } from "./PhotoExpanded";

type Props = {
  photos: Photo[];
};

const PhotoList: FC<Props> = (props) => {
  const [expandedPhoto, setExpandedPhoto] = useState<Photo>(props.photos[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenExpandedPhoto = () => {
    startViewTransition(() => setIsOpen(!isOpen));
  };

  const handleExpandedPhoto = (photo: Photo) => {
    setExpandedPhoto(photo);
  };

  const handleSwitchExpandedPhoto = (direction: "left" | "right") => {
    const currentIndex = props.photos.findIndex((photo) => photo === expandedPhoto);
    let nextIndex = 0;

    if (direction === "left") {
      if (currentIndex !== 0) {
        nextIndex = currentIndex - 1;
      } else {
        nextIndex = props.photos.length - 1;
      }
    }

    if (direction === "right") {
      if (currentIndex !== props.photos.length - 1) {
        nextIndex = currentIndex + 1;
      } else {
        nextIndex = 0;
      }
    }

    startViewTransition(() => setExpandedPhoto(props.photos[nextIndex]));
  };

  return (
    <>
      <div class={photoList}>
        {props.photos.map((photo) => (
          <button
            onClick={() => {
              handleExpandedPhoto(photo);
              handleOpenExpandedPhoto();
            }}
            type="button"
            key={photo.title}
          >
            <img src={photo.url} alt={photo.title} class={photoImage} />
          </button>
        ))}
      </div>
      {isOpen && (
        <PhotoExpanded
          expandedPhoto={expandedPhoto}
          handleOpenExpandedPhoto={handleOpenExpandedPhoto}
          handleSwitchExpandedPhoto={handleSwitchExpandedPhoto}
        />
      )}
    </>
  );
};

export { PhotoList };