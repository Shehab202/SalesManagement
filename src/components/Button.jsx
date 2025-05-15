import React from "react";

const Button = ({ width, title }) => {
  return (
    <button
      className={`${width} text-slate-900 font-semibold bg-amber-600 py-2 rounded-lg hover:bg-amber-500 cursor-pointer hover:scale-105`}
    >
      {title}
    </button>
  );
};

export default Button;
