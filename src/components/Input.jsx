import React from "react";

const Input = ({ type, setValue,placeholder,value ,width}) => {
  return (
    <>
      <input
        type={type}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={placeholder}
        className={`${width} font-medium border border-slate-600 rounded-lg py-1 outline-0  focus:border-amber-500
        bg-slate-800  focus:bg-slate-700 text-left text-slate-950 px-3 focus:scale-105`}
      />
    </>
  );
};

export default Input;
