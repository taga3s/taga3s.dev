import { FC } from "hono/jsx";
import { ProfileLinks } from "./ProfileLinks";
import { ProfileMain } from "./ProfileMain";
import { Photo } from "../../api/photos/model";
import { ProfilePhotos } from "./ProfilePhotos";

type Props = {
  photos: Photo[];
};

const ProfilePresenter: FC<Props> = (props) => (
  <>
    <ProfileMain />
    <ProfileLinks />
    <ProfilePhotos photos={props.photos} />
  </>
);

export { ProfilePresenter };
