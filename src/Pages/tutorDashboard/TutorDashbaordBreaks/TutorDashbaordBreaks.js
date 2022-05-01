import React from "react";
import TutorBreakDayCard from "../../../components/tutroBreaksDayCard";
import { connect } from "react-redux";
import {
  getBreaks,
  UpdateBreak,
  setAvailibility,
} from "../../../Redux/Actions/tutorBreaksAtions";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
class TutorDashboardBreaks extends React.Component {
  state = {};

  //of  a particular day
  HandleDayOf_On = (currentDay, value) => {
    var availability = this.props.breaks;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].current_day == currentDay) {
        availability[i].is_off = value;
      }
    }
    this.props.UpdateBreak(availability);
  };

  HandleStartTimeChange = async (currentDay, time) => {
    var availability = this.props.breaks;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].current_day == currentDay) {
        availability[i].start_time = time.target.value;
      }
    }
    this.props.UpdateBreak(availability);
  };

  //engn time of day
  handleEndTimeChange = (currentDay, time) => {
    var availability = this.props.breaks;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].current_day == currentDay) {
        availability[i].end_time = time.target.value;
      }
    }
    this.props.UpdateBreak(availability);
  };

  async componentDidMount() {
    const { AuthData } = this.props;
    await this.props.getBreaks(AuthData.id ? AuthData.id : AuthData.user_id);
  }

  //handle breaks submit
  handleAvailabilitySubmit = () => {
    const { AuthData } = this.props;
    this.props.setAvailibility(
      this.props.breaks,
      AuthData.id ? AuthData.id : AuthData.user_id,
      false
    );
  };

  render() {
    const { breaks, breakError, breakLoader } = this.props;
    if (breakLoader && breaks?.length == 0) {
      return <DashboardLoader />;
    }

    if (breakError !== null) {
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
          <div className="row mb-3">
            <div className="col-12 text-left mb-5 font">
              <b><h4>Weekly Breaks</h4></b>
            </div>
            {breaks.map((day, index) => {
              return (
                <TutorBreakDayCard
                  key={index}
                  currentDay={day}
                  HandleStartTimeChange={this.HandleStartTimeChange}
                  handleEndTimeChange={this.handleEndTimeChange}
                  HandleDayOf_On={this.HandleDayOf_On}
                />
              );
            })}
          </div>
          <div className="row d-flex justify-content-end col-12 no-gutters mb-20">
            <button
              className="btn btn-green"
              onClick={() => this.handleAvailabilitySubmit()}
            >
              Update
            </button>
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
    breaks: state.tutorAvailability.break,
    breakError: state.tutorAvailability.breakError,
    breakLoader: state.tutorAvailability.breakLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getBreaks: (user_id) => dispatch(getBreaks(user_id)),
    UpdateBreak: (breaks) => dispatch(UpdateBreak(breaks)),
    setAvailibility: (breaks, user_id, getProfile) =>
      dispatch(setAvailibility(breaks, user_id, getProfile)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorDashboardBreaks);
