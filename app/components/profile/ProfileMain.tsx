import { main, mainBelonging, mainBox, mainImage, mainIntroduction, mainName } from "./ProfileMain.css";

const ProfileMain = () => {
  return (
    <section>
      <div class={main}>
        <div class={mainBox}>
          <span class={mainName}>Seiya Tagami / taga3s</span>
          <ul class={mainBelonging}>
            <li>Web Developer (working as an intern)</li>
          </ul>
        </div>
        <div>
          <img class={mainImage} src="https://github.com/taga3s.png" alt="me" />
        </div>
      </div>
      <ul class={mainIntroduction}>
        <li>🛠️ わくわくするようなモノづくりがしたい。</li>
        <li>🐳 Web、法律、ラーメン...な日常。</li>
        <li>🍀 アニメ/漫画やゲームが好き。</li>
      </ul>
    </section>
  );
};

export { ProfileMain };
