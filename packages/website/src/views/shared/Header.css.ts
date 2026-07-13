import { css } from "hono/css";

const headerContent = css`
  padding: 8px 20px;
  display: flex;
  justify-content: end;
`;

const headerNav = css`
  display: flex;
  flex-direction: column;
  text-align: end;
  gap: 16px;
  font-weight: bold;
  color: #986DB2;
`;

export { headerContent, headerNav };
