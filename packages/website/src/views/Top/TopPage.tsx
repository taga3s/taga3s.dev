import type { FC } from "hono/jsx";
import type { IPhoto } from "../../data/photos";
import { presenter } from "../shared/Presenter.css";
import { ProfileLinks } from "./ProfileLinks";
import { ProfileMain } from "./ProfileMain";
import { ProfilePhotos } from "./ProfilePhotos";

export const TopPage: FC<{ photos: IPhoto[] }> = ({ photos }) => {
  return (
    <div class={presenter}>
      <ProfileMain />
      <ProfileLinks />
      <ProfilePhotos photos={photos} />
    </div>
  );
};
