import type { FC } from "hono/jsx";
import type { IPhoto } from "../../api/photos";
import { Section } from "../Section";
import { PhotoList } from "../../islands/PhotoList";

type Props = {
  photos: IPhoto[];
};

const ProfilePhotos: FC<Props> = (props) => {
  return (
    <Section title="Favs">
      <PhotoList photos={props.photos} />
    </Section>
  );
};

export { ProfilePhotos };
