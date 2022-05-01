import React from "react";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import TutorAvailabilityDayCard from "../../../components/tutroAvailabilityDayCard";
import { connect } from "react-redux";
import {
  getAvailability,
  UpdateAvailability,
  setAvailibility,
} from "../../../Redux/Actions/tutorAvailabilityAtions";
class TutorAvailability extends React.Component {
  state = {};

  //of  a particular day
  HandleDayOf_On = (currentDay, value) => {
    var availability = this.props.availability;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].day_name == currentDay) {
        availability[i].is_on = value;
      }
    }
    this.props.UpdateAvailability(availability);
  };

  HandleStartTimeChange = async (currentDay, time) => {
    var availability = this.props.availability;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].day_name == currentDay) {
        availability[i].start_time = time.target.value;
      }
    }
    this.props.UpdateAvailability(availability);
  };

  //engn time of day
  handleEndTimeChange = (currentDay, time) => {
    var availability = this.props.availability;
    for (let i = 0; i < availability.length; i++) {
      if (availability[i].day_name == currentDay) {
        availability[i].end_time = time.target.value;
      }
    }
    this.props.UpdateAvailability(availability);
  };

  async componentDidMount() {
    const { AuthData } = this.props;
    await this.props.getAvailability(
      AuthData.id ? AuthData.id : AuthData.user_id
    );
  }

  //handle breaks submit
  handleAvailabilitySubmit = () => {
    const { AuthData } = this.props;
    this.props.setAvailibility(
      this.props.availability,
      AuthData.id ? AuthData.id : AuthData.user_id,
      true
    );
  };

  loaderComp = () => {
    return (
      <div className="text-center mt-15 mb-30 w-100">
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
    );
  };

  errorComp = () => {
    return (
      <div className="text-center mt-15 mb-30 w-100">
        <h4>There is an error while getting availability</h4>
      </div>
    );
  };

  render() {
    const { availability, availabilityError, availabilityLoader } = this.props;

    return (
      <div>
        <StepProgressBar
          startingStep={2}
          buttonWrapperClass="hide_everything"
          steps={[
            {
              label: "Info",
              name: "step 1",
            },
            {
              label: "Packages",
              name: "step 2",
            },
            {
              label: "Availability",
              name: "step 3",
            },
          ]}
        />

        <div className="row mb-8">
          {availabilityLoader
            ? this.loaderComp()
            : availabilityError !== null
            ? this.errorComp()
            : availability.map((day, index) => {
                return (
                  <TutorAvailabilityDayCard
                    key={index}
                    currentDay={day}
                    HandleStartTimeChange={this.HandleStartTimeChange}
                    handleEndTimeChange={this.handleEndTimeChange}
                    HandleDayOf_On={this.HandleDayOf_On}
                  />
                );
              })}
        </div>
        <div className="row d-flex justify-content-between col-12 no-gutters">
          <button
            className="btn btn-outline-black "
            onClick={() => this.props.previousStep(1)}
          >
            Previous
          </button>
          <button
            className="btn btn-green"
            onClick={() => this.handleAvailabilitySubmit()}
          >
            Submit Profile
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    availability: state.tutorAvailability.availability,
    availabilityError: state.tutorAvailability.availabilityError,
    availabilityLoader: state.tutorAvailability.availabilityLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAvailability: (user_id) => dispatch(getAvailability(user_id)),
    UpdateAvailability: (availability) =>
      dispatch(UpdateAvailability(availability)),
    setAvailibility: (availability, user_id, getProfile) =>
      dispatch(setAvailibility(availability, user_id, getProfile)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorAvailability);
