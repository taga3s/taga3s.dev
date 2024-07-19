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
          <img
            class={Content_MyImg}
            src="https://firebasestorage.googleapis.com/v0/b/rhythmate-77cc5.appspot.com/o/profile%2Ff30e4d78-da1a-4233-bce4-0e520e100bb2%2F2024-05-15T13%3A38%3A37%2B00%3A00.png?alt=media&token=1f4adcea-e88a-4451-86b1-25f8e77cdad6"
            alt="私の写真"
          />
        </div>
      </div>
      <ul class={Introduction}>
        <li>🛠️ 趣味やインターンでコードを書いています！</li>
        <li>🐳 Webと法律とラーメンと...</li>
        <li>🪂 アニメ・漫画好きです。</li>
      </ul>
    </div>
  );
};

export { ProfileMain };
