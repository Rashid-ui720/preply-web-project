import React from "react";

export const ToastContent = (message) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",

        alignItems: "center",
      }}
    >
      <div>
        {/* <img
          src="../../app-assets/images/logo/vuexy-logo.png"
          alt="APP logo"
          style={{ height: "2rem" }}
        ></img> */}
      </div>
      <div style={{ marginLeft: "10px" }}>{message} </div>
    </div>
  );
};
