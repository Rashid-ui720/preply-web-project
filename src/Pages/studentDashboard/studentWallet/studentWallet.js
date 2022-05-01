import React from "react";
import StudentWalletHoursCards from "../../../components/StudentWalletHoursCards";
import CustomDataTable from "../../../components/dataTable";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getStudentWalletDetail } from "../../../Redux/Actions/studentWalletActions";
import { BaseUrl } from "../../../utils/api_routes";
import { Link } from "react-router-dom";
class StudentWallet extends React.Component {
  state = {};
  state = {
    searchValue: "",
    filteredData: [],
  };

  componentDidMount() {
    this.props.getStudentWalletDetail(
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
    if (this.props.studentWalletDetail.spendCreditsDetail.data.length > 0) {
      if (value.length) {
        updatedData =
          this.props.studentWalletDetail.spendCreditsDetail.data.filter(
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
                item.timezone.toLowerCase().includes(value.toLowerCase());

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
                item.timezone.toLowerCase().includes(value.toLowerCase());

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

  ChnageLessonListPage = (pageNo) => {
    this.props.getStudentWalletDetail(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };
  render() {
    const {
      studentWalletDetail,
      studentWalletDetailError,
      studentWalletDetailLoader,
    } = this.props;
    if (
      studentWalletDetailLoader &&
      JSON.stringify(studentWalletDetail) == "{}"
    ) {
      return <DashboardLoader type={"student"} page={"settings"} />;
    }

    if (studentWalletDetailError !== null) {
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

          <StudentWalletHoursCards studentWalletDetail={studentWalletDetail} />

          <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
            <div className="table-responsive">
              {/* Data table */}
              <DataTableAdvance
                type="Trail Lessons"
                columns={[
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
                    name: "Payment",
                    selector: "payment_status",
                    sortable: true,

                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <span
                          className={`badge pt-1 pb-1 pl-3 pr-3  ${
                            row.payment_status == "unpaid"
                              ? "badge-warning"
                              : "badge-primary"
                          }`}
                        >
                          {row.payment_status}
                        </span>
                      );
                    },
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
                            row.appointment_status == "pending"
                              ? "badge-warning"
                              : "badge-primary"
                          }`}
                        >
                          {row.appointment_status}
                        </span>
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
                            View Detail
                          </Link>
                        </div>
                      );
                    },
                  },
                ]}
                fileName={"Sepnded Credits"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                noDataMessage={"No credits has been spent yet"}
                data={studentWalletDetail?.spendCreditsDetail?.data}
                current_page={
                  studentWalletDetail?.spendCreditsDetail?.current_page
                }
                totalPages={studentWalletDetail?.spendCreditsDetail?.last_page}
                per_page={studentWalletDetail?.spendCreditsDetail?.per_page}
                changePage={this.ChnageLessonListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Credit spend History"}
                loader={studentWalletDetailLoader}
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
    studentWalletDetail: state.studentWalletDetail.studentWalletDetail,
    studentWalletDetailError:
      state.studentWalletDetail.studentWalletDetailError,
    studentWalletDetailLoader:
      state.studentWalletDetail.studentWalletDetailLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudentWalletDetail: (user_id, pageNumber) =>
      dispatch(getStudentWalletDetail(user_id, pageNumber)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(StudentWallet);
