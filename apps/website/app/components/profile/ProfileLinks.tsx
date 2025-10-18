import { CosenseIcon, GitHubIcon, QiitaIcon } from "../icons";
import { Section } from "../Section";
import { cosense, github, profileLinkCardContainer, profileLinkCardIcon, qiita } from "./ProfileLinks.css";

const links = [
  {
    title: "GitHub",
    url: "https://github.com/taga3s",
    style: github,
    icon: <GitHubIcon />,
  },
  {
    title: "Cosense",
    url: "https://scrapbox.io/taga3s-memo/",
    style: cosense,
    icon: <CosenseIcon />,
  },
  {
    title: "Qiita",
    url: "https://qiita.com/taga3s",
    style: qiita,
    icon: <QiitaIcon />,
  },
];

const ProfileLinks = () => {
  return (
    <Section title="🔗 links">
      <div class={profileLinkCardContainer}>
        {links.map((link) => (
          <a href={link.url} class={link.style} key={link.title}>
            <div class={profileLinkCardIcon}>{link.icon}</div>
            <span>{link.title}</span>
          </a>
        ))}
      </div>
    </Section>
  );
};

export { ProfileLinks };
