import React from "react";
import TutorAvailabilityDayCard from "../../../components/tutroAvailabilityDayCard";
import { connect } from "react-redux";
import {
  getAvailability,
  UpdateAvailability,
  setAvailibility,
} from "../../../Redux/Actions/tutorAvailabilityAtions";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { Link } from "react-router-dom";
import { localRoutes } from "../../../utils/local_routes";
import AddTutorEvents from "../tutorEvents/AddTutorEvents";
class TutorDashbaordAvailability extends React.Component {
  state = {
    selectedEvent: {
      created_at: "",
      dates: "",
      end_time: "",
      id: "",
      show_position: "",
      start_time: "",
      title: "",
      user_id: "",
    },
    sidebarType: "",
    sidebar: false,
  };

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
      false
    );
  };

  // Add edit event
  handleAddEventSidebar = (type) => {
    if (type == "add") {
      let EventDetails = {
        created_at: "",
        dates: "",
        end_time: "",
        id: "",
        show_position: "",
        start_time: "",
        title: "",
        user_id: "",
      };
      this.setState({ selectedEvent: EventDetails });
    }
    this.setState({ sidebar: !this.state.sidebar, sidebarType: type });
  };

  render() {
    const { availability, availabilityError, availabilityLoader } = this.props;
    if (availabilityLoader && availability?.length == 0) {
      return <DashboardLoader />;
    }

    if (availabilityError !== null) {
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
            <div className="col-12 text-right mb-5">
              <button
                type="button"
                className="btn btn-sm btn-primary rounded-pill"
                style={{ padding: "15px" }}
                onClick={() => this.handleAddEventSidebar("add")}
              >
                Add Event
              </button>
              {this.state.sidebar ? (
                <AddTutorEvents
                  selectedEvent={this.state.selectedEvent}
                  sidebarType={this.state.sidebarType}
                  isOpen={this.state.sidebar}
                  handleAddEventSidebar={this.handleAddEventSidebar}
                  AuthData={this.props.AuthData}
                />
              ) : null}
              <Link
                className="btn btn-sm btn-dark rounded-pill ml-1"
                style={{ padding: "15px" }}
                to={{
                  pathname: localRoutes.tutor_dashboard_breaks,
                }}
              >
                Add Weekly Break
              </Link>
            </div>
            {availability.map((day, index) => {
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorDashbaordAvailability);
