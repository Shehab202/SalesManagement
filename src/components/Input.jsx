import React from "react";

const Input = ({direction, type, setValue, placeholder, value, width }) => {
  return (
    <>
      <input
      direction={direction}
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={`${width} font-medium border border-slate-600 rounded-lg py-1 outline-0  focus:border-amber-500
        bg-slate-700 ${direction?"text-left": "text-center"} focus:bg-slate-600  text-white px-3 focus:scale-105`}
      />
    </>
  );
};

export default Input;
