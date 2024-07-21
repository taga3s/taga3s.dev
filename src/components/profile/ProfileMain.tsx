import { Content, Content_Belonging, Content_Box, Content_MyImg, Content_Name, Introduction } from "./ProfileMain.css";

const ProfileMain = () => {
  return (
    <div>
      <div class={Content}>
        <div class={Content_Box}>
          <span class={Content_Name}>Seiya Tagami / taga3s</span>
          <ul class={Content_Belonging}>
            <li>早稲田大学法学部3年</li>
            <li>Web Developer (Long-term internship)</li>
          </ul>
        </div>
        <div>
          <img class={Content_MyImg} src="https://github.com/ayanami77.png" alt="my profile" />
        </div>
      </div>
      <ul class={Introduction}>
        <li>🛠️ 趣味やインターンでコードを書いています！</li>
        <li>🐳 Web、法律、ラーメンと...？</li>
        <li>🤖 アニメ/漫画やゲームも好きです。</li>
      </ul>
    </div>
  );
};

export { ProfileMain };
