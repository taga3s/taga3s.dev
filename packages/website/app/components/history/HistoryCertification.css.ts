import { css } from "hono/css";

const certificationList = css`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 32px;
`;

const certificationListItem = css`
  display: flex;
  gap: 16px;

  a {
    color: #0969da;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export { certificationList, certificationListItem };
