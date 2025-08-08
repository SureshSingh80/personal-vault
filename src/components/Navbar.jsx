import React from "react";
import { UserButton } from "@clerk/nextjs";
import '../app/globals.css'

const Navbar = ({ setActiveKeyValue, setActiveImage, setActivePdf }) => {
  return (
    <div className="flex justify-between items-center bg-slate-800 text-white p-4 shadow-sm  gap-4  h-16 w-full fixed  z-50  ">
      <div className="flex justify-center items-center ml-4">
        {/* key value */}
        <div className=" mr-2 text-sm button-container">
          <button
            onClick={() => {
              setActiveKeyValue(true);
              setActiveImage(false);
              setActivePdf(false);
            }}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 font-bold transition-all duration-200 cursor-pointer text-sm"
          >
            KeyValue
          </button>
        </div>
         {/* image */}
        <div className=" mr-2 text-shadow-md button-container">
          <button
            onClick={() => {
              setActiveKeyValue(false);
              setActiveImage(true);
              setActivePdf(false);
            }}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 font-bold transition-all duration-200 cursor-pointer text-sm"
          >
            Image{" "}
          </button>
        </div>
         {/* pdf */}
        <div className=" mr-2 text-shadow-md button-container">
          <button
            onClick={() => {
              setActiveKeyValue(false);
              setActiveImage(false);
              setActivePdf(true);
            }}
            className="px-4 py-2 bg-slate-700 rounded-lg hover:bg-slate-600 font-bold transition-all duration-200 cursor-pointer text-sm"
          >
            Pdf
          </button>
        </div>
      </div>
      <div className="mr-4">
        <UserButton></UserButton>
      </div>
    </div>
  );
};

export default Navbar;
