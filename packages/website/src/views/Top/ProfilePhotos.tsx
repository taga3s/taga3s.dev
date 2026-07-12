import type { FC } from "hono/jsx";
import type { IPhoto } from "../../data/photos";
import { Section } from "../shared/Section";
import { profilePhotoImage, profilePhotoList } from "./ProfilePhotos.css";

type Props = {
  photos: IPhoto[];
};

const ProfilePhotos: FC<Props> = (props) => {
  return (
    <Section title="Favs">
      <div class={profilePhotoList}>
        {props.photos.map((photo) => (
          <img src={photo.url} alt={"favorite"} class={profilePhotoImage} />
        ))}
      </div>
    </Section>
  );
};

export { ProfilePhotos };
