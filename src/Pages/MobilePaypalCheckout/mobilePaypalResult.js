import React from "react";
class MobilePaypalCheckoutResult extends React.PureComponent {
  async componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let message = urlParams.get("message").trim();
  }

  render() {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="col-12 col-xxl-5 col-lg-5 col-md-12 mb-4 ml-auto mr-auto mt-10">
          <div className="pl-lg-5">
            {/* <!-- Top Start --> */}
            <div className="bg-white  p-10 d-flex align-items-center justify-content-center flex-column ">
              <div
                className="spinner-border"
                style={{
                  width: "2rem",
                  height: "2rem",
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
                Please Wait...
              </h3>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobilePaypalCheckoutResult;
