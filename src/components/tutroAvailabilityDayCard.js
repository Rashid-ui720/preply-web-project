import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";
class TutorAvailabilityDayCard extends React.Component {
  state = { collapse: false, start_time: "", end_time: "" };

  //handle start time change to show user
  HandleStartTimeChange = (time) => {
    this.setState({ start_time: time.target.value });
  };

  //handle time change to show  user
  handleEndTimeChange = (time) => {
    this.setState({ end_time: time.target.value });
  };

  //toogle dropdown of card
  toggle = async () => {
    await this.setState((state) => ({ collapse: !state.collapse }));
    if (this.state.collapse != true) {
      this.props.HandleDayOf_On(this.props.currentDay.day_name, false);
    } else {
      this.props.HandleDayOf_On(this.props.currentDay.day_name, true);
    }
  };

  componentDidMount() {
    //open or close  card accoridngly
    if (this.props.currentDay.is_on) {
      this.setState({ collapse: true });
    }

    //set the timme  f0r card
    this.setState({
      start_time: this.props.currentDay.start_time,
      end_time: this.props.currentDay.end_time,
    });
  }

  render() {
    return (
      <div className="col-md-6 col-sm-12 mb-8">
        <div className="card border-0">
          <div
            className={`card-header bg-white d-flex  border-0  justify-content-between ${
              this.state.collapse ? "" : "rounded"
            }`}
          >
            <h6 className="mb-0 font-size-4">
              {this.props.currentDay.day_name}
            </h6>
            <Toggle
              checked={this.state.collapse}
              onChange={this.toggle}
              name="controlledSwitch"
              value="yes"
            />
          </div>
          {this.state.collapse == true ? (
            <div>
              <div className="card-body  ">
                <div className="row">
                  <div className="col-md-6 col-sm-12">
                    {" "}
                    <h5 className="font-size-3">Start Time</h5>
                    <input
                      className="form-control  time-height"
                      type="time"
                      value={this.state.start_time}
                      onChange={(e) => {
                        this.props.HandleStartTimeChange(
                          this.props.currentDay.day_name,
                          e
                        );
                        this.HandleStartTimeChange(e);
                      }}
                    />
                  </div>
                  <div className="col-md-6 col-sm-12">
                    {" "}
                    <h5 className="font-size-3">End Time</h5>
                    <input
                      className="form-control  time-height"
                      type="time"
                      value={this.state.end_time}
                      onChange={(date) => {
                        this.props.handleEndTimeChange(
                          this.props.currentDay.day_name,
                          date
                        );
                        this.handleEndTimeChange(date);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

export default TutorAvailabilityDayCard;
