import React from "react";
import { Link, Redirect} from "react-router-dom";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorLessons } from "../../../Redux/Actions/tutorLessonsAction";
import { BaseUrl } from "../../../utils/api_routes";
import { zoom_sdk_route } from "../../../utils/zoomSdk_rout";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import TutorRateLessonModal from "../tutorRateLesson/tutorRateLesson";
import { TwilioService } from "../../../Redux/Actions/twilioActions";

class TutorLessons extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
    rateLessonModal: false,
    selected_student: {},
    selected_appointment_id: null,
    ChatCreated: {
      status: false,
      uniqueName: null,
    },
  };
  // Rate lesson modal handling
  opneRateLessonModal = async (selected_student, selected_appointment_id) => {
    await this.setState({
      selected_student: selected_student,
      selected_appointment_id: selected_appointment_id,
    });
    await this.setState({ rateLessonModal: true });
  };

  onCloseRateLessonModal = () => {
    this.setState({ rateLessonModal: false });
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

  componentDidMount() {
    this.props.getTutorLessons(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      1,
      this.props.navprops.query
    );
  }

  // ** Function to handle filter
  handleFilter = (e) => {
    const value = e.target.value;
    let updatedData = [];
    this.setState({ searchValue: value });
    if (this.props.tutorLessons.data.length > 0) {
      if (value.length) {
        updatedData = this.props.tutorLessons.data.filter((item) => {
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
              .includes(value.toLowerCase()) ||
            item.user_student.fname
              .toLowerCase()
              .startsWith(value.toLowerCase());

          const includes =
            item.appointment_status
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
            item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
            item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
            item.price.toLowerCase().includes(value.toLowerCase()) ||
            item.timezone.toLowerCase().includes(value.toLowerCase()) ||
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
    this.props.getTutorLessons(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo,
      this.props.navprops.query
    );
  };

  //send message to the User
  SendMessage = (row) => {
    const channel_id =
      row.user_instructor.id.toString() + "_" + row.user_student.id.toString();

    window.location.replace(
      localRoutes.tutor_dashboard_messages +
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
    const { tutorLessons, tutorLessonsError, tutorLessonsLoader } = this.props;

    if (this.state.ChatCreated.status == true) {
      return (
        <Redirect
          to={
            localRoutes.tutor_dashboard_messages +
            "?" +
            new Buffer(
              "uniqueName=" + this.state.ChatCreated.uniqueName + "&query=true"
            ).toString("base64")
          }
        />
      );
    }
    if (tutorLessonsLoader && tutorLessons?.length === 0) {
      return <DashboardLoader />;
    }

    if (tutorLessonsError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
        />
      );
    }
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11 mb-10">
            <div className="table-responsive">
              <DataTableAdvance
                type="My Lessons"
                columns={[
                  {
                    name: "Student Name",
                    selector: "name",
                    sortable: true,

                    minWidth: "160px",
                    cell: (row) => (
                      <a
                        href="#"
                        className="media  text-truncate  align-items-center "
                      >
                        <div className="circle-36 mr-4">
                          <img
                            className="profile-image"
                            src={
                              row.user_student.user_img == null
                                ? `image/l3/png/userAvtar.webp`
                                : `${BaseUrl}/UserProfile/Images/${row.user_student.user_img}`
                            }
                            alt="Profile img"
                            style={{ objectFit: "cover" }}
                            onError={(e)=>{e.target.onerror = null; e.target.src="image/l3/png/userAvtar.webp"}}
                          />
                        </div>
                        <h4 className="font-size-4 mb-0 text-truncate font-weight-semibold text-black-2">
                          {row.user_student.fname}
                        </h4>
                      </a>
                    ),
                  },

                  {
                    name: "Date",
                    selector: "booked_date",
                    sortable: true,
                    minWidth: "50px",
                  },
                  {
                    name: "Time",
                    selector: "time_slot",
                    sortable: true,

                    minWidth: "40px",
                  },

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
                    name: "Child name",
                    selector: "appointment_name",
                    sortable: true,

                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <span>
                          <b>{row?.child?.name}</b>
                        </span>
                      );
                    },
                  },
                  {
                    name: "",
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
                                row.instructor_posted_review == null ||
                                row.instructor_posted_review.attention_rating ==
                                  null ||
                                row.instructor_posted_review.behaviour_rating ==
                                  null ||
                                row.instructor_posted_review.progress_rating ==
                                  null ? (
                                  <a
                                    onClick={() =>
                                      this.opneRateLessonModal(
                                        row.user_student,
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
                                      ? ""
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
                                    ? ""
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
                                  ? ""
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
                    cell: (row) => {
                      return (
                        <div className="">
                          <Link
                            to={{
                              pathname:
                                localRoutes.tutor_dashboard_lesson_detail,
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
                    cell: (row) => {
                      return (
                        <div className="" onClick={() => this.SendMessage(row)}>
                          <a className="font-size-2 font-weight-bold text-green text-uppercase">
                            <i className="fa fa-comment mr-2"></i> Message
                          </a>
                        </div>
                      );
                    },
                  },
                  // {
                  //   name: "",
                  //   cell: (row) => {
                  //     return (
                  //       <div className="">
                  //         <a
                  //           onClick={() =>
                  //             this.opneRateLessonModal(row.user_student, row.id)
                  //           }
                  //           className="font-size-2 font-weight-bold text-green text-uppercase"
                  //         >
                  //           <i className="fa fa-star mr-2"></i>Rate Lesson
                  //         </a>
                  //       </div>
                  //     );
                  //   },
                  // },
                ]}
                fileName={"My Lessons"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                noDataMessage={"No Lesson found"}
                data={tutorLessons.data}
                current_page={tutorLessons.current_page}
                totalPages={tutorLessons.last_page}
                per_page={tutorLessons.per_page}
                changePage={this.ChnageLessonListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"My Lessons"}
                loader={tutorLessonsLoader}
              />
            </div>
          </div>
        </div>

        {/* Rate Lessons form Modal */}
        <Modal
          center
          open={this.state.rateLessonModal}
          showCloseIcon={false}
          onClose={this.onCloseRateLessonModal}
          classNames={{ modal: "min-width-60" }}
        >
          <TutorRateLessonModal
            onCloseRateLessonModal={this.onCloseRateLessonModal}
            selected_student={this.state.selected_student}
            appointment_id={this.state.selected_appointment_id}
            getTutorLessons={() =>
              this.props.getTutorLessons(
                this.props.AuthData.id
                  ? this.props.AuthData.id
                  : this.props.AuthData.user_id,
                1,
                this.props.navprops.query
              )
            }
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
    tutorLessons: state.tutorLessons.tutorLessons,
    tutorLessonsError: state.tutorLessons.tutorLessonsError,
    tutorLessonsLoader: state.tutorLessons.tutorLessonsLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorLessons: (user_id, pageNumber , query) =>
      dispatch(getTutorLessons(user_id, pageNumber , query)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorLessons);
