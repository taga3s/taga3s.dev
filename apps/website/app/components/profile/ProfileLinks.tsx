import { JSX } from "hono/jsx/jsx-runtime";
import { CosenseIcon, GitHubIcon, ZennIcon } from "../icons";
import { Section } from "../Section";
import { cosense, github, profileLinkCardContainer, profileLinkCardIcon, zenn } from "./ProfileLinks.css";

interface Link {
  title: string;
  url: string;
  style: Promise<string>;
  icon: JSX.Element;
}

const links: Link[] = [
  {
    title: "GitHub",
    url: "https://github.com/taga3s",
    style: github,
    icon: <GitHubIcon />,
  },
  {
    title: "Zenn",
    url: "https://zenn.dev/mameshiba_274",
    style: zenn,
    icon: <ZennIcon />,
  },
  {
    title: "Cosense",
    url: "https://scrapbox.io/taga3s-memo/",
    style: cosense,
    icon: <CosenseIcon />,
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
