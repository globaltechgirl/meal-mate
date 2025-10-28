import type { SVGProps } from "react";

const DotIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={48}
    height={48}
    viewBox="0 0 48 48"
    {...props}
  >
    <g className="board-outline">
      <g fill="currentColor" fill-rule="evenodd" className="Vector" clip-rule="evenodd">
        <path d="M24 33a9 9 0 1 0 0-18a9 9 0 0 0 0 18Z"/>
      </g>
    </g>
  </svg>
);

export default DotIcon;
