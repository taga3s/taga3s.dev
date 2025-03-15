import { createRoute } from "honox/factory";
import { ProfilePresenter } from "../components/profile/ProfilePresenter";
import { fetcher } from "../api/photos";

export default createRoute(async (c) => {
  const photos = await fetcher(c);
  return c.render(<ProfilePresenter photos={photos} />);
});
