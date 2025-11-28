import React from "react";
import ReactDOM from "react-dom";

const MODAL_STYLES = {
  position: "fixed",
  top: "50%",
  left: "50%",
  backgroundColor: "rgb(255, 255, 255)",
  transform: "translate(-50%, -50%)",
  zIndex: 1001,
  height: "90%",
  width: "90%",
  padding: "20px",
  overflow: "visible",
  boxSizing: "border-box",
  
};

const BLURRED_OVERLAY_STYLES = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  backdropFilter: "blur(4px)",
  backgroundColor: "rgba(0, 0, 0, 0.6)",
};

const CLOSE_BUTTON_STYLES = {
  position: "absolute",
  top: "-18px",
  right: "15px",
  backgroundColor: "black",
  cursor: "pointer",
  color: "white",
  padding: "2px 12px",
  borderRadius: "50%",
  outline: "none",
  border: "none",
};

export default function Modal({ children, onClose }) {
  return ReactDOM.createPortal(
    <>
      <div style={BLURRED_OVERLAY_STYLES} onClick={onClose} />
      <div style={MODAL_STYLES}>
        <button
          className="btn bg-danger fs-4"
          style={CLOSE_BUTTON_STYLES}
          onClick={onClose}
        >
          X
        </button>
        {children}
      </div>
    </>,
    document.getElementById("cart-root")
  );
}
