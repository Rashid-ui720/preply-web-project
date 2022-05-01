import React from "react";

import { connect } from "react-redux";
import SettingSideBar from "./settingSideBar";
import { localRoutes } from "../../../utils/local_routes";
import StudentProfile from "../studentProfile/studentProfile";
import StudentPackagesHistory from "../studentPackagesHisotry/studentPackagesHistory";
import StudentReport from "../studentReport/studentReport";
import StudentWallet from "../studentWallet/studentWallet";
import StudentDashboard from "../studentDashboard/studentDashboard";
import StudentChnagePassword from "../studetnchangePassword/studentChnagePassword";
import ParentWizards from "../parentwizards/parentWizards";
class StudentSettings extends React.Component {
  state = {
    selectedLink: localRoutes.student_dashboard_profile,
  };

  selectLink = (link) => {
    this.setState({ selectedLink: link });
  };

  getSelectedOption = () => {
    const { selectedLink } = this.state;
    if (selectedLink == localRoutes.student_dashboard_profile) {
      return <StudentProfile />;
    }
    if (selectedLink == localRoutes.student_dashboard_packages_history) {
      return <StudentPackagesHistory />;
    }
    if (selectedLink == localRoutes.student_dashboard_report) {
      return <StudentReport />;
    }
    if (selectedLink == localRoutes.student_dashboard_wallet) {
      return <StudentWallet />;
    }
    if (selectedLink == localRoutes.student_dashboard) {
      return <StudentDashboard />;
    }
    if (selectedLink == localRoutes.parent_wizards) {
      return <ParentWizards />;
    }
    if (selectedLink == localRoutes.student_dashboard_password_change) {
      return <StudentChnagePassword />;
    } else {
      return null;
    }
  };
  render() {
    return (
      <div
        className="student-dashboard-container mt-31 mt-lg-31"
        id="dashboard-body"
      >
        <div
          className="student-dashboard-content"
          style={{ minHeight: "100vh" }}
        >
          <div className="row">
            <div className="col-12 col-lg-2 col-md-3">
              <SettingSideBar
                selectedLink={this.state.selectedLink}
                selectLink={this.selectLink}
              />
            </div>
            <div className="col-12 col-lg-10 col-md-9">
              {this.getSelectedOption()}
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
  };
};

export default connect(mapStateToProps, null)(StudentSettings);
