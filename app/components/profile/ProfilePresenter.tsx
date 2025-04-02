import type { FC } from "hono/jsx";
import { ProfileLinks } from "./ProfileLinks";
import { ProfileMain } from "./ProfileMain";
import type { IPhoto } from "../../api/photos/model";
import { ProfilePhotos } from "./ProfilePhotos";
import { presenter } from "../Presenter.css";

type Props = {
  photos: IPhoto[];
};

const ProfilePresenter: FC<Props> = (props) => (
  <div class={presenter}>
    <ProfileMain />
    <ProfileLinks />
    <ProfilePhotos photos={props.photos} />
  </div>
);

export { ProfilePresenter };
