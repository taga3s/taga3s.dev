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
    <section>
      <div class={profileMain}>
        <div class={profileMainBox}>
          <span class={profileMainName}>Seiya Tagami / taga3s</span>
          <ul class={profileMainBelonging}>
            <li>Student / Web Developer</li>
          </ul>
        </div>
        <div>
          <img class={profileMainImage} src="https://github.com/taga3s.png" alt="me" />
        </div>
      </div>
      <ul class={profileMainIntroduction}>
        <li>Memento mori, Carpe diem</li>
      </ul>
    </section>
  );
};

export { ProfileMain };
