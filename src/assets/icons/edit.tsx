import type { SVGProps } from "react";

const EditIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <g className="check-circle-outline">
      <g fill="currentColor" fill-rule="evenodd" className="Vector" clip-rule="evenodd">
        <path fill="none" stroke="var(--light-100)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m5 16l-1 4l4-1L19.586 7.414a2 2 0 0 0 0-2.828l-.172-.172a2 2 0 0 0-2.828 0zM15 6l3 3m-5 11h8"/>
      </g>
    </g>
  </svg>
);

export default EditIcon;