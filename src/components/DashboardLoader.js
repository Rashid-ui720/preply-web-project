import React, { Component } from "react";
class DashboardLoader extends Component {
  render() {
    return (
      <div
        className={`${
          this.props.type == "student"
            ? "student-dashboard-container"
            : "dashboard-main-container"
        } ${this.props.page == "settings" ? "" : "mt-25 mt-lg-31"}`}
        id="dashboard-body"
      >
        <div className="container loader-min-height d-flex align-items-center jusitfy-content-center ">
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
      </div>
    );
  }
}

export default DashboardLoader;
