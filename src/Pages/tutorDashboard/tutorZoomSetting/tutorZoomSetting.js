import React from "react";

import ZoomForm from "./ZoomForm";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getZoomSetting } from "../../../Redux/Actions/tutorzoomSettingAction";
import HowToGetZoomCredintials from "./howTo";
class TutorZoomSetting extends React.Component {
  componentDidMount() {
    const { AuthData } = this.props;
    this.props.getZoomSetting(AuthData.id ? AuthData.id : AuthData.user_id);
  }
  render() {
    const { zoomSetting, zoomSettingError, zoomSettingLoader, AuthData } =
      this.props;

    if (zoomSettingLoader) {
      return <DashboardLoader />;
    }

    if (zoomSettingError !== null) {
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
        className="dashboard-main-container mt-25 mt-lg-25"
        id="dashboard-body"
      >
        <div className="container">
          <div className="mb-15 mb-lg-23">
            <div className="row">
              <div className="col-xxxl-6 col-lg-6 col-md-6 col-sm-12 ">
                <h5 className="font-size-6 font-weight-semibold mb-6">
                  Zoom Setting
                </h5>
                <ZoomForm
                  zoomSetting={zoomSetting}
                  zoomSettingError={zoomSettingError}
                />
              </div>
              <div className="col-xxxl-6 col-lg-6 col-md-6 col-sm-12 ">
                <h5 className="font-size-6 font-weight-semibold mb-6">
                  How to get zoom credential
                </h5>
                <HowToGetZoomCredintials />
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
    zoomSetting: state.tutorZoomSettingReducer.zoomSetting,
    zoomSettingError: state.tutorZoomSettingReducer.zoomSettingError,
    zoomSettingLoader: state.tutorZoomSettingReducer.zoomSettingLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getZoomSetting: (user_id) => dispatch(getZoomSetting(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TutorZoomSetting);
