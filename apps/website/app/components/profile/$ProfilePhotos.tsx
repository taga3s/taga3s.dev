import { type FC, startViewTransition, useState } from "hono/jsx";
import type { IPhoto } from "../../data/photos";
import { Section } from "../Section";
import { ProfilePhotoExpanded } from "./$ProfilePhotoExpanded";
import { profilePhotoImage, profilePhotoList } from "./$ProfilePhotos.css";

type Props = {
  photos: IPhoto[];
};

const ProfilePhotos: FC<Props> = (props) => {
  const [expandedPhoto, setExpandedPhoto] = useState<IPhoto>(props.photos[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenExpandedPhoto = () => {
    startViewTransition(() => setIsOpen(!isOpen));
  };

  const handleExpandedPhoto = (photo: IPhoto) => {
    setExpandedPhoto(photo);
  };

  const handleSwitchExpandedPhoto = (direction: "left" | "right") => {
    const currentIndex = props.photos.indexOf(expandedPhoto);
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
    <Section title="📷 favs">
      <div class={profilePhotoList}>
        {props.photos.map((photo) => (
          <button
            onClick={() => {
              handleExpandedPhoto(photo);
              handleOpenExpandedPhoto();
            }}
            type="button"
            key={photo.url}
          >
            <img src={photo.url} alt={"favorite"} class={profilePhotoImage} />
          </button>
        ))}
      </div>
      {isOpen && (
        <ProfilePhotoExpanded
          expandedPhoto={expandedPhoto}
          handleOpenExpandedPhoto={handleOpenExpandedPhoto}
          handleSwitchExpandedPhoto={handleSwitchExpandedPhoto}
        />
      )}
    </Section>
  );
};

export { ProfilePhotos };
