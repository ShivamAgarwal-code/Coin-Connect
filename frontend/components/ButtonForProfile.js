import React, { useState } from 'react';

const ButtonForProfile = () => {
  const [selectedButton, setSelectedButton] = useState('Feed');

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const getButtonClassName = (buttonName) => {
    return `text-black font-medium rounded-xl text-sm px-5 py-2.5 text-center m-2 ${
      selectedButton === buttonName ? 'bg-purple-200 text-purple-900' : ''
    }`;
  };

  return (
    <div className='mx-3'>
      <button
        type="button"
        className={getButtonClassName('Feed')}
        onClick={() => handleButtonClick('Feed')}
      >
        Feed
      </button>
      <button
        type="button"
        className={getButtonClassName('Replies')}
        onClick={() => handleButtonClick('Replies')}
      >
        Replies
      </button>
      <button
        type="button"
        className={getButtonClassName('Media')}
        onClick={() => handleButtonClick('Media')}
      >
        Media
      </button>
      <button
        type="button"
        className={getButtonClassName('Collected')}
        onClick={() => handleButtonClick('Collected')}
      >
        Collected
      </button>
      <button
        type="button"
        className={getButtonClassName('NFTs')}
        onClick={() => handleButtonClick('NFTs')}
      >
        NFTs
      </button>
    </div>
  );
};

export default ButtonForProfile;
