import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../../utils/local_routes";
import { connect } from "react-redux";
import { BaseUrl } from "../../utils/api_routes";
// import "../../cssmodule/chatStyles.css";

class TutorDashboardSideBar extends React.Component {
  state = { selectedOption: window.location.pathname, prevPath: "" };

  render() {
    const { AuthData, AuthError } = this.props;
    return (
      <React.Fragment>
        <div className="dashboard-sidebar-wrapper pt-11 " id="sidebar">
          <div className="brand-logo px-11">
            <a>
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
              <span className="badge badge-info">Tutor</span>
            </div>
          </div>
          <ul className="list-unstyled dashboard-layout-sidebar mb-10 mt-12">
            {AuthData.verified == "0" ? (
              <li
                className={
                  this.state.selectedOption ==
                  localRoutes.tutor_dashboard_profile_setup
                    ? "active mt-20"
                    : " mt-20"
                }
              >
                <Link
                  onClick={() => {
                    this.setState({
                      selectedOption: localRoutes.tutor_dashboard_profile_setup,
                    });
                  }}
                  to={localRoutes.tutor_dashboard_profile_setup}
                  className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                >
                  <i className="fas fa-user mr-7"></i>Profile Setup
                </Link>
              </li>
            ) : (
              <>
                <li
                  className={
                    this.state.selectedOption == localRoutes.tutor_dashboard
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() => {
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard,
                      });
                    }}
                    to={localRoutes.tutor_dashboard}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="icon icon-layout-11 mr-7"></i>Dashboard
                  </Link>
                </li>

                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_lessons
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_lessons,
                      })
                    }
                    to={localRoutes.tutor_dashboard_lessons}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-book-reader mr-7"></i>My Lessons
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ===
                    this.state.tutor_dashboard_profile
                      ? "active"
                      : this.state.selectedOption ===
                        this.state.get_tutor_subjects
                      ? "active"
                      : this.state.selectedOption ===
                        this.state.get_tutor_education
                      ? "active"
                      : this.state.selectedOption ===
                        this.state.get_tutor_experience
                      ? "active"
                      : ""
                  }
                >
                  <a
                    href="#homeSubmenu"
                    data-toggle="collapse"
                    aria-expanded="false"
                    className={
                      this.state.selectedOption ==
                        localRoutes.tutor_dashboard_profile ||
                      this.state.selectedOption ==
                      localRoutes.get_tutor_subjects ||
                      this.state.selectedOption ==
                      localRoutes.get_tutor_education ||
                      this.state.selectedOption ==
                      localRoutes.get_tutor_experience
                        ? "active show dropdown-toggle px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                        : "dropdown-toggle px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                    }
                  >
                    <i className="fas fa-user mr-7"></i>Profile
                  </a>
                  <ul class="collapse list-unstyled show" id="homeSubmenu">
                    <li
                      className={
                        this.state.selectedOption ==
                        localRoutes.tutor_dashboard_profile
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        onClick={() =>
                          this.setState({
                            selectedOption: localRoutes.tutor_dashboard_profile,
                          })
                        }
                        to={localRoutes.tutor_dashboard_profile}
                        className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                      >
                        <i className="fas fa-address-book mr-7"></i>Account{" "}
                      </Link>
                    </li>
                    <li
                      className={
                        this.state.selectedOption ==
                        localRoutes.get_tutor_subjects
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        onClick={() =>
                          this.setState({
                            selectedOption: localRoutes.get_tutor_subjects,
                          })
                        }
                        to={localRoutes.get_tutor_subjects}
                        className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                      >
                        <i className="fas fa-chalkboard-teacher mr-7"></i>
                        Subjects{" "}
                      </Link>
                    </li>
                    <li
                      className={
                        this.state.selectedOption ==
                        localRoutes.get_tutor_experience
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        onClick={() =>
                          this.setState({
                            selectedOption: localRoutes.get_tutor_experience,
                          })
                        }
                        to={localRoutes.get_tutor_experience}
                        className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                      >
                        <i className="fas fa-university mr-7"></i>
                        Experience{" "}
                      </Link>
                    </li>
                    <li
                      className={
                        this.state.selectedOption ==
                        localRoutes.get_tutor_education
                          ? "active"
                          : ""
                      }
                    >
                      <Link
                        onClick={() =>
                          this.setState({
                            selectedOption: localRoutes.get_tutor_education,
                          })
                        }
                        to={localRoutes.get_tutor_education}
                        className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                      >
                        <i className="fas fa-user-graduate mr-7"></i>
                        Education{" "}
                      </Link>
                    </li>
                  </ul>
                </li>
                
                
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_password_change
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption:
                          localRoutes.tutor_dashboard_password_change,
                      })
                    }
                    to={localRoutes.tutor_dashboard_password_change}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-lock mr-7"></i>Change Password{" "}
                  </Link>
                </li>

                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_payment_history
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption:
                          localRoutes.tutor_dashboard_payment_history,
                      })
                    }
                    to={localRoutes.tutor_dashboard_payment_history}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-history mr-7"></i>Payment History
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_zoom_setting
                      ? "active"
                      : ""
                  }
                ></li>
                {/* <li>
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption:
                          localRoutes.tutor_dashboard_zoom_setting,
                      })
                    }
                    to={localRoutes.tutor_dashboard_zoom_setting}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fa fa-video mr-7"></i>Zoom Setting{" "}
                  </Link>
                </li> */}
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_availability
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption:
                          localRoutes.tutor_dashboard_availability,
                      })
                    }
                    to={localRoutes.tutor_dashboard_availability}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-clock mr-7"></i>Availability{" "}
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_breaks
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_breaks,
                      })
                    }
                    to={localRoutes.tutor_dashboard_breaks}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-power-off mr-7"></i>Breaks{" "}
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption == localRoutes.get_events
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.get_events,
                      })
                    }
                    to={localRoutes.get_events}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-calendar mr-7"></i>Events{" "}
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_packages
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_packages,
                      })
                    }
                    to={localRoutes.tutor_dashboard_packages}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-cubes mr-7"></i>Packages
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_payouts
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_payouts,
                      })
                    }
                    to={localRoutes.tutor_dashboard_payouts}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-dollar-sign mr-7"></i>Payouts
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_messages
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_messages,
                      })
                    }
                    to={localRoutes.tutor_dashboard_messages}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-comments mr-7"></i>Messages
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_calendar
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_calendar,
                      })
                    }
                    to={localRoutes.tutor_dashboard_calendar}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-calendar mr-7"></i>Calendar
                  </Link>
                </li>
                <li
                  className={
                    this.state.selectedOption ==
                    localRoutes.tutor_dashboard_reviews
                      ? "active"
                      : ""
                  }
                >
                  <Link
                    onClick={() =>
                      this.setState({
                        selectedOption: localRoutes.tutor_dashboard_reviews,
                      })
                    }
                    to={localRoutes.tutor_dashboard_reviews}
                    className="px-10 py-1 my-5 font-size-4 font-weight-semibold flex-y-center"
                  >
                    <i className="fas fa-star mr-7"></i>Reviews
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <a
          className="sidebar-mobile-button"
          data-toggle="collapse"
          href="#sidebar"
          role="button"
          aria-expanded="false"
          aria-controls="sidebar"
          id="toogle-dashboard-sidebar-btn"
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
export default connect(mapStateToProps, null)(TutorDashboardSideBar);
