import React from "react";
import { BaseUrl } from "../utils/api_routes";
import { connect } from "react-redux";
import { zoom_sdk_route } from "../utils/zoomSdk_rout";
import Rating from "react-rating";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import NetConnectionCheck from "./netConnection";
class LessonDetailModal extends React.Component {
  state = { netConnectionModal: false };
  b64EncodeUnicode = (str) => {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(
      encodeURIComponent(str).replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode("0x" + p1);
        }
      )
    );
  };

  serialize = (obj) => {
    // eslint-disable-next-line no-shadow
    var keyOrderArr = [
      "name",
      "mn",
      "email",
      "pwd",
      "role",
      "lang",
      "signature",
      "china",
    ];

    Array.intersect = function () {
      var result = new Array();
      var obj = {};
      for (var i = 0; i < arguments.length; i++) {
        for (var j = 0; j < arguments[i].length; j++) {
          var str = arguments[i][j];
          if (!obj[str]) {
            obj[str] = 1;
          } else {
            obj[str]++;
            if (obj[str] == arguments.length) {
              result.push(str);
            }
          }
        }
      }
      return result;
    };

    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, "includes", {
        enumerable: false,
        value: function (obj) {
          var newArr = this.filter(function (el) {
            return el === obj;
          });
          return newArr.length > 0;
        },
      });
    }

    var tmpInterArr = Array.intersect(keyOrderArr, Object.keys(obj));
    var sortedObj = [];
    keyOrderArr.forEach(function (key) {
      if (tmpInterArr.includes(key)) {
        sortedObj.push([key, obj[key]]);
      }
    });
    Object.keys(obj)
      .sort()
      .forEach(function (key) {
        if (!tmpInterArr.includes(key)) {
          sortedObj.push([key, obj[key]]);
        }
      });
    var tmpSortResult = (function (sortedObj) {
      var str = [];
      for (var p in sortedObj) {
        if (typeof sortedObj[p][1] !== "undefined") {
          str.push(
            encodeURIComponent(sortedObj[p][0]) +
              "=" +
              encodeURIComponent(sortedObj[p][1])
          );
        }
      }
      return str.join("&");
    })(sortedObj);
    return tmpSortResult;
  };

  getMeetingConfig = (metting) => {
    const { AuthData } = this.props;
    return {
      mn: parseInt(metting.meeting_id),
      name: this.b64EncodeUnicode(AuthData.fname),
      email: this.b64EncodeUnicode(AuthData.email),
      pwd: metting.passcode,
      role: parseInt(AuthData.role == "student" ? 0 : 1, 10),
      lang: "en-US",
      signature: "",
      china: false,
    };
  };
  // open connection modal
  openNetConnectionModal = () => {
    this.setState({ netConnectionModal: true });
  };
  // close connection modal
  closeNetConnectionModal = () => {
    this.setState({ netConnectionModal: false });
  };
  render() {
    const { SelectedLessonDetail, currency, curency_rate, AuthData } =
      this.props;

    return (
      <div>
        <button
          onClick={() => this.props.onCloseDetailModal()}
          type="button"
          className="circle-32 btn-reset  pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-white rounded-4 border border-mercury shadow-9">
          {/* <!-- Single Featured Job --> */}
          <div className="pt-9 pl-sm-9 pl-5 pr-sm-9 pr-5 pb-8 border-bottom border-width-1 border-default-color light-mode-texts">
            <div className="row">
              <div className="col-md-6">
                {/* <!-- media start --> */}
                <div className="media align-items-center">
                  {/* <!-- media logo start --> */}
                  <div className="square-72 d-block mr-8 overflow-hidden">
                    <img
                      src={
                        SelectedLessonDetail.user_student.user_img == null
                          ? `image/l3/png/userAvtar.webp`
                          : `${BaseUrl}/UserProfile/Images/${SelectedLessonDetail.user_student.user_img}`
                      }
                      alt=""
                      className="lesson-detail-user-img"
                    />
                  </div>
                  {/* <!-- media logo end --> */}
                  {/* <!-- media texts start --> */}
                  <div>
                    <h3 className="font-size-6 mb-0">
                      {SelectedLessonDetail.user_student.fname}
                    </h3>
                    <span className="font-size-3 text-gray line-height-2">
                      {SelectedLessonDetail.user_student.email}
                    </span>
                  </div>
                  {/* <!-- media texts end --> */}
                </div>
                {/* <!-- media end --> */}
              </div>
            </div>
            <div className="row pt-9">
              <div className="col-12">
                {/* <!-- card-btn-group start --> */}
                <div className="card-btn-group d-flex align-items-center">
                  {SelectedLessonDetail.meeting !== null ? (
                    SelectedLessonDetail.meeting.meeting_status !== null ? (
                      SelectedLessonDetail.meeting.meeting_status
                        .instructor_join == 1 &&
                      SelectedLessonDetail.meeting.meeting_status
                        .instructor_leave == 1 &&
                      SelectedLessonDetail.meeting.meeting_status
                        .student_join == 1 &&
                      SelectedLessonDetail.meeting.meeting_status
                        .student_leave == 1 ? (
                        <a className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5">
                          Lesson Completed{" "}
                          <i className="fa fa-check-circle ml-3"></i>
                        </a>
                      ) : (
                        <a
                          className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                          href={
                            SelectedLessonDetail.meeting == null
                              ? "#"
                              : zoom_sdk_route +
                                "?" +
                                this.serialize(
                                  this.getMeetingConfig(
                                    SelectedLessonDetail.meeting
                                  )
                                )
                          }
                          target="__blank"
                        >
                          Start Lessson
                        </a>
                      )
                    ) : (
                      <a
                        className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                        href={
                          SelectedLessonDetail.meeting == null
                            ? "#"
                            : zoom_sdk_route +
                              "?" +
                              this.serialize(
                                this.getMeetingConfig(
                                  SelectedLessonDetail.meeting
                                )
                              )
                        }
                        target="__blank"
                      >
                        Start Lessson
                      </a>
                    )
                  ) : (
                    <a
                      className="btn btn-green text-uppercase btn-medium rounded-3 w-180 mr-4 mb-5"
                      href={
                        SelectedLessonDetail.meeting == null
                          ? "#"
                          : zoom_sdk_route +
                            "?" +
                            this.serialize(
                              this.getMeetingConfig(
                                SelectedLessonDetail.meeting
                              )
                            )
                      }
                      target="__blank"
                    >
                      Start Lessson
                    </a>
                  )}
                  <p
                    className="font-size-3 text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() => this.openNetConnectionModal()}
                  >
                    Check your connection
                  </p>
                </div>
                {/* <!-- card-btn-group end --> */}
              </div>
            </div>{" "}
          </div>
          {/* <!-- End Single Featured Job --> */}
          <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
            <div className="row mb-7 pb-7 border-bottom border-width-1 border-default-color">
              <div className="col-md-4 mb-md-0 mb-6">
                <span className="font-size-4 d-block mb-4 text-gray">
                  Price
                </span>
                <div className="media justify-content-md-start">
                  {SelectedLessonDetail.payment_status == "credits" ? (
                    ""
                  ) : (
                    <div className="image mr-0">
                      <i
                        className={`fa ${
                          currency == "GBP" ? "fa-pound-sign" : "fa-dollar-sign"
                        } font-size-5 primary-icon `}
                      ></i>
                    </div>
                  )}
                  <p className="font-weight-semibold font-size-5 d-flex align-items-center text-black-2 mb-0">
                    {SelectedLessonDetail.payment_status == "credits"
                      ? ""
                      : SelectedLessonDetail.price !== ""
                      ? currency == "GBP"
                        ? SelectedLessonDetail.price
                        : parseInt(
                            curency_rate * parseInt(SelectedLessonDetail.price)
                          )
                      : ""}
                    <span
                      className={`badge pt-1 pb-1 pl-3 pr-3 ml-1  ${
                        SelectedLessonDetail.payment_status == "unpaid"
                          ? "badge-warning"
                          : "badge-primary"
                      }`}
                    >
                      {SelectedLessonDetail.payment_status == "credits"
                        ? "Paid by Credits"
                        : SelectedLessonDetail.payment_status}
                    </span>
                  </p>
                </div>
              </div>
              <div className="col-md-4 pr-lg-0 pl-lg-10 mb-md-0 mb-6">
                <span className="font-size-4 d-block mb-4 text-gray">
                  Lesson Date
                </span>
                <div className="media justify-content-md-start">
                  <div className="image mr-5">
                    <i className="fa fa-calendar font-size-5 primary-icon"></i>
                  </div>
                  <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                    {SelectedLessonDetail.booked_date}
                  </p>
                </div>
              </div>
              <div className="col-md-4 pl-lg-0">
                <span className="font-size-4 d-block mb-4 text-gray">
                  Lesson Time
                </span>
                <div className="media justify-content-md-start">
                  <div className="image mr-5">
                    <i className="fa fa-clock font-size-5 primary-icon"></i>
                  </div>
                  <p className="font-weight-semibold font-size-5 text-black-2 mb-0">
                    {SelectedLessonDetail.time_slot}{" "}
                    {SelectedLessonDetail.timezone}
                  </p>
                </div>
              </div>
            </div>
            <div className="row ">
              <div className="col-md-4 mb-lg-0 mb-10">
                <div className="">
                  <span className="font-size-4 d-block mb-4 text-gray">
                    Appointment Status
                  </span>
                  <span
                    className={`badge pt-1 pb-1 pl-3 pr-3 ${
                      SelectedLessonDetail.meeting !== null
                        ? SelectedLessonDetail.meeting.meeting_status !== null
                          ? SelectedLessonDetail.meeting.meeting_status
                              .instructor_join == 1 &&
                            SelectedLessonDetail.meeting.meeting_status
                              .instructor_leave == 1 &&
                            SelectedLessonDetail.meeting.meeting_status
                              .student_join == 1 &&
                            SelectedLessonDetail.meeting.meeting_status
                              .student_leave == 1
                            ? "badge-primary"
                            : "badge-warning"
                          : "badge-warning"
                        : "badge-warning"
                    }`}
                  >
                    {SelectedLessonDetail.meeting !== null
                      ? SelectedLessonDetail.meeting.meeting_status !== null
                        ? SelectedLessonDetail.meeting.meeting_status
                            .instructor_join == 1 &&
                          SelectedLessonDetail.meeting.meeting_status
                            .instructor_leave == 1 &&
                          SelectedLessonDetail.meeting.meeting_status
                            .student_join == 1 &&
                          SelectedLessonDetail.meeting.meeting_status
                            .student_leave == 1
                          ? "Completed"
                          : "Pending"
                        : "Pending"
                      : "Pending"}
                  </span>
                </div>
              </div>
              <div className="col-md-4 pr-lg-0 pl-lg-10 mb-lg-0 mb-8">
                <div className="">
                  <span className="font-size-4 d-block mb-4 text-gray">
                    Tutor Name
                  </span>
                  <h6 className="font-size-5 text-black-2 font-weight-semibold mb-9">
                    {SelectedLessonDetail.user_instructor.fname}
                  </h6>
                </div>
              </div>
              <div className="col-md-4 pl-lg-0">
                <div className="">
                  {SelectedLessonDetail.child_info !== "" ? (
                    <div className="">
                      <span className="font-size-4 d-block mb-4 text-gray">
                        Child Name
                      </span>
                      <h6 className="font-size-4 text-black-2 font-weight-semibold mb-9">
                        {SelectedLessonDetail?.child?.name}
                      </h6>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Internet connection check Modal */}
        <Modal
          center
          open={this.state.netConnectionModal}
          showCloseIcon={false}
          onClose={this.closeNetConnectionModal}
          classNames={{ modal: "min-width-60" }}
        >
          <NetConnectionCheck
            closeNetConnectionModal={this.closeNetConnectionModal}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};

export default connect(mapStateToProps, null)(LessonDetailModal);
