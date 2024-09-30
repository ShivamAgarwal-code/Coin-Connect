import React, { useState } from "react";

const Tablist = ({ handleTablistSelect }) => {
  const [activeTab, setActiveTab] = useState("Popular");

  const handleTabClick = (text) => {
    setActiveTab(text);
    handleTablistSelect(text);
  };

  return (
    <div className="px-8 mx-7 text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px">
        {[
          { text: "For you" },
          { text: "Popular" },
          { text: "Trending" },
          { text: "Interesting" },
        ].map(({ text }) => (
          <li className="mr-2" key={text}>
            <p
              className={`inline-block p-4 border-b-4 cursor-pointer rounded-t-lg hover:text-gray-600 hover:border-blue-500 font-bold ${
                activeTab === text
                  ? "text-blue-600 border-blue-500"
                  : "text-gray-500 border-transparent"
              }`}
              onClick={() => handleTabClick(text)}
            >
              {text}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tablist;
