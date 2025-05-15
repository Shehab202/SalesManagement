import React from "react";
import { ScaleLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-slate-900">
        <ScaleLoader color="rgb(236, 239, 241)" />
      </div>
    </>
  );
};

export default Loader;
