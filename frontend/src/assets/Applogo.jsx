import * as React from "react";

const SvgIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 200 200"
  >
    <circle cx="100" cy="100" r="90" fill="#7C3AED" opacity="0.5"></circle>
    <path
      fill="#7C3AED"
      d="M40 100a60 60 0 0 1 120 0q-30 50-60 50t-60-50"
    ></path>
    <path
      fill="#7C3AED"
      d="M70 40a5 5 0 0 1 0 10 5 5 0 0 1 0-10M130 40a5 5 0 0 1 0 10 5 5 0 0 1 0-10"
    ></path>
    <path
      fill="#fff"
      d="m100 70 5 15h15l-10 10 5 15-15-10-15 10 5-15-10-10h15Z"
    ></path>
  </svg>
);

export default SvgIcon;
