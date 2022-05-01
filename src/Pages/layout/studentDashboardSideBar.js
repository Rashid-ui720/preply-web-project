import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../utils/local_routes";
import { connect } from "react-redux";
import { BaseUrl } from "../../utils/api_routes";
class StudentDashboardSideBar extends React.Component {
  state = { selectedOption: window.location.pathname };

  render() {
    const { AuthData, AuthError } = this.props;
    return (
      <React.Fragment>
        <div className="dashboard-sidebar-wrapper pt-11" id="sidebar">
          <div className="brand-logo px-11">
            <a href="https://shade.uxtheme.net/shade-pro">
              <img src="image/logo-main-black.png" alt="" />
            </a>
          </div>
          <div className="row mt-10 justify-content-center align-items-center">
            <div className="col-2">
              <img
                className="profile-image"
                src={
                  AuthData.user_img == null
                    ? `image/l3/png/userAvtar.webp`
                    : `${
                        AuthData.user_img.includes("https")
                          ? AuthData.user_img
                          : BaseUrl + "/UserProfile/Images/" + AuthData.user_img
                      }`
                }
                alt=""
              />
            </div>
            <div className="col-8">
              <h6 className="font-size-4 mb-0">{AuthData.fname}</h6>
              <span className="badge badge-info">Student</span>
            </div>
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar mb-10 mt-12 ">
            <li
              className={
                this.state.selectedOption == localRoutes.student_dashboard ||
                this.state.selectedOption ==
                  localRoutes.student_dashboard_available_tutors ||
                this.state.selectedOption ==
                  localRoutes.student_dashboard_schedual_lesson
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption: localRoutes.student_dashboard,
                  })
                }
                to={localRoutes.student_dashboard}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="icon icon-layout-11 mr-7"></i>Dashboard
              </Link>
            </li>

            <li
              className={
                this.state.selectedOption ==
                localRoutes.student_dashboard_lessons
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption: localRoutes.student_dashboard_lessons,
                  })
                }
                to={localRoutes.student_dashboard_lessons}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="fas fa-book-reader mr-7"></i>My Lessons
              </Link>
            </li>
            <li
              className={
                this.state.selectedOption ==
                localRoutes.student_dashboard_profile
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption: localRoutes.student_dashboard_profile,
                  })
                }
                to={localRoutes.student_dashboard_profile}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="fas fa-user mr-7"></i>Account{" "}
              </Link>
            </li>
            <li
              className={
                this.state.selectedOption ==
                localRoutes.student_dashboard_wallet
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption: localRoutes.student_dashboard_wallet,
                  })
                }
                to={localRoutes.student_dashboard_wallet}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="fas fa-wallet mr-7"></i>Wallet
              </Link>
            </li>
            <li
              className={
                this.state.selectedOption ==
                localRoutes.student_dashboard_messages
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption: localRoutes.student_dashboard_messages,
                  })
                }
                to={localRoutes.student_dashboard_messages}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="fas fa-comments mr-7"></i>Messages
              </Link>
            </li>

            <li
              className={
                this.state.selectedOption ==
                localRoutes.student_dashboard_packages_history
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption:
                      localRoutes.student_dashboard_packages_history,
                  })
                }
                to={localRoutes.student_dashboard_packages_history}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="fas fa-history mr-7"></i>Packages History
              </Link>
            </li>

            <li
              className={
                this.state.selectedOption ==
                localRoutes.student_dashboard_report
                  ? "active"
                  : ""
              }
            >
              <Link
                onClick={() =>
                  this.setState({
                    selectedOption: localRoutes.student_dashboard_report,
                  })
                }
                to={localRoutes.student_dashboard_report}
                className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
              >
                <i className="fas fa-star mr-7"></i>Student Report
              </Link>
            </li>
          </ul>
        </div>
        <a
          className="sidebar-mobile-button"
          data-toggle="collapse"
          href="#sidebar"
          role="button"
          aria-expanded="false"
          aria-controls="sidebar"
        >
          <i className="icon icon-sidebar-2"></i>
        </a>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};
export default connect(mapStateToProps, null)(StudentDashboardSideBar);
