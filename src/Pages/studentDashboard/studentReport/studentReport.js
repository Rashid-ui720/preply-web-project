import React from "react";
import { Link } from "react-router-dom";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getStudentReport } from "../../../Redux/Actions/studetnReportAction";
import { BaseUrl } from "../../../utils/api_routes";
import Rating from "react-rating";
class StudentReport extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
  };

  componentDidMount() {
    this.props.getStudentReport(
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
    if (this.props.studentReports.data.length > 0) {
      if (value.length) {
        updatedData = this.props.studentReports.data.filter((item) => {
          const startsWith =
            item.appointment_status
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
            item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
            item.user_instructor.fname
              .toLowerCase()
              .includes(value.toLowerCase());

          const includes =
            item.appointment_status
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
            item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
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
    this.props.getStudentReport(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };

  render() {
    const { studentReports, studentReportsError, studentReportsLoader } =
      this.props;
    if (studentReportsLoader && studentReports?.length == 0) {
      return <DashboardLoader type={"student"} page={"settings"} />;
    }

    if (studentReportsError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
          type={"student"}
          page={"settings"}
        />
      );
    }
    return (
      <div className="" id="dashboard-body">
        <div className="">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11 mb-10">
            <div className="table-responsive ">
              <DataTableAdvance
                type="Trail Lessons"
                columns={[
                  {
                    name: "Tutor Name",
                    selector: "name",
                    sortable: true,

                    cell: (row) => (
                      <a
                        href="#"
                        className="media  text-truncate align-items-center overflow-hidden"
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
                          />
                        </div>
                        <h4 className="font-size-4 mb-0 text-truncate font-weight-semibold text-black-2">
                          {row.user_instructor.fname}
                        </h4>
                      </a>
                    ),
                  },

                  {
                    name: "Lesson date/time",
                    selector: "booked_date",
                    sortable: true,
                    maxWidth: "180px",
                    cell: (row) => {
                      return (
                        <div className="font-size-2">
                          {" "}
                          {row.booked_date}/ {row.time_slot}
                        </div>
                      );
                    },
                  },

                  {
                    name: "Review date/time",
                    selector: "time_slot",
                    sortable: true,
                    maxWidth: "180px",
                    cell: (row) => {
                      return (
                        <div className="font-size-2">
                          {
                            row.instructor_posted_review.created_at.split(
                              "T"
                            )[0]
                          }
                          /{" "}
                          {
                            row.instructor_posted_review.created_at
                              .split("T")[1]
                              .split(".")[0]
                          }
                        </div>
                      );
                    },
                  },
                  {
                    name: "Status",
                    selector: "appointment_status",
                    sortable: true,

                    maxWidth: "60px",

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
                    name: "Behaviour",
                    sortable: true,
                    maxWidth: "100px",
                    cell: (row) => {
                      return (
                        <div>
                          {" "}
                          <Rating
                            emptySymbol={
                              <i className="fas fa-star font-size-2 empty-rating-star"></i>
                            }
                            fullSymbol={
                              <i className="fas fa-star font-size-2  fill-rating-star"></i>
                            }
                            readonly
                            initialRating={parseInt(
                              row.instructor_posted_review.behaviour_rating
                            )}
                          />
                        </div>
                      );
                    },
                  },
                  {
                    name: "Attention",
                    sortable: true,
                    maxWidth: "100px",
                    cell: (row) => {
                      return (
                        <div>
                          <Rating
                            emptySymbol={
                              <i className="fas fa-star font-size-2 empty-rating-star"></i>
                            }
                            fullSymbol={
                              <i className="fas fa-star font-size-2  fill-rating-star"></i>
                            }
                            readonly
                            initialRating={parseInt(
                              row.instructor_posted_review.attention_rating
                            )}
                          />
                        </div>
                      );
                    },
                  },
                  {
                    name: "Progress",
                    sortable: true,
                    maxWidth: "100px",
                    cell: (row) => {
                      return (
                        <div>
                          {" "}
                          <Rating
                            emptySymbol={
                              <i className="fas fa-star font-size-2 empty-rating-star"></i>
                            }
                            fullSymbol={
                              <i className="fas fa-star  font-size-2 fill-rating-star"></i>
                            }
                            readonly
                            initialRating={parseInt(
                              row.instructor_posted_review.progress_rating
                            )}
                          />
                        </div>
                      );
                    },
                  },
                ]}
                fileName={"My Report"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                noDataMessage={"No Report found"}
                data={studentReports.data}
                current_page={studentReports.current_page}
                totalPages={studentReports.last_page}
                per_page={studentReports.per_page}
                changePage={this.ChnageLessonListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Student Report"}
                loader={studentReportsLoader}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    studentReports: state.studentReports.studentReports,
    studentReportsError: state.studentReports.studentReportsError,
    studentReportsLoader: state.studentReports.studentReportsLoader,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getStudentReport: (user_id, pageNumber) =>
      dispatch(getStudentReport(user_id, pageNumber)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentReport);
