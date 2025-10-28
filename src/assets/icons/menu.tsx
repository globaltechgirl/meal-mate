import type { SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g className="more-verttical-outline">
      <g fill="currentColor" fill-rule="evenodd" className="Vector" clip-rule="evenodd">
        <path d="M12 6a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 8a2 2 0 1 1 0-4a2 2 0 0 1 0 4m0 8a2 2 0 1 1 0-4a2 2 0 0 1 0 4" />
      </g>
    </g>
  </svg>
);

export default MenuIcon;