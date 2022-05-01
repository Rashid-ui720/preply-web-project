import React from "react";
import { Link } from "react-router-dom";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getStudentAvaialableTutorList } from "../../../Redux/Actions/studentAvailableTutorListActions";
import { BaseUrl } from "../../../utils/api_routes";

class StudentAvailableTutorList extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
  };

  componentDidMount() {
    this.props.getStudentAvaialableTutorList(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      1
    );
  }

  // ** Function to handle filter
  handleFilter = (e) => {
    const value = e.target.value;

    // let updatedData = [];
    // this.setState({ searchValue: value });
    // if (this.props.studenLessons.data.length > 0) {
    //   if (value.length) {
    //     updatedData = this.props.studentLessons.data.filter((item) => {
    //       const startsWith =
    //         item.appointment_status
    //           .toLowerCase()
    //           .includes(value.toLowerCase()) ||
    //         item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
    //         item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
    //         item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
    //         item.price.toLowerCase().includes(value.toLowerCase()) ||
    //         item.timezone.toLowerCase().includes(value.toLowerCase()) ||
    //         item.user_instructor.fname
    //           .toLowerCase()
    //           .includes(value.toLowerCase());

    //       const includes =
    //         item.appointment_status
    //           .toLowerCase()
    //           .includes(value.toLowerCase()) ||
    //         item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
    //         item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
    //         item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
    //         item.price.toLowerCase().includes(value.toLowerCase()) ||
    //         item.timezone.toLowerCase().includes(value.toLowerCase()) ||
    //         item.user_instructor.fname
    //           .toLowerCase()
    //           .includes(value.toLowerCase()) ||
    //         item.user_student.fname
    //           .toLowerCase()
    //           .startsWith(value.toLowerCase());

    //       if (startsWith) {
    //         return startsWith;
    //       } else if (!startsWith && includes) {
    //         return includes;
    //       } else return null;
    //     });

    //     this.setState({ filteredData: updatedData });
    //     this.setState({ searchValue: value });
    //   }
    // }
  };

  ChnageListPage = (pageNo) => {
    this.props.getStudentAvaialableTutorList(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };

  render() {
    const {
      studentAvailableTutorList,
      studentAvailableTutorListError,
      studentAvailableTutorListLoader,
    } = this.props;
    if (
      studentAvailableTutorListLoader &&
      studentAvailableTutorList?.length == 0
    ) {
      return <DashboardLoader type={"student"} />;
    }

    if (studentAvailableTutorListError !== null) {
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
        className="student-dashboard-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="student-dashboard-content">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              <DataTableAdvance
                type="Trail Lessons"
                columns={[
                  {
                    name: "Tutor Name",
                    selector: "name",
                    sortable: true,

                    minWidth: "220px",
                    cell: (row) => (
                      <a
                        href="#"
                        className="media  text-truncate align-items-center overflow-hidden"
                      >
                        <div className="circle-36 mr-4">
                          <img
                            className="profile-image"
                            src={
                              row.user_img == null
                                ? `image/l3/png/userAvtar.webp`
                                : `${BaseUrl}/UserProfile/Images/${row.user_img}`
                            }
                            alt="Profile img"
                          />
                        </div>
                        <h4 className="font-size-4 mb-0 text-truncate font-weight-semibold text-black-2">
                          {row.fname}
                        </h4>
                      </a>
                    ),
                  },

                  {
                    name: "Total Hours Purchased",
                    selector: "purchasecredits",
                    sortable: true,
                    minWidth: "90px",
                  },
                  {
                    name: "Total Hours Used",
                    selector: "spendcredits",
                    sortable: true,

                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <div>
                          {parseFloat(row.spendcredits)}
                        </div>
                      );
                    },
                  },
                  {
                    name: "Total Hours Remaining",
                    selector: "spendcredits",
                    sortable: true,
                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <div>
                          {parseFloat(row.purchasecredits) -
                            parseFloat(row.spendcredits)}
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
                                localRoutes.student_dashboard_schedual_lesson,
                              search: new Buffer(`&query=${true}&tutor_id=
                         ${row.instructor_id}`).toString("base64"),
                            }}
                            className="font-size-2 font-weight-bold  text-uppercase text-primary-2"
                          >
                            Schedual Lesson
                          </Link>
                        </div>
                      );
                    },
                  },
                ]}
                fileName={"Availabel Tutors"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                noDataMessage={"No trail Lessons found"}
                data={studentAvailableTutorList.data}
                current_page={studentAvailableTutorList.current_page}
                totalPages={studentAvailableTutorList.last_page}
                per_page={studentAvailableTutorList.per_page}
                changePage={this.ChnageListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Tutors Available for Lessons"}
                loader={studentAvailableTutorListLoader}
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
    studentAvailableTutorList:
      state.studentAvailableTutorList.studentAvailableTutorList,
    studentAvailableTutorListError:
      state.studentAvailableTutorList.studentAvailableTutorListError,
    studentAvailableTutorListLoader:
      state.studentAvailableTutorList.studentAvailableTutorListLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudentAvaialableTutorList: (user_id, pageNumber) =>
      dispatch(getStudentAvaialableTutorList(user_id, pageNumber)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentAvailableTutorList);
