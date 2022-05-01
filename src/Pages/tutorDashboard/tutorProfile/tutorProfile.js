import React from "react";

import ProfileForm from "./profileForm";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorProfile } from "../../../Redux/Actions/tutorProfileActions";
class TutorProfile extends React.Component {
  componentDidMount() {
    const { AuthData } = this.props;
    this.props.getTutorProfile(AuthData.id ? AuthData.id : AuthData.user_id);
  }
  render() {
    const { tutorProfile, tutorProfileError, tutorProfileLoader, AuthData } =
      this.props;

    if (tutorProfileLoader && JSON.stringify(tutorProfile) == "{}") {
      return <DashboardLoader />;
    }

    if (tutorProfileError !== null) {
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
          <div className="mb-15 mb-lg-23">
            <div className="row">
              <div className="col-xxxl-9 px-lg-13 px-6">
                <h5 className="font-size-6 font-weight-semibold mb-11">
                  Update Profile
                </h5>
                <ProfileForm
                  tutorProfile={tutorProfile}
                  tutorProfileError={tutorProfileError}
                />
              </div>
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
    tutorProfile: state.tutorProfile.tutorProfile,
    tutorProfileError: state.tutorProfile.tutorProfileError,
    tutorProfileLoader: state.tutorProfile.tutorProfileLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorProfile: (user_id) => dispatch(getTutorProfile(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorProfile);
