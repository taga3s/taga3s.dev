import type { FC } from "hono/jsx";
import type { Photo } from "../../api/photos";
import { Section } from "../Section";
import { PhotoList } from "../../islands/PhotoList";

type Props = {
  photos: Photo[];
};

const ProfilePhotos: FC<Props> = (props) => {
  return (
    <Section title="Favorites">
      <PhotoList photos={props.photos} />
    </Section>
  );
};

export { ProfilePhotos };
