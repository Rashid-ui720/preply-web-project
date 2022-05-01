import React from "react";
import TutorDashboardCards from "../../../components/tutorDashboardCards";
import CustomDataTable from "../../../components/dataTable";
import { Link } from "react-router-dom";
import { localRoutes } from "../../../utils/local_routes";
import DataTableAdvance from "../../../components/dataTableAdvance";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorDashboardData } from "../../../Redux/Actions/tutorDashboardActions";
import { BaseUrl } from "../../../utils/api_routes";
class TutorDashboard extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
  };

  componentDidMount() {
    this.props.getTutorDashboardData(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id
    );
  }

  // ** Function to handle filter
  handleFilter = (e) => {
    const value = e.target.value;

    let updatedData = [];
    this.setState({ searchValue: value });
    if (this.props.tutorDashboardData.recent_trail_appointments.length > 0) {
      if (value.length) {
        updatedData =
          this.props.tutorDashboardData.recent_trail_appointments.filter(
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
                item.user_student.fname
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
                item.user_student.fname
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

  render() {
    const {
      tutorDashboardData,
      tutorDashboardDataError,
      tutorDashboardDataLoader,
      currency,

      curency_rate,
    } = this.props;

    if (
      tutorDashboardDataLoader &&
      JSON.stringify(tutorDashboardData) == "{}"
    ) {
      return <DashboardLoader />;
    }
    if (tutorDashboardDataError !== null) {
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
          {/* dashboard cards */}
          <TutorDashboardCards stats={tutorDashboardData.data} />
          <div className="bg-white shadow-8 pt-7 rounded pb-8 px-11">
            <div className="table-responsive">
              {/* Data table */}
              <CustomDataTable
                type="Trail Lessons"
                columns={[
                  {
                    name: "Student Name",
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
                              row.user_student.user_img == null || row.user_student.user_img === ''
                                ? `image/l3/png/userAvtar.webp`
                                : `${BaseUrl}/UserProfile/Images/${row.user_student.user_img}`
                            }
                            alt="Image"
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
                        <div className="">
                          <a
                            href="#"
                            className="font-size-2 font-weight-bold text-green text-uppercase"
                          >
                            <i className="fa fa-comment mr-2"></i> Message
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
                data={tutorDashboardData.credit_appointments}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Recent Lessons"}
                loader={tutorDashboardDataLoader}
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
    tutorDashboardData: state.tutorDashboardData.tutorDashboardData,
    tutorDashboardDataError: state.tutorDashboardData.tutorDashboardDataError,
    tutorDashboardDataLoader: state.tutorDashboardData.tutorDashboardDataLoader,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDashboardData: (tutor_id) =>
      dispatch(getTutorDashboardData(tutor_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorDashboard);
