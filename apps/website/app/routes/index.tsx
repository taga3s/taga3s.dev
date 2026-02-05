import { createRoute } from "honox/factory";
import { presenter } from "../components/Presenter.css";
import { ProfilePhotos } from "../components/profile/$ProfilePhotos";
import { ProfileLinks } from "../components/profile/ProfileLinks";
import { ProfileMain } from "../components/profile/ProfileMain";
import photos from "../data/photos/photos.json";

export default createRoute(async (c) => {
  return c.render(
    <div class={presenter}>
      <ProfileMain />
      <ProfileLinks />
      <ProfilePhotos photos={photos.content} />
    </div>,
  );
});
