import { FC } from "hono/jsx";
import { Photo } from "../../api/photos";
import { Header, Layout } from "./common.css";
import { Photo_Container, Photo_Image } from "./ProfilePhotos.css";

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
            <img key={image.title} src={image.url} alt={image.title} class={Photo_Image} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export { ProfilePhotos };
