import React from "react";

const Footer = () => {
  return (
    <footer className="first line sticky top-12 container mx-auto max-w-screen-xl ">
      <div className="first space-x-4 mt-4 break-words">
        <span className="font-semibold font-mono">© 2023 Weave </span>

        <div className="flex flex-col justify-between ">
          {" "}
          <div className="space-x-2">
            <span className="font-medium ">Terms</span>
            <span className="font-medium">Privacy</span>
            <span className="font-medium">Discord</span>
            <span className="font-medium">Donate</span>
            <span className="font-medium">Status</span>
          </div>
          <div className="space-x-2">
            <span className="font-medium">Feedback</span>
            <span className="font-medium">Thanks</span>
            <span className="font-medium">Github</span>
            <span className="font-medium">Translate</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
