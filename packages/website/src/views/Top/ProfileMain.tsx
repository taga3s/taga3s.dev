import { profileMain, profileMainBox, profileMainImage, profileMainName } from "./ProfileMain.css";

const ProfileMain = () => {
  return (
    <div class={profileMain}>
      <div>
        <img class={profileMainImage} src="https://github.com/taga3s.png" alt="me" />
      </div>
      <div class={profileMainBox}>
        <span class={profileMainName}>taga3s</span>
        {/* <ul class={profileMainBelonging}></ul> */}
      </div>
    </div>
  );
};

export { ProfileMain };
