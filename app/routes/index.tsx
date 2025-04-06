import { createRoute } from "honox/factory";
import { fetcher } from "../api/photos";
import { presenter } from "../components/Presenter.css";
import { ProfileMain } from "../components/profile/ProfileMain";
import { ProfileLinks } from "../components/profile/ProfileLinks";
import { ProfilePhotos } from "../components/profile/$ProfilePhotos";

export default createRoute(async (c) => {
  const photos = await fetcher(c);
  return c.render(
    <div class={presenter}>
      <ProfileMain />
      <ProfileLinks />
      <ProfilePhotos photos={photos} />
    </div>,
  );
});
