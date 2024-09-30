"use client";

import React from "react";

const Button = ({ handleButtonSelect }) => {
  const buttonNames = ["All Post", "Text", "Video", "Audio", "Images"];

  return (
    <div className="my-2 mx-6">
      {buttonNames.map((buttonName) => (
        <button
          key={buttonName}
          type="button"
          className="text-white bg-purple-600 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-1.5 text-center m-2"
          onClick={() => handleButtonSelect(buttonName)}
        >
          {buttonName}
        </button>
      ))}
    </div>
  );
};

export default Button;
