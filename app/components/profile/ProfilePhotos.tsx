import type { FC } from "hono/jsx";
import type { Photo } from "../../api/photos";
import { photoList, photoImage } from "./ProfilePhotos.css";
import PhotoClickWrapper from "../../islands/PhotoClickWrapper";
import { Section } from "../Section";

type Props = {
  photos: Photo[];
};

const ProfilePhotos: FC<Props> = (props) => {
  return (
    <Section title="Favorites">
      <ul class={photoList}>
        {props.photos.map((image) => (
          <li key={image.title}>
            <PhotoClickWrapper imageUrl={image.url} imageAlt={image.title}>
              <img src={image.url} alt={image.title} class={photoImage} />
            </PhotoClickWrapper>
          </li>
        ))}
      </ul>
    </Section>
  );
};

export { ProfilePhotos };
