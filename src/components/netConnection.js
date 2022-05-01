import React from "react";
import axios from "axios";
import { ReactInternetSpeedMeter } from "react-internet-meter";
import { api } from "../utils/api_routes";

class NetConnectionCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = { speedKbps: "", loading: true, speedStatus: "" };
  }

  //   componentDidMount() {
  //     var imageAddr = "https://picsum.photos/200";
  //     var startTime, endTime;
  //     var downloadSize = 64000;
  //     var download = new Image();
  //     startTime = new Date().getTime();
  //     download.src = imageAddr;
  //     download.onload = () => {
  //       endTime = new Date().getTime();
  //       this.showResults(endTime, startTime, downloadSize);
  //     };
  //   }

  //   showResults = (endTime, startTime, downloadSize) => {
  //     var duration =
  //       Math.round((endTime - startTime) / 1000) == 0
  //         ? 1
  //         : Math.round((endTime - startTime) / 1000);
  //     var bitsLoaded = downloadSize * 8;
  //     var speedBps = Math.round(bitsLoaded / duration);
  //     var speedKbps = parseInt(speedBps / 1024);
  //     var speedMbps = (speedKbps / 1024).toFixed(2);
  //     console.error(
  //       "speed",
  //       speedKbps,
  //       speedBps,
  //       speedMbps,
  //       duration,
  //       bitsLoaded,
  //       endTime,
  //       startTime,
  //       downloadSize
  //     );
  //     if (speedKbps >= 500) {
  //       this.setState({ speedStatus: "Good", loading: false });
  //     }
  //     if (speedKbps < 500 && speedKbps > 300) {
  //       this.setState({ speedStatus: "Normal", loading: false });
  //     }
  //     if (speedKbps <= 300) {
  //       this.setState({ speedStatus: "Bad", loading: false });
  //     }
  //   };

  showResults = (speedKbps) => {
    if (speedKbps >= 0.5) {
      this.setState({ speedStatus: "Good", loading: false });
    }
    if (speedKbps < 0.5 && speedKbps > 0.3) {
      this.setState({
        speedStatus: "Normal",
        loading: false,
      });
    }
    if (speedKbps <= 0.3) {
      this.setState({ speedStatus: "Bad", loading: false });
    }
    axios
      .post(api.net_connection_test , {
        speedStatus: this.state.speedStatus,
        appointment_id: this.props.lessonDetail.id,
        role: this.props.role
    });
  };

  render() {
    return (
      <div>
        <button
          onClick={() => this.props.closeNetConnectionModal()}
          type="button"
          className="circle-32 btn-reset  pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-white rounded-4 border border-mercury shadow-9">
          {/* <!-- Single Featured Job --> */}
          <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
            <div className="d-flex justify-content-center align-items-center flex-column">
              <h5>Connection status</h5>
              {this.state.loading == true ? (
                <div className="text-center w-100 mt-10">
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
                    Checking...
                  </h3>
                  <ReactInternetSpeedMeter
                    txtSubHeading="Internet is too slow"
                    outputType="alert"
                    customClassName={null}
                    txtMainHeading="Opps..."
                    pingInterval={4000} // milliseconds
                    thresholdUnit="megabyte" // "byte" , "kilobyte", "megabyte"
                    threshold={0}
                    imageUrl="https://picsum.photos/200"
                    downloadSize="64000" //bytes
                    // callbackFunctionOnNetworkDown={(speed) =>
                    //   console.error(`Internet speed is down ${speed}`)
                    // }
                    callbackFunctionOnNetworkTest={(speed) => {
                      let speedKbps = parseFloat(speed);
                      this.showResults(speedKbps);
                    }}
                  />
                </div>
              ) : (
                <div className="text-center w-100 mt-10">
                  <h3
                    className=" font-size-4 text-center"
                    style={{
                      marginLeft: "10px",
                      marginTop: "10px",
                    }}
                  >
                    Your connection is{" "}
                    <span
                      className={`badge pt-1 pb-1 pl-3 pr-3 ml-1   ${
                        this.state.speedStatus == "Normal"
                          ? "badge-warning"
                          : this.state.speedStatus == "Bad"
                          ? "badge-danger"
                          : "badge-primary"
                      }`}
                    >
                      {this.state.speedStatus}
                    </span>
                  </h3>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NetConnectionCheck;
