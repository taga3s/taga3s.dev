import type { FC } from "hono/jsx";

type Props = {
  viewBox: string;
  ariaLabel: string;
  pathD: string;
};

const IconBase: FC<Props> = ({ viewBox, ariaLabel, pathD }) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} width="40" height="40" role="img" aria-label={ariaLabel}>
      <path fill="#fafafa" d={pathD} />
    </svg>
  );
};

export { IconBase };
