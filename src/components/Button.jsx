import React from "react";

const Button = ({ width, title ,handleClick}) => {
  return (
    <button
      onClick={handleClick}
    className={`${width} text-white font-semibold bg-amber-500 py-2 rounded-lg hover:bg-amber-400 cursor-pointer hover:scale-105`}
    >
      {title}
    </button>
  );
};

export default Button;
