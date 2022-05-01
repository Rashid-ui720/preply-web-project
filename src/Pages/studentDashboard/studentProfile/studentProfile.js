import React from "react";
import ProfileForm from "./profileForm";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getStudentProfile } from "../../../Redux/Actions/studentProfileActions";
class StudentProfile extends React.Component {
  componentDidMount() {
    const { AuthData } = this.props;
    this.props.getStudentProfile(AuthData.id ? AuthData.id : AuthData.user_id);
  }
  render() {
    const {
      studentProfile,
      studentProfileError,
      studentProfileLoader,
      AuthData,
    } = this.props;

    if (studentProfileLoader && JSON.stringify(studentProfile) == "{}") {
      return <DashboardLoader type={"student"} page={"settings"} />;
    }

    if (studentProfileError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
          type={"student"}
          page={"settings"}
        />
      );
    }
    return (
      <div className="" id="dashboard-body">
        <div className="">
          <div className="mb-15 mb-lg-23">
            <div className="row">
              <div className="col-xxxl-9 px-lg-13 px-6">
                <ProfileForm
                  studentProfile={studentProfile}
                  studentProfileError={studentProfileError}
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
    studentProfile: state.studentProfile.studentProfile,
    studentProfileError: state.studentProfile.studentProfileError,
    studentProfileLoader: state.studentProfile.studentProfileLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getStudentProfile: (user_id) => dispatch(getStudentProfile(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentProfile);
