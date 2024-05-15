import { css } from "hono/css";
import { GitHubIcon } from "../icons/GitHub";
import { QiitaIcon } from "../icons/Qiita";

const Layout = css`
  margin-top: 48px;
`

const Header = css`
  font-size: 24px;
  font-weight: bold;
`

const LinkCard_Container = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media screen and (min-width:600px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const LinkCard = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-radius: 8px;
`;

const GitHub = css`
  ${LinkCard}
  background: rgb(205,188,255);
  background: linear-gradient(90deg, rgba(205,188,255,0.4515931372549019) -27%, rgba(92,80,118,1) 0%, rgba(116,84,205,1) 0%, rgba(118,83,196,1) 0%, rgba(129,92,200,1) 0%, rgba(46,47,62,0.9137780112044818) 0%, rgba(198,195,209,0.8521533613445378) 100%, rgba(230,14,221,1) 100%, rgba(237,235,246,1) 100%, rgba(0,0,82,1) 100%, rgba(3,1,9,0.4515931372549019) 100%);
`;

const Qiita = css`
  ${LinkCard}
  background: rgb(205,188,255);
  background: linear-gradient(90deg, rgba(205,188,255,0.4515931372549019) -27%, rgba(92,80,118,1) 0%, rgba(116,84,205,1) 0%, rgba(118,83,196,1) 0%, rgba(92,200,121,1) 0%, rgba(25,230,34,0.4515931372549019) 100%, rgba(106,217,191,0.9249824929971989) 100%, rgba(198,195,209,0.8521533613445378) 100%, rgba(230,14,221,1) 100%, rgba(237,235,246,1) 100%, rgba(0,0,82,1) 100%);
`;

const links = [
  {
    title: "GitHub",
    url: "https://github.com/ayanami77",
    style: GitHub,
    icon: <GitHubIcon />,
  },
  {
    title: "Qiita",
    url: "https://qiita.com/taga3_dev",
    style: Qiita,
    icon: <QiitaIcon />,
  },
];

export const ProfileLinks = () => {
  return (
    <section class={Layout}>
      <h2 class={Header}>My Links</h2>
      <div class={LinkCard_Container}>
        {links.map((link) => (
          <a href={link.url} class={link.style}>
            <div>{link.icon}</div>
          </a>
        ))}
      </div>
    </section>
  );
};
