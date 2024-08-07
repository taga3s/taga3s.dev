import { css } from "hono/css";

const workExperienceList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const workExperienceDescription = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 8px;
`;

export { workExperienceList, workExperienceDescription };
