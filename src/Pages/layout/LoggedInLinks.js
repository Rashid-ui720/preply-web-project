import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../utils/local_routes";
import { connect } from "react-redux";
import { Logout } from "../../Redux/Actions/authActions";
import { BaseUrl } from "../../utils/api_routes";
import Notifications from "../../components/notifications";
class LoggedInLinks extends React.Component {
  state = {};
  render() {
    const { AuthData, AuthError, notifications } = this.props;
    return (
      <div className="header-btn-devider ml-auto ml-lg-5 pl-2 d-none d-xs-flex align-items-center">
        <div className="dropdown show-gr-dropdown py-5">
          <a
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            className="px-3 ml-7 font-size-7 notification-block flex-y-center position-relative"
          >
            <i className="fas fa-bell heading-default-color"></i>
            <span className="font-size-3 count font-weight-semibold text-white bg-primary circle-24 border border-width-3 border border-white">
              {notifications.length}
            </span>
          </a>
          <div
            className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 notificationDropDown bg-default"
            aria-labelledby="dropdownMenuLink"
          >
            <Notifications />
          </div>
        </div>
        <div>
          <div className="dropdown show-gr-dropdown py-5">
            <a
              className="proile media ml-7 flex-y-center"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <div className="circle-40">
                {/* <img src="image/header-profile.png" alt="" /> */}
                <img
                  className="profile-image"
                  src={
                    AuthData.user_img == null || AuthData.user_img == ''
                      ? `../image/l3/png/userAvtar.webp`
                      : `${
                          AuthData.user_img.includes("https")
                            ? AuthData.user_img
                            : BaseUrl +
                              "/UserProfile/Images/" +
                              AuthData.user_img
                        }`
                  }
                  alt=""
                  onError={(e)=>{e.target.onerror = null; e.target.src="../image/l3/png/userAvtar.webp"}}
                />
              </div>
              <i className="fas fa-chevron-down heading-default-color ml-6"></i>
            </a>
            <div
              className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
              aria-labelledby="dropdownMenuLink"
            >
              <Link
                className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                to={
                  AuthData !== null && AuthData.role == "student"
                    ? localRoutes.student_dashboard_lessons
                    : AuthData.verified == "0"
                    ? localRoutes.tutor_dashboard_profile_setup
                    : localRoutes.tutor_dashboard
                }
              >
                Dashboard
              </Link>
              <Link
                className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                to={
                  AuthData !== null && AuthData.role == "student"
                    ? localRoutes.student_dashboard_settings
                    : AuthData.verified == "0"
                    ? localRoutes.tutor_dashboard_profile_setup
                    : localRoutes.tutor_dashboard_profile
                }
              >
                Edit Profile
              </Link>
              <Link
                className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                to={localRoutes.home}
                onClick={() => this.props.Logout()}
              >
                Log Out
              </Link>
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
    notifications: state.notifications.notifications,
    notificationsError: state.notifications.notificationsError,
    notificationsLoader: state.notifications.notificationsLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => dispatch(Logout()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoggedInLinks);
