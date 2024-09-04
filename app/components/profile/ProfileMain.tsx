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
            <li>Web Developer (working as an intern)</li>
          </ul>
        </div>
        <div>
          <img class={profileMainImage} src="https://github.com/taga3s.png" alt="me" />
        </div>
      </div>
      <ul class={profileMainIntroduction}>
        <li>🛠️ わくわくするようなモノづくりがしたい。</li>
        <li>🐳 Web、法律、ラーメン...な日常。</li>
        <li>🍀 アニメ/漫画やゲームが好き。</li>
      </ul>
    </section>
  );
};

export { ProfileMain };
