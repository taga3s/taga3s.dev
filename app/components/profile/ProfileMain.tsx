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
        <li>🛠️ 趣味やインターンでコードを書いています。</li>
        <li>🐳 Web、法律、ラーメンと...</li>
        <li>🤖 アニメ/漫画やゲームが好きです。</li>
      </ul>
    </section>
  );
};

export { ProfileMain };
