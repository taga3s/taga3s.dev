import { css } from "hono/css";

const profileLinkCardContainer = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 16px;

  @media screen and (min-width:600px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const profileLinkCard = css`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 20px;
  border-radius: 8px;
  font-weight: bold;
  color: #ffffff;
`;

const profileLinkCardIcon = css`
  width: 48px;
  height: 48px;
`;

const github = css`
  ${profileLinkCard}
  fill: #ffffff;
  background: rgb(205,188,255);
  background: linear-gradient(90deg, rgba(205,188,255,0.4515931372549019) -27%, rgba(92,80,118,1) 0%, rgba(116,84,205,1) 0%, rgba(118,83,196,1) 0%, rgba(129,92,200,1) 0%, rgba(46,47,62,0.9137780112044818) 0%, rgba(198,195,209,0.8521533613445378) 100%, rgba(230,14,221,1) 100%, rgba(237,235,246,1) 100%, rgba(0,0,82,1) 100%, rgba(3,1,9,0.4515931372549019) 100%);
`;

const qiita = css`
  ${profileLinkCard}
  background: rgb(205,188,255);
  background: linear-gradient(90deg, rgba(205,188,255,0.4515931372549019) -27%, rgba(92,80,118,1) 0%, rgba(116,84,205,1) 0%, rgba(118,83,196,1) 0%, rgba(92,200,121,1) 0%, rgba(25,230,34,0.4515931372549019) 100%, rgba(106,217,191,0.9249824929971989) 100%, rgba(198,195,209,0.8521533613445378) 100%, rgba(230,14,221,1) 100%, rgba(237,235,246,1) 100%, rgba(0,0,82,1) 100%);
`;

const cosense = css`
  ${profileLinkCard}
  background: rgb(2,0,36);
  background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(208,108,7,1) 0%, rgba(194,156,24,1) 0%, rgba(187,180,32,1) 40%, rgba(0,212,255,1) 100%);
`;

export { profileLinkCard, profileLinkCardIcon, profileLinkCardContainer, github, qiita, cosense };
