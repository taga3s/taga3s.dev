import { CosenseIcon, GitHubIcon, QiitaIcon } from "../icons";
import { Section } from "../Section";
import { cosense, github, linkCardContainer, linkCardIcon, qiita } from "./ProfileLinks.css";

const links = [
  {
    title: "GitHub",
    url: "https://github.com/taga3s",
    style: github,
    icon: <GitHubIcon />,
  },
  {
    title: "Cosense",
    url: "https://scrapbox.io/t33s-dev/",
    style: cosense,
    icon: <CosenseIcon />,
  },
  {
    title: "Qiita",
    url: "https://qiita.com/t33s_dev",
    style: qiita,
    icon: <QiitaIcon />,
  },
];

const ProfileLinks = () => {
  return (
    <Section title="Links">
      <div class={linkCardContainer}>
        {links.map((link) => (
          <a href={link.url} class={link.style} key={link.title}>
            <div class={linkCardIcon}>{link.icon}</div>
          </a>
        ))}
      </div>
    </Section>
  );
};

export { ProfileLinks };
