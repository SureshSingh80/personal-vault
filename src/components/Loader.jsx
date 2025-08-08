import React from "react";


const Loader = () => {
  return (
    // circular spinner
    // <div className="flex justify-center items-center w-full h-screen ">
    //   <div className="w-13 h-13 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
    // </div>

    <div className="flex justify-center items-center space-x-2 w-full h-screen">
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:.2s]"></div>
      <div className="w-3 h-3 bg-gray-500 rounded-full animate-bounce [animation-delay:.4s]"></div>
    </div>

    
  );
};

export default Loader;
