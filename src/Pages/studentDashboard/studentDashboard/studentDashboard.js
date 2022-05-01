import React from "react";
import StudentDashboardCards from "../../../components/studentDashboardCards";
import CustomDataTable from "../../../components/dataTable";
import { Link } from "react-router-dom";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getStudentDashboardDetail } from "../../../Redux/Actions/studentDashboardAction";
import { BaseUrl } from "../../../utils/api_routes";
import StudentBuyPackageModal from "../studentBuyPackage/studentBuyPackageModal";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

class StudentDashboard extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
    BuyPackageModal: false,
    selected_tutor_id: null,
    selected_appointment_id: null,
    rateLessonModal: false,
  };

  // buy packages modal handling
  opneBuyPackageModal = async (tutor_id) => {
    await this.setState({ selected_tutor_id: tutor_id });
    await this.setState({ BuyPackageModal: true });
  };

  onCloseBuyPackageModal = () => {
    this.setState({ BuyPackageModal: false });
  };

  // ** Function to handle filter
  handleFilter = (e) => {
    const value = e.target.value;

    let updatedData = [];
    this.setState({ searchValue: value });
    if (this.props.studentDashboard.recent_trail_appointments.length > 0) {
      if (value.length) {
        updatedData =
          this.props.studentDashboard.recent_trail_appointments.filter(
            (item) => {
              const startsWith =
                item.appointment_status
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                item.booked_date.toLowerCase().includes(value.toLowerCase()) ||
                item.payment_status
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
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
                item.payment_status
                  .toLowerCase()
                  .includes(value.toLowerCase()) ||
                item.time_slot.toLowerCase().includes(value.toLowerCase()) ||
                item.price.toLowerCase().includes(value.toLowerCase()) ||
                item.timezone.toLowerCase().includes(value.toLowerCase()) ||
                item.user_instructor.fname
                  .toLowerCase()
                  .includes(value.toLowerCase());

              if (startsWith) {
                return startsWith;
              } else if (!startsWith && includes) {
                return includes;
              } else return null;
            }
          );

        this.setState({ filteredData: updatedData });
        this.setState({ searchValue: value });
      }
    }
  };

  componentDidMount() {
    this.props.getStudentDashboardDetail(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id
    );
  }
  render() {
    const {
      studentDashboard,
      studentDashboardError,
      studentDashboardLoader,
      currency,

      curency_rate,
    } = this.props;
    if (studentDashboardLoader && JSON.stringify(studentDashboard) == "{}") {
      return <DashboardLoader type={"student"} page={"settings"} />;
    }
    if (studentDashboardError !== null) {
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
          <div className="row d-flex justify-content-end mr-3 mb-10">
            <Link
              className="btn btn-green"
              to={localRoutes.student_dashboard_available_tutors}
            >
              Book Lesson
            </Link>
          </div>
          {/* dashboard cards */}

          <StudentDashboardCards stats={studentDashboard?.data} />

          <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
            <div className="table-responsive">
              {/* Data table */}
              <CustomDataTable
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
                  {
                    name: "Price",
                    selector: "price",
                    sortable: true,

                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <div>
                          {row.price !== ""
                            ? currency == "GBP"
                              ? "£ " + row.price
                              : "$ " +
                                parseInt(curency_rate * parseInt(row.price))
                            : ""}
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
                ]}
                fileName={"Recent Lessons"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                noDataMessage={"No  Lessons found"}
                data={studentDashboard.recent_trail_appointments}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Recent Lessons"}
                loader={studentDashboardLoader}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    studentDashboard: state.StudentDashboard.studentDashboard,
    studentDashboardError: state.StudentDashboard.studentDashboardError,
    studentDashboardLoader: state.StudentDashboard.studentDashboardLoader,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudentDashboardDetail: (user_id) =>
      dispatch(getStudentDashboardDetail(user_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentDashboard);
