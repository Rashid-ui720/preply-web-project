import React from "react";

import DataTableAdvance from "../../../components/dataTableAdvance";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorPayouts } from "../../../Redux/Actions/tutorPayoutActions";
import { BaseUrl } from "../../../utils/api_routes";
import TutorPayoutCards from "../../../components/tutorPayoutCards";
class TutorPayouts extends React.Component {
  state = {
    searchValue: "",
    filteredData: [],
  };

  getFormatedDate = (date) => {
    let NewDate = date.split("T");
    return NewDate[0];
  };
  componentDidMount() {
    this.props.getTutorPayouts(
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
    if (this.props.tutorPayout.payout.data.length > 0) {
      if (value.length) {
        updatedData = this.props.tutorPayout.payout.data.filter((item) => {
          if (item.payment_method !== null) {
            const startsWith =
              item.payment_method.toLowerCase().includes(value.toLowerCase()) ||
              item.payoutdate.toLowerCase().includes(value.toLowerCase()) ||
              item.pay_total.toLowerCase().includes(value.toLowerCase());

            const includes =
              item.payment_method.toLowerCase().includes(value.toLowerCase()) ||
              item.payoutdate.toLowerCase().includes(value.toLowerCase()) ||
              item.pay_total.toLowerCase().includes(value.toLowerCase());

            if (startsWith) {
              return startsWith;
            } else if (!startsWith && includes) {
              return includes;
            } else return null;
          }
        });

        this.setState({ filteredData: updatedData });
        this.setState({ searchValue: value });
      }
    }
  };

  ChnageLessonListPage = (pageNo) => {
    this.props.getTutorPayouts(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };
  render() {
    const {
      tutorPayout,
      tutorPayoutError,
      tutorPayoutLoader,
      currency,
      curency_rate,
    } = this.props;
    if (tutorPayoutLoader && JSON.stringify(tutorPayout) == "{}") {
      return <DashboardLoader />;
    }

    if (tutorPayoutError !== null) {
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
          <TutorPayoutCards
            revenue={tutorPayout.revenue}
            completedpayout={tutorPayout.completedpayout}
            pending={tutorPayout.pending}
          />
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              <DataTableAdvance
                type="Packages History"
                columns={[
                  {
                    name: "Payment Method",
                    selector: "payment_method",
                    sortable: true,

                    minWidth: "220px",
                    cell: (row) => {
                      return (
                        <div className="text-truncate  overflow-hidden">
                          {row.payment_method == null
                            ? "Bank Transfer"
                            : row.payment_method}
                        </div>
                      );
                    },
                    // cell: (row) => (
                    //   <a
                    //     href="#"
                    //     className="media  text-truncate align-items-center overflow-hidden"
                    //   >
                    //     <div className="circle-36 mr-4">
                    //       <img
                    //         className="profile-image"
                    //         src={
                    //           row.student_package_history.user_img == null
                    //             ? `image/l3/png/userAvtar.webp`
                    //             : `${BaseUrl}/UserProfile/Images/${row.student_package_history.user_img}`
                    //         }
                    //         alt="Profile img"
                    //       />
                    //     </div>
                    //     <h4 className="font-size-4 mb-0 text-truncate font-weight-semibold text-black-2">
                    //       {row.student_package_history.fname}
                    //     </h4>
                    //   </a>
                    // ),
                  },
                  {
                    name: "Payout Date",
                    selector: "payoutdate",
                    sortable: true,
                    minWidth: "180px",
                    cell: (row) => {
                      return (
                        <div className="text-truncate  overflow-hidden">
                          {row.payoutdate}
                        </div>
                      );
                    },
                  },
                  {
                    name: "Amount",
                    sortable: true,
                    minWidth: "40px",
                    selector: "pay_total",
                    cell: (row) => {
                      return (
                        <div>
                          {row.pay_total !== ""
                            ? currency == "GBP"
                              ? "£ " + row.pay_total
                              : "$ " +
                                parseInt(curency_rate * parseInt(row.pay_total))
                            : ""}
                        </div>
                      );
                    },
                  },

                  {
                    name: "Status",
                    selector: "status",
                    sortable: true,

                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <span
                          className={`badge pt-1 pb-1 pl-3 pr-3  ${
                            row.status !== "1"
                              ? "badge-warning"
                              : "badge-primary"
                          }`}
                        >
                          {row.status == 1 ? "Paid" : "Pending"}
                        </span>
                      );
                    },
                  },
                  {
                    name: "Attachment",
                    selector: "Attachment",
                    sortable: true,

                    minWidth: "40px",
                    cell: (row) => {
                      return (
                        <div className="d-flex justify-content-center align-items-center">
                          {row.attachment !== null && row.attachment !== "" ? (
                            <>
                              <p
                                className="font-size-2 mb-0"
                                style={{
                                  maxWidth: "100px",
                                  maxHeight: "10px",
                                  textOverflow: "ellipsis",
                                  overflow: "hidden",
                                }}
                              >
                                {row.attachment}
                              </p>
                              <a
                                href={`${tutorPayout.imageendpoint}${row.attachment}`}
                                download
                                target={"_blank"}
                              >
                                <i className="fa fa-file-download text-primary font-size-6"></i>
                              </a>
                            </>
                          ) : null}
                        </div>
                      );
                    },
                  },
                ]}
                fileName={"Payouts"}
                defaultSortAsc={false}
                // defaultSortField={"created_at"}
                noDataMessage={"No Payouts data found....!"}
                data={tutorPayout.payout.data}
                current_page={tutorPayout.payout.current_page}
                totalPages={tutorPayout.payout.last_page}
                per_page={tutorPayout.payout.per_page}
                changePage={this.ChnageLessonListPage}
                handleFilter={this.handleFilter}
                searchValue={this.state.searchValue}
                filteredData={this.state.filteredData}
                title={"Payouts"}
                loader={tutorPayoutLoader}
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
    tutorPayout: state.tutorPayout.tutorPayout,
    tutorPayoutError: state.tutorPayout.tutorPayoutError,
    tutorPayoutLoader: state.tutorPayout.tutorPayoutLoader,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorPayouts: (user_id, pageNumber) =>
      dispatch(getTutorPayouts(user_id, pageNumber)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorPayouts);
