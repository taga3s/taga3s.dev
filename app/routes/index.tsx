import { createRoute } from "honox/factory";
import { ProfilePresenter } from "../components/profile/ProfilePresenter";
import { fetchPhotos } from "../api/photos";

export default createRoute(async (c) => {
  const photos = await fetchPhotos(c);
  return c.render(<ProfilePresenter photos={photos} />);
});
