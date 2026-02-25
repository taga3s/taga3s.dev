import { css } from "hono/css";

const profileLinkCardContainer = css`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 16px;
`;

const profileLinkCard = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 10px 20px;
  border-radius: 16px;
  font-weight: bold;
`;

const profileLinkCardIcon = css`
  width: 36px;
  height: 36px;
`;

const github = css`
  ${profileLinkCard}
  color: #ffffff;
  fill: #ffffff;
  background: rgb(205,188,255);
  background: linear-gradient(90deg, rgba(205,188,255,0.4515931372549019) -27%, rgba(92,80,118,1) 0%, rgba(116,84,205,1) 0%, rgba(118,83,196,1) 0%, rgba(129,92,200,1) 0%, rgba(46,47,62,0.9137780112044818) 0%, rgba(198,195,209,0.8521533613445378) 100%, rgba(230,14,221,1) 100%, rgba(237,235,246,1) 100%, rgba(0,0,82,1) 100%, rgba(3,1,9,0.4515931372549019) 100%);
`;

const zenn = css`
  ${profileLinkCard}
  background: #c3e1eb;
  background: linear-gradient(90deg, rgba(195, 225, 235, 1) 100%, rgba(87, 199, 133, 1) 100%, rgba(93, 201, 143, 1) 100%, rgba(118, 209, 182, 1) 100%, rgba(147, 218, 228, 1) 100%, rgba(237, 221, 83, 1) 100%, rgba(184, 214, 193, 1) 100%);
`;

const cosense = css`
  ${profileLinkCard}
  color: #ffffff;
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(208,108,7,1) 0%, rgba(194,156,24,1) 0%, rgba(187,180,32,1) 40%, rgba(0,212,255,1) 100%);
`;

export { profileLinkCard, profileLinkCardIcon, profileLinkCardContainer, github, zenn, cosense };
