import React from "react";
import { Link, Redirect } from "react-router-dom";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getStudentLessons } from "../../../Redux/Actions/studentLessonsAction";
import { BaseUrl } from "../../../utils/api_routes";
import StudentBuyPackageModal from "../studentBuyPackage/studentBuyPackageModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import { zoom_sdk_route } from "../../../utils/zoomSdk_rout";
import StudentRateLessonModal from "../studentRateLesson/studentRateLesson";
import { TwilioService } from "../../../Redux/Actions/twilioActions";
import NetConnectionCheck from "../../../components/netConnection";

class StudentLessons extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
    BuyPackageModal: false,
    selected_tutor_id: null,
    selected_appointment_id: null,
    rateLessonModal: false,
    ChatCreated: {
      status: false,
      uniqueName: null,
    },
    netConnectionModal: false,
    lessonDetail: {}
  };
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

  openNetConnectionModal = () => {
    this.setState({ netConnectionModal: true });
  };
  // close connection modal
  closeNetConnectionModal = () => {
    this.setState({ netConnectionModal: false });
  };

  // buy packages modal handling
  opneBuyPackageModal = async (tutor_id) => {
    await this.setState({ selected_tutor_id: tutor_id });
    await this.setState({ BuyPackageModal: true });
  };

  onCloseBuyPackageModal = () => {
    this.setState({ BuyPackageModal: false });
  };
  // Rate lesson modal handling
  opneRateLessonModal = async (tutor_id, selected_appointment_id) => {
    await this.setState({
      selected_tutor_id: tutor_id,
      selected_appointment_id: selected_appointment_id,
    });
    await this.setState({ rateLessonModal: true });
  };

  onCloseRateLessonModal = () => {
    this.setState({ rateLessonModal: false });
  };

  componentDidMount() {
    this.props.getStudentLessons(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      1
    );
  }

  // ** Function to handle filter
  handleFilter = (e) => {
    const value = e.target.value;

    let updatedData = [];
    this.setState({ searchValue: value });
    if (this.props.studenLessons.data.length > 0) {
      if (value.length) {
        updatedData = this.props.studentLessons.data.filter((item) => {
          const startsWith =
            item.appointment_status
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
            item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
            item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
            item.price.toLowerCase().includes(value.toLowerCase()) ||
            item.timezone.toLowerCase().includes(value.toLowerCase()) ||
            item.user_instructor.fname
              .toLowerCase()
              .includes(value.toLowerCase());

          const includes =
            item.appointment_status
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
            item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
            item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
            item.price.toLowerCase().includes(value.toLowerCase()) ||
            item.timezone.toLowerCase().includes(value.toLowerCase()) ||
            item.user_instructor.fname
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.user_student.fname
              .toLowerCase()
              .startsWith(value.toLowerCase());

          if (startsWith) {
            return startsWith;
          } else if (!startsWith && includes) {
            return includes;
          } else return null;
        });

        this.setState({ filteredData: updatedData });
        this.setState({ searchValue: value });
      }
    }
  };

  ChnageLessonListPage = (pageNo) => {
    this.props.getStudentLessons(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };

  //send message to the User
  SendMessage = (row) => {
    const channel_id =
      row.user_instructor.id.toString() + "_" + row.user_student.id.toString();

    window.location.replace(
      localRoutes.student_dashboard_messages +
        "?" +
        new Buffer(
          "uniqueName=" +
            channel_id +
            "&friendlyName=" +
            row.user_instructor.fname +
            "_and_" +
            row.user_student.fname +
            "&query=true"
        ).toString("base64")
    );
  };

  render() {
    const { studentLessons, studentLessonsError, studentLessonsLoader } =
      this.props;
    if (this.state.ChatCreated.status == true) {
      return (
        <Redirect
          to={
            localRoutes.student_dashboard_messages +
            "?" +
            new Buffer(
              "uniqueName=" + this.state.ChatCreated.uniqueName + "&query=true"
            ).toString("base64")
          }
        />
      );
    }

    if (studentLessonsLoader && studentLessons?.length == 0) {
      return <DashboardLoader type={"student"} />;
    }

    if (studentLessonsError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
          type={"student"}
        />
      );
    }
    return (
      <div
        className="student-dashboard-container mt-31 mt-lg-31"
        id="dashboard-body"
      >
        <div className="student-dashboard-content">
          <div className="row d-flex justify-content-end mr-3 mb-10">
            <Link
              className="btn btn-green"
              to={localRoutes.student_dashboard_available_tutors}
            >
              Book Lesson
            </Link>
          </div>
          {studentLessons?.data?.length > 0 ? (
            <div
              className="d-flex justify-content-between w-100 mb-8 pt-6 pb-6 pl-5 pr-5"
              style={{
                backgroundColor: "rgb(253, 196, 37)",
                borderRadius: "10px",
              }}
            >
              <div className="">
                <p className="m-0  d-flex text-black font-size-3 font-weight-bold">
                  Schedule your next lesson with
                  <div className="circle-36 mr-4 ml-4">
                    <img
                      className="profile-image"
                      src={
                        studentLessons.data[0].user_instructor.user_img == null
                          ? `image/l3/png/userAvtar.webp`
                          : `${BaseUrl}/UserProfile/Images/${studentLessons.data[0].user_instructor.user_img}`
                      }
                      alt="Profile img"
                      style={{ objectFit: "cover" }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "image/l3/png/userAvtar.webp";
                      }}
                    />
                  </div>
                  {studentLessons.data[0].user_instructor.fname}
                </p>
              </div>
              <div className="">
                <a
                  onClick={() =>
                    this.opneBuyPackageModal(
                      studentLessons.data[0].user_instructor.id
                    )
                  }
                  className="font-size-2 font-weight-bold text-green text-uppercase"
                >
                  <i className="fa fa-clock mr-2"></i>Buy hours
                </a>
              </div>
            </div>
          ) : null}
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11 mb-10">
            <div className="table-responsive ">
              <DataTableAdvance
                type="Trail Lessons"
                columns={[
                  {
                    name: "Tutor Name",
                    selector: "name",
                    sortable: true,

                    minWidth: "160px",
                    cell: (row) => (
                      <a
                        href="#"
                        className="media  text-truncate align-items-center "
                      >
                        <div className="circle-36 mr-4">
                          <img
                            className="profile-image"
                            src={
                              row.user_instructor.user_img == null
                                ? `image/l3/png/userAvtar.webp`
                                : `${BaseUrl}/UserProfile/Images/${row.user_instructor.user_img}`
                            }
                            alt="Profile img"
                            style={{ objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "image/l3/png/userAvtar.webp";
                            }}
                          />
                        </div>
                        <h4 className="font-size-4 mb-0 text-truncate font-weight-semibold text-black-2">
                          {row.user_instructor.fname}
                        </h4>
                      </a>
                    ),
                  },

                  {
                    name: "Date",
                    selector: "booked_date",
                    sortable: true,
                    minWidth: "90px",
                  },
                  {
                    name: "Time",
                    selector: "time_slot",
                    sortable: true,

                    minWidth: "40px",
                  },
                  // {
                  //   name: "Payment",
                  //   selector: "payment_status",
                  //   sortable: true,

                  //   minWidth: "40px",
                  //   cell: (row) => {
                  //     return (
                  //       <span
                  //         className={`badge pt-1 pb-1 pl-3 pr-3  ${
                  //           row.payment_status === "unpaid"
                  //             ? "badge-warning"
                  //             : "badge-primary"
                  //         }`}
                  //       >
                  //         {row.payment_status}
                  //       </span>
                  //     );
                  //   },
                  // },
                  {
                    name: "Status",
                    selector: "appointment_status",
                    sortable: true,

                    minWidth: "40px",

                    cell: (row) => {
                      return (
                        <span
                          className={`badge pt-1 pb-1 pl-3 pr-3 ${
                            row.meeting !== null
                              ? row.meeting.meeting_status !== null
                                ? row.meeting.meeting_status.instructor_join ==
                                    1 &&
                                  row.meeting.meeting_status.instructor_leave ==
                                    1 &&
                                  row.meeting.meeting_status.student_join ==
                                    1 &&
                                  row.meeting.meeting_status.student_leave == 1
                                  ? "badge-primary"
                                  : "badge-warning"
                                : "badge-warning"
                              : "badge-warning"
                          }`}
                        >
                          {row.meeting !== null
                            ? row.meeting.meeting_status !== null
                              ? row.meeting.meeting_status.instructor_join ==
                                  1 &&
                                row.meeting.meeting_status.instructor_leave ==
                                  1 &&
                                row.meeting.meeting_status.student_join == 1 &&
                                row.meeting.meeting_status.student_leave == 1
                                ? "Completed"
                                : "Pending"
                              : "Pending"
                            : "Pending"}
                        </span>
                      );
                    },
                  },
                  {
                    name: "Connection",
                    selector: "connection",
                    sortable: false,

                    minWidth: "40px",

                    cell: (row) => {
                      return (
                        <span className={`badge pt-1 pb-1 pl-3 pr-3`}>
                          <p
                            className="font-size-3 text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              this.setState({ lessonDetail: row });
                              this.openNetConnectionModal();
                            }}
                          >
                            Check
                          </p>
                        </span>
                      );
                    },
                  },
                  {
                    name: "Child name",
                    selector: "appointment_child",
                    sortable: true,
                    minWidth: "40px",

                    cell: (row) => {
                      return <span>{row?.child?.name}</span>;
                    },
                  },
                  {
                    name: "",
                    minWidth: "120px",
                    cell: (row) => {
                      return (
                        <div className="">
                          {row.meeting !== null ? (
                            row.meeting.meeting_status !== null ? (
                              row.meeting.meeting_status.instructor_join == 1 &&
                              row.meeting.meeting_status.instructor_leave ==
                                1 &&
                              row.meeting.meeting_status.student_join == 1 &&
                              row.meeting.meeting_status.student_leave == 1 ? (
                                row.student_posted_review == null ||
                                row.student_posted_review.remarks == null ? (
                                  <a
                                    onClick={() =>
                                      this.opneRateLessonModal(
                                        row.user_instructor.id,
                                        row.id
                                      )
                                    }
                                    className="font-size-2 font-weight-bold text-green text-uppercase"
                                  >
                                    <i className="fa fa-star mr-2"></i>Rate
                                    Lesson
                                  </a>
                                ) : null
                              ) : (
                                <a
                                  className="font-size-2 font-weight-bold text-green text-uppercase"
                                  href={
                                    row.meeting == null
                                      ? "#"
                                      : zoom_sdk_route +
                                        "?" +
                                        this.serialize(
                                          this.getMeetingConfig(row.meeting)
                                        )
                                  }
                                  target="__blank"
                                >
                                  Start Lesson
                                </a>
                              )
                            ) : (
                              <a
                                className="font-size-2 font-weight-bold text-green text-uppercase"
                                href={
                                  row.meeting == null
                                    ? "#"
                                    : zoom_sdk_route +
                                      "?" +
                                      this.serialize(
                                        this.getMeetingConfig(row.meeting)
                                      )
                                }
                                target="__blank"
                              >
                                Start Lesson
                              </a>
                            )
                          ) : (
                            <a
                              className="font-size-2 font-weight-bold text-green text-uppercase"
                              href={
                                row.meeting == null
                                  ? "#"
                                  : zoom_sdk_route +
                                    "?" +
                                    this.serialize(
                                      this.getMeetingConfig(row.meeting)
                                    )
                              }
                              target="__blank"
                            >
                              Start Lesson
                            </a>
                          )}
                        </div>
                      );
                    },
                  },

                  {
                    name: "",
                    minWidth: "120px",
                    cell: (row) => {
                      return (
                        <div className="">
                          <Link
                            to={{
                              pathname:
                                localRoutes.student_dashboard_lessons_detail,
                              search: new Buffer(`&query=${true}&lesson_id=
                         ${row.id}`).toString("base64"),
                            }}
                            className="font-size-2 font-weight-bold text-black-2 text-uppercase"
                          >
                            <i className="fa fa-info-circle mr-2"></i>View
                            Detail
                          </Link>
                        </div>
                      );
                    },
                  },
                  {
                    name: "",
                    minWidth: "120px",
                    cell: (row) => {
                      return (
                        <div className="">
                          <a
                            onClick={() =>
                              this.opneBuyPackageModal(row.user_instructor.id)
                            }
                            className="font-size-2 font-weight-bold text-green text-uppercase"
                          >
                            <i className="fa fa-clock mr-2"></i>Buy hours
                          </a>
                        </div>
                      );
                    },
                  },
                  {
                    name: "",
                    cell: (row) => {
                      return (
                        <div className="" onClick={() => this.SendMessage(row)}>
                          <a className="font-size-2 font-weight-bold text-green text-uppercase">
                            <i className="fa fa-comment mr-2 "></i>
                            Message
                          </a>
                        </div>
                      );
                    },
                  },
                ]}
                fileName={"My Lessons"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                noDataMessage={"No trail Lessons found"}
                data={studentLessons.data}
                current_page={studentLessons.current_page}
                totalPages={studentLessons.last_page}
                per_page={studentLessons.per_page}
                changePage={this.ChnageLessonListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Lessons"}
                loader={studentLessonsLoader}
              />
            </div>
          </div>
        </div>

        {/* Buy package form Modal */}
        <Modal
          center
          open={this.state.BuyPackageModal}
          showCloseIcon={false}
          onClose={this.onCloseBuyPackageModal}
          classNames={{ modal: "min-width-60" }}
        >
          <StudentBuyPackageModal
            onCloseBuyPackageModal={this.onCloseBuyPackageModal}
            tutor_id={this.state.selected_tutor_id}
          />
        </Modal>

        {/* Rate Lessons form Modal */}
        <Modal
          center
          open={this.state.rateLessonModal}
          showCloseIcon={false}
          onClose={this.onCloseRateLessonModal}
          classNames={{ modal: "min-width-60" }}
        >
          <StudentRateLessonModal
            onCloseRateLessonModal={this.onCloseRateLessonModal}
            tutor_id={this.state.selected_tutor_id}
            appointment_id={this.state.selected_appointment_id}
            getStudentLessons={() =>
              this.props.getStudentLessons(
                this.props.AuthData.id
                  ? this.props.AuthData.id
                  : this.props.AuthData.user_id,
                1
              )
            }
          />
        </Modal>
        {/* Connection test model */}
        <Modal
          center
          open={this.state.netConnectionModal}
          showCloseIcon={false}
          onClose={this.closeNetConnectionModal}
          classNames={{ modal: "min-width-60" }}
        >
          <NetConnectionCheck
            closeNetConnectionModal={this.closeNetConnectionModal}
            lessonDetail={this.state.lessonDetail}
            role={this.props.AuthData.role}
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
    studentLessons: state.studentLessons.studentLessons,
    studentLessonsError: state.studentLessons.studentLessonsError,
    studentLessonsLoader: state.studentLessons.studentLessonsLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentLessons: (user_id, pageNumber) =>
      dispatch(getStudentLessons(user_id, pageNumber)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentLessons);
