import React from "react";

import PersonalInfo from "./personalInfo";
import { connect } from "react-redux";
import { getTutorProfile } from "../../../Redux/Actions/tutorProfileActions";
import TutorPackages from "./tutorPackages";
import TutorAvailability from "./tutorAvailablity";
import { Redirect } from "react-router";
import { localRoutes } from "../../../utils/local_routes";
class TutorProfileSetup extends React.Component {
  state = { step: 0, redirectToDashbaord: false };
  componentDidUpdate(prevProps) {
    if (
      prevProps.tutorProfile.verified == "0" &&
      this.props.tutorProfile.verified == "1"
    ) {
      this.setState({ redirectToDashbaord: true });
    }
  }

  componentDidMount() {
    const { AuthData } = this.props;
    this.props.getTutorProfile(AuthData.id ? AuthData.id : AuthData.user_id);
  }

  nextStep = (stepnumber) => {
    this.setState({ step: stepnumber });
  };
  previousStep = (stepnumber) => {
    if (stepnumber == 0) {
      const { AuthData } = this.props;
      this.props.getTutorProfile(AuthData.id ? AuthData.id : AuthData.user_id);
    }
    this.setState({ step: stepnumber });
  };
  render() {
    const { step, redirectToDashbaord } = this.state;
    const { tutorProfile, tutorProfileError, tutorProfileLoader, AuthData } =
      this.props;
    if (redirectToDashbaord) {
      return <Redirect to={localRoutes.tutor_dashboard} />;
    }
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container">
          <div className="mb-15 mb-lg-23">
            <div className="row">
              <div className="col-xxxl-9 ">
                <div className="alert alert-primary" role="alert">
                  {AuthData.status == "0"
                    ? `
                  Welcome! ${AuthData.fname} Please complete your profile to get
                  Complete access to dashboard`
                    : `${AuthData.fname} your profile has been submitted for review and once it is verified you will have access to complete dashboard`}
                </div>

                {step == 0 ? (
                  tutorProfileLoader ? (
                    <div className="text-center mt-30">
                      <div
                        className="spinner-grow"
                        style={{
                          width: "2.5rem",
                          height: "2.5rem",
                          color: "#00b074",
                        }}
                        role="status"
                      ></div>
                    </div>
                  ) : (
                    <PersonalInfo
                      tutorProfile={tutorProfile}
                      tutorProfileError={tutorProfileError}
                      nextStep={this.nextStep}
                    />
                  )
                ) : (
                  ""
                )}
                {step == 1 ? (
                  <TutorPackages
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                ) : (
                  ""
                )}
                {step == 2 ? (
                  <TutorAvailability
                    nextStep={this.nextStep}
                    previousStep={this.previousStep}
                  />
                ) : (
                  ""
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(TutorProfileSetup);
