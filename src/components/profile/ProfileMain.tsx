import { css } from "hono/css";

const Layout = css`
`;

const Content = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Content_Box = css`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Content_MyImg = css`
  width: 100px;
  height: 100px;
  border-radius: 12px;
`;

const Content_Name = css`
  font-size: 28px;
  font-weight: bold;
`;

const Content_Belonging = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
`;

const Introduction = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
  font-size: 16px;
`;

const ProfileMain = () => {
  return (
    <div class={Layout}>
      <div class={Content}>
        <div class={Content_Box}>
          <span class={Content_Name}>Seiya Tagami</span>
          <ul class={Content_Belonging}>
            <li>早稲田大学法学部3年</li>
            <li>CARTA HOLDINGS (Intern)</li>
          </ul>
        </div>
        <div>
          <img class={Content_MyImg} src="https://firebasestorage.googleapis.com/v0/b/rhythmate-77cc5.appspot.com/o/profile%2Ff30e4d78-da1a-4233-bce4-0e520e100bb2%2F2024-05-15T13%3A38%3A37%2B00%3A00.png?alt=media&token=1f4adcea-e88a-4451-86b1-25f8e77cdad6" alt="私の写真" />
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
