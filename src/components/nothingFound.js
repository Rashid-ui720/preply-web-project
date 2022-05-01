import React, { Component } from "react";

class NothingFound extends Component {
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
          <i className="fa fa-file font-size-10" aria-hidden="true"></i>
          <h4
            style={{
              color: "#676565",
              padding: "1rem",
            }}
          >
            {this.props.message}
          </h4>
        </div>
      </div>
    );
  }
}

export default NothingFound;
