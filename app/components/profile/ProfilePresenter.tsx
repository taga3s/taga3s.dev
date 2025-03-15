import type { FC } from "hono/jsx";
import { ProfileLinks } from "./ProfileLinks";
import { ProfileMain } from "./ProfileMain";
import type { IPhoto } from "../../api/photos/model";
import { ProfilePhotos } from "./ProfilePhotos";
import { presenterLayout } from "./ProfilePresenter.css";

type Props = {
  photos: IPhoto[];
};

const ProfilePresenter: FC<Props> = (props) => (
  <div class={presenterLayout}>
    <ProfileMain />
    <ProfileLinks />
    <ProfilePhotos photos={props.photos} />
  </div>
);

export { ProfilePresenter };
