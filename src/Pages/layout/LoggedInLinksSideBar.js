import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../utils/local_routes";
import { connect } from "react-redux";
import { Logout } from "../../Redux/Actions/authActions";
import { BaseUrl } from "../../utils/api_routes";
class LoggedInLinksSideBar extends React.Component {
  state = {};
  render() {
    const { toogleSideMenu, AuthData } = this.props;
    return (
      <div className="header-btn-devider  ml-lg-5  d-none d-xs-flex  flex-direction-col">
        <div className=" d-xs-flex align-items-center">
          <a
            className="proile media  flex-y-center"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="circle-40">
              <img
                className="profile-image"
                src={
                  AuthData.user_img == null
                    ? `image/l3/png/userAvtar.webp`
                    : `${BaseUrl}/UserProfile/Images/${AuthData.user_img}`
                }
                alt=""
              />
            </div>
            <p className="font-size-2 mb-0 font-weight-bold ml-1">
              {AuthData.fname}
            </p>
            <i className="fas fa-chevron-down heading-default-color ml-auto"></i>
          </a>
          <div
            className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2  w-auto bg-default mt-4"
            aria-labelledby="dropdownMenuLink"
          >
            <Link
              className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 p-0 text-uppercase"
              to={
                AuthData !== null && AuthData.role == "student"
                  ? localRoutes.student_dashboard_lessons
                  : AuthData.verified == "0"
                  ? localRoutes.tutor_dashboard_profile_setup
                  : localRoutes.tutor_dashboard
              }
              onClick={() => toogleSideMenu()}
            >
              Dashboard
            </Link>
            <Link
              className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 p-0  text-uppercase"
              to={
                AuthData !== null && AuthData.role == "student"
                  ? localRoutes.student_dashboard_settings
                  : AuthData.verified == "0"
                  ? localRoutes.tutor_dashboard_profile_setup
                  : localRoutes.tutor_dashboard_profile
              }
              onClick={() => toogleSideMenu()}
            >
              Edit Profile
            </Link>
            <a
              className="dropdown-item py-2 text-red font-size-3 font-weight-semibold line-height-1p2 p-0  text-uppercase"
              onClick={() => this.props.Logout()}
            >
              Log Out
            </a>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => dispatch(Logout()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoggedInLinksSideBar);
