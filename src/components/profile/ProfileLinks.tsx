import { GitHubIcon, QiitaIcon } from "../icons";
import { GitHub, Header, Layout, LinkCard_Container, Qiita } from "./ProfileLinks.css";

const links = [
  {
    title: "GitHub",
    url: "https://github.com/ayanami77",
    style: GitHub,
    icon: <GitHubIcon />,
  },
  {
    title: "Qiita",
    url: "https://qiita.com/t33s_dev",
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
          <a href={link.url} class={link.style} key={link.title}>
            <div>{link.icon}</div>
          </a>
        ))}
      </div>
    </section>
  );
};
