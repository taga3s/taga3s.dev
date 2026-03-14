import {
  profileMain,
  profileMainBelonging,
  profileMainBox,
  profileMainImage,
  profileMainIntroduction,
  profileMainName,
} from "./ProfileMain.css";

const ProfileMain = () => {
  return (
    <div>
      <div class={profileMain}>
        <div class={profileMainBox}>
          <span class={profileMainName}>taga3s</span>
          <ul class={profileMainBelonging}>
            <li>Student / Programmer</li>
          </ul>
        </div>
        <div>
          <img class={profileMainImage} src="https://github.com/taga3s.png" alt="me" />
        </div>
      </div>
    </div>
  );
};

export { ProfileMain };
