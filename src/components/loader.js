import React, { Component } from "react";
class Loader extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          minHeight: "6rem",
          marginBottom: "4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <div className="text-center w-100">
          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#00b074",
            }}
            role="status"
          ></div>
          <h3
            className=" font-size-4 text-center"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            Loading...
          </h3>
        </div>
      </div>
    );
  }
}

export default Loader;
