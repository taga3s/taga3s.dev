import { Main, Main_Belonging, Main_Box, Main_Image, Main_Name, Introduction } from "./ProfileMain.css";

const ProfileMain = () => {
  return (
    <section>
      <div class={Main}>
        <div class={Main_Box}>
          <span class={Main_Name}>Seiya Tagami / taga3s</span>
          <ul class={Main_Belonging}>
            <li>Web Developer (working as an intern)</li>
          </ul>
        </div>
        <div>
          <img class={Main_Image} src="https://github.com/taga3s.png" alt="me" />
        </div>
      </div>
      <ul class={Introduction}>
        <li>🛠️ 趣味やインターンでコードを書いています。</li>
        <li>🐳 Web、法律、ラーメンと...</li>
        <li>🤖 アニメ/漫画やゲームが好きです。</li>
      </ul>
    </section>
  );
};

export { ProfileMain };
