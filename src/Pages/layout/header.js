import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../utils/local_routes";
import LoggedOutLinks from "./LoggedOutLinks";
import LoggedInLinks from "./LoggedInLinks";
import LoggedInLinksSideBar from "./LoggedInLinksSideBar";
import { connect } from "react-redux";
import Notifications from "../../components/notifications";
import { SetCurrency } from "../../Redux/Actions/currencyActions";
class Header extends React.Component {
  state = {};
  handleCurrency = (currency) => {
    this.props.SetCurrency(currency);
  };
  //toogle side menu
  toogleSideMenu = () => {
    document.getElementById("side_Menu_Toggle_Button").click();
  };
  render() {
    const { activeLink, AuthData, AuthError, currency, notifications } =
      this.props;
    return (
      <header
        className={activeLink.includes("tutor-detail") ? "site-header site-header--menu-right py-7 py-lg-0 bg-white" : `site-header site-header--menu-right dynamic-sticky-bg py-7 py-lg-0 site-header--absolute site-header--sticky ${
          activeLink.includes("dashboard") ? "bg-default position-fixed" : ""
        } ${
          activeLink.includes("student-dashboard")
            ? "student-dashboard-heading-paddingBottom"
            : ""
        }`}
        id="navigation-header"
      >
        <div className="container">
          <nav className="navbar site-navbar offcanvas-active navbar-expand-lg  px-0 py-0">
            <div className="brand-logo">
              <Link
                className=""
                to={localRoutes.home}
                onClick={() => this.toogleSideMenu()}
              >
                <img
                  src="../image/quran_teacher_logo.png"
                  alt=""
                  className="light-version-logo default-logo"
                />

                <img
                  src="../image/quran_teacher_logo.png"
                  alt=""
                  className="dark-version-logo"
                />
              </Link>
            </div>
            <div className="collapse navbar-collapse" id="mobile-menu">
              <div className="navbar-nav-wrapper">
                <ul className="navbar-nav main-menu">
                  <li className="nav-item auth-links">
                    {AuthData == null ? (
                      <LoggedOutLinks />
                    ) : (
                      <LoggedInLinksSideBar
                        toogleSideMenu={this.toogleSideMenu}
                      />
                    )}
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      activeLink == localRoutes.home ? "active" : ""
                    }`}
                  >
                    <Link
                      className="nav-link dropdown-toggle gr-toggle-arrow"
                      to={localRoutes.home}
                      onClick={() => this.toogleSideMenu()}
                    >
                      Home
                    </Link>
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      activeLink == localRoutes.tutor_list ||
                      activeLink == localRoutes.tutor_detail
                        ? "active"
                        : ""
                    }`}
                  >
                    <Link
                      className="nav-link dropdown-toggle gr-toggle-arrow"
                      to={localRoutes.tutor_list}
                      onClick={() => this.toogleSideMenu()}
                    >
                      Find tutors
                    </Link>
                  </li>
                  {
                    this.props?.AuthData?.role !== 'instructor' ? 
                    <li
                      className={`nav-item dropdown ${
                        activeLink == localRoutes.become_tutor ? "active" : ""
                      }`}
                    >
                      <Link
                        className="nav-link"
                        to={localRoutes.become_tutor}
                        onClick={() => this.toogleSideMenu()}
                      >
                        Become a tutor
                      </Link>
                    </li>
                    : null
                  }
                  <li
                    className={`nav-item dropdown ${
                      activeLink == localRoutes.about_us ? "active" : ""
                    }`}
                  >
                    <Link
                      className="nav-link"
                      to={localRoutes.about_us}
                      onClick={() => this.toogleSideMenu()}
                    >
                      About us
                    </Link>
                  </li>
                  <li
                    className={`nav-item dropdown ${
                      activeLink == localRoutes.contact_us ? "active" : ""
                    }`}
                  >
                    <Link
                      className="nav-link"
                      to={localRoutes.contact_us}
                      onClick={() => this.toogleSideMenu()}
                    >
                      Contact us
                    </Link>
                  </li>
                  <li className="nav-item dropdown d-flex align-items-center justify-content-center">
                    <div className="dropdown show-gr-dropdown ">
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
                          <i
                            className={`fas ${
                              currency == "GBP"
                                ? "fa-pound-sign"
                                : "fa-dollar-sign"
                            } mr-3`}
                          ></i>
                          <p className="m-0">{currency}</p>
                        </div>
                      </a>
                      <div
                        className="dropdown-menu gr-menu-dropdown dropdown-right border-0 border-width-2 py-2 w-auto bg-default"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <a
                          onClick={() => this.handleCurrency("GBP")}
                          className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                        >
                          <i
                            className={`fas 
                     fa-pound-sign
                   mr-3`}
                          ></i>{" "}
                          GBP
                        </a>
                        <a
                          onClick={() => this.handleCurrency("USD")}
                          className="dropdown-item py-2 font-size-3 font-weight-semibold line-height-1p2 text-uppercase"
                        >
                          <i
                            className={`fas 
                     fa-dollar-sign
                   mr-3`}
                          ></i>
                          USD
                        </a>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <button
                className="d-block d-lg-none offcanvas-btn-close focus-reset"
                type="button"
                id="side_Menu_Toggle_Button"
                data-toggle="collapse"
                data-target="#mobile-menu"
                aria-controls="mobile-menu"
                aria-expanded="true"
                aria-label="Toggle navigation"
              >
                <i className="gr-cross-icon"></i>
              </button>
            </div>
            {/* Auth Part  */}
            {AuthData == null ? <LoggedOutLinks /> : <LoggedInLinks />}
            {/* Mobile Bell Icon */}
            {AuthData !== null ? (
              <div className="dropdown show-gr-dropdown py-5 mobileViewBellIcon">
                <a
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  className="px-3  font-size-7 notification-block flex-y-center position-relative"
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
            ) : null}
            {/* Mobile Bell Icon */}
            {/* <!-- Mobile Menu Hamburger--> */}
            <button
              className="navbar-toggler btn-close-off-canvas  hamburger-icon border-0"
              type="button"
              data-toggle="collapse"
              data-target="#mobile-menu"
              aria-controls="mobile-menu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="hamburger hamburger--squeeze js-hamburger">
                <span className="hamburger-box">
                  <span className="hamburger-inner"></span>
                </span>
              </span>
            </button>
            {/* <!--/.Mobile Menu Hamburger Ends--> */}
          </nav>
        </div>
        {/* StudentDashboard Links */}
        {activeLink.includes("student-dashboard") ? (
          <div className="m-0 w-100" style={{ backgroundColor: "#407aBf" }}>
            <div className="d-flex p-5 ml-lg-12">
              <Link
                className="text-white font-size-3 font-weight-normal"
                to={localRoutes.student_dashboard_messages}
              >
                Messages
              </Link>
              <Link
                className="text-white font-size-3 ml-10"
                to={localRoutes.student_dashboard_lessons}
              >
                My Lessons
              </Link>
              <Link
                className="text-white font-size-3 ml-10"
                to={localRoutes.student_dashboard_settings}
              >
                Settings
              </Link>
            </div>
          </div>
        ) : null}
      </header>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    currency: state.currency.currency,
    notifications: state.notifications.notifications,
    notificationsError: state.notifications.notificationsError,
    notificationsLoader: state.notifications.notificationsLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetCurrency: (currency) => dispatch(SetCurrency(currency)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
