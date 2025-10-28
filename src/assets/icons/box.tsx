import type { SVGProps } from "react";

const BoxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <rect x={4} y={4} width={16} height={16} rx={4} ry={4} /> 
  </svg>
);

export default BoxIcon;
