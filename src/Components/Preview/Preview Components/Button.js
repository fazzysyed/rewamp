import React from "react";

const Button = ({ className, title, disabled, onClick }) => {
  return (
    <div
      onClick={() => {
        if (disabled) {
          return;
        }
        onClick();
      }}
      className={className}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "#FFFFFF",
        cursor: "pointer",
        backgroundColor: disabled ? "#8E8E8E" : "#114b78",
      }}
    >
      {title}
    </div>
  );
};
export default Button;
