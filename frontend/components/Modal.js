import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import EditProfile from "./EditProfile";
import { GiCancel } from "react-icons/gi";

export const Modal = ({ children = <></>, open, onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!open) return null;

  const modelContent = open ? (
    <div className="modal-overlay">
      <div className="modal-content-profile">
        {children}
        <button onClick={onClose} className=" ">
          <GiCancel />
        </button>
        <EditProfile />
      </div>
    </div>
  ) : null;

  if (mounted) {
    return ReactDOM.createPortal(
      modelContent,
      document.getElementById("portal")
    );
  } else {
    return null;
  }
};
