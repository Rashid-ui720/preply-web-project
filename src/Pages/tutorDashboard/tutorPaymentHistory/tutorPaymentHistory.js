import React from "react";

import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorPaymentHistory } from "../../../Redux/Actions/tutorPaymentHistoryActions";
import { BaseUrl } from "../../../utils/api_routes";
class TutorPaymnetHistory extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
  };

  getFormatedDate = (date) => {
    let NewDate = date.split("T");
    return NewDate[0];
  };
  componentDidMount() {
    this.props.getTutorPaymentHistory(
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
    if (this.props.tutorPaymentHistory.data.length > 0) {
      if (value.length) {
        updatedData = this.props.tutorPaymentHistory.data.filter((item) => {
          const startsWith =
            item.student_package_history.fname
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.package.title.toLowerCase().includes(value.toLowerCase()) ||
            item.package.pp_hour.toLowerCase().includes(value.toLowerCase()) ||
            item.total_hours.toLowerCase().includes(value.toLowerCase()) ||
            item.amount.toLowerCase().includes(value.toLowerCase()) ||
            item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
            item.created_at.toLowerCase().includes(value.toLowerCase());

          const includes =
            item.student_package_history.fname
              .toLowerCase()
              .includes(value.toLowerCase()) ||
            item.package.title.toLowerCase().includes(value.toLowerCase()) ||
            item.package.pp_hour.toLowerCase().includes(value.toLowerCase()) ||
            item.total_hours.toLowerCase().includes(value.toLowerCase()) ||
            item.amount.toLowerCase().includes(value.toLowerCase()) ||
            item.payment_status.toLowerCase().includes(value.toLowerCase()) ||
            item.created_at.toLowerCase().includes(value.toLowerCase());

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
    this.props.getTutorPaymentHistory(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };
  render() {
    const {
      tutorPaymentHistory,
      tutorPaymentHistoryError,
      tutorPaymentHistoryLoader,
      currency,
      curency_rate,
    } = this.props;
    if (tutorPaymentHistoryLoader && tutorPaymentHistory?.length == 0) {
      return <DashboardLoader />;
    }

    if (tutorPaymentHistoryError !== null) {
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
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              <DataTableAdvance
                type="Packages History"
                columns={[
                  {
                    name: "Student Name",
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
                              row.student_package_history.user_img == null
                                ? `image/l3/png/userAvtar.webp`
                                : `${BaseUrl}/UserProfile/Images/${row.student_package_history.user_img}`
                            }
                            alt="Profile img"
                          />
                        </div>
                        <h4 className="font-size-4 mb-0 text-truncate font-weight-semibold text-black-2">
                          {row.student_package_history.fname}
                        </h4>
                      </a>
                    ),
                  },
                  {
                    name: "Package Name",
                    selector: "package.title",
                    sortable: true,
                    minWidth: "180px",
                    cell: (row) => {
                      return (
                        <div className="text-truncate  overflow-hidden">
                          {row.package.title}
                        </div>
                      );
                    },
                  },
                  {
                    name: "Price/hour",
                    sortable: true,
                    minWidth: "40px",
                    selector: "package.pp_hour",
                    cell: (row) => {
                      return (
                        <div>
                          {row.package.pp_hour !== ""
                            ? currency == "GBP"
                              ? "£ " + row.package.pp_hour
                              : "$ " +
                                parseInt(
                                  curency_rate * parseInt(row.package.pp_hour)
                                )
                            : ""}
                        </div>
                      );
                    },
                  },
                  {
                    name: "Total Hours",
                    selector: "total_hours",
                    sortable: true,

                    minWidth: "40px",
                  },
                  {
                    name: "Amount",
                    selector: "amount",
                    sortable: true,
                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <div>
                          {row.amount !== ""
                            ? currency == "GBP"
                              ? "£ " + row.amount
                              : "$ " +
                                parseInt(row.total_hours) *
                                  parseInt(
                                    parseInt(row.package.pp_hour) * curency_rate
                                  )
                            : ""}
                        </div>
                      );
                    },
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
                            row.payment_status !== "Paid"
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
                    name: "Date",
                    selector: "created_at",
                    sortable: true,
                    minWidth: "40px",
                    cell: (row) => {
                      return <div>{this.getFormatedDate(row.created_at)}</div>;
                    },
                  },
                ]}
                fileName={"Paymnet History"}
                defaultSortAsc={false}
                // defaultSortField={"created_at"}
                noDataMessage={"No packages purchased yet"}
                data={tutorPaymentHistory.data}
                current_page={tutorPaymentHistory.current_page}
                totalPages={tutorPaymentHistory.last_page}
                per_page={tutorPaymentHistory.per_page}
                changePage={this.ChnageLessonListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Payment History"}
                loader={tutorPaymentHistoryLoader}
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
    tutorPaymentHistory: state.tutorPaymentHistory.tutorPaymentHistory,
    tutorPaymentHistoryError:
      state.tutorPaymentHistory.tutorPaymentHistoryError,
    tutorPaymentHistoryLoader:
      state.tutorPaymentHistory.tutorPaymentHistoryLoader,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorPaymentHistory: (user_id, pageNumber) =>
      dispatch(getTutorPaymentHistory(user_id, pageNumber)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorPaymnetHistory);
