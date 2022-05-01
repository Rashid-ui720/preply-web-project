import React, { Component } from "react";

class ErrorMessage extends Component {
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
          <svg
            style={{ color: "red", marginBottom: "1rem" }}
            width="3em"
            height="3em"
            viewBox="0 0 16 16"
            className="bi bi-exclamation-octagon"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z"
            />
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
          </svg>
          <h4
            style={{
              color: "#676565",
              padding: "1rem",
            }}
          >
            {this.props.message}
          </h4>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      </div>
    );
  }
}

export default ErrorMessage;
