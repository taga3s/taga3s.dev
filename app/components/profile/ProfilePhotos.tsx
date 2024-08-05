import type { FC } from "hono/jsx";
import type { Photo } from "../../api/photos";
import { Header, Layout } from "./common.css";
import { Photo_Container, Photo_Image } from "./ProfilePhotos.css";
import PhotoClickWrapper from "../../islands/PhotoClickWrapper";

type Props = {
  photos: Photo[];
};

const ProfilePhotos: FC<Props> = (props) => {
  return (
    <section class={Layout}>
      <h2 class={Header}>Favorites</h2>
      <ul class={Photo_Container}>
        {props.photos.map((image) => (
          <li key={image.title}>
            <PhotoClickWrapper imageUrl={image.url} imageAlt={image.title}>
              <img src={image.url} alt={image.title} class={Photo_Image} />
            </PhotoClickWrapper>
          </li>
        ))}
      </ul>
    </section>
  );
};

export { ProfilePhotos };
