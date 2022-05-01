import React from "react";
import TimezoneSelect from "react-timezone-select";
import { connect } from "react-redux";
import { getTutorTimeSlots } from "../Redux/Actions/tutorTimeSlotsAction";
import { toast } from "react-toastify";
class BookingCalander extends React.Component {
  state = {
    date: new Date(),
    timezone:
      this.props.AuthData !== null && this.props.AuthData.timezone !== null
        ? this.props.AuthData.timezone
        : Intl.DateTimeFormat().resolvedOptions().timeZone,
    week: [],

    selectedWeekRange: "",
    selectedTimeSlotId: "",
    timeZoneDateCheck: false,
  };

  async componentDidMount() {
    //   handle week selection  for ui
    var CompleteWeek = this.getWeek(new Date());
    this.handleSelectedWeekString(CompleteWeek);
    await this.setState({ week: CompleteWeek });
    this.fetchTimeSlots();
  }

  //FetchTimeSlots acording to time
  fetchTimeSlots = () => {
    const { tutorDetail } = this.props;
    //conver the day string to simple date string
    let Dates = [];
    this.state.week.map((day) => {
      let date = new Date(day).toLocaleDateString("en-US");
      Dates.push(date);
    });
    let ParamsString = `?user_id=${tutorDetail.id}&week_date[${this.getDayName(
      Dates[0]
    )}]=${this.GetFormattedDate(Dates[0])}&week_date[${this.getDayName(
      Dates[1]
    )}]=${this.GetFormattedDate(Dates[1])}&week_date[${this.getDayName(
      Dates[2]
    )}]=${this.GetFormattedDate(Dates[2])}&week_date[${this.getDayName(
      Dates[3]
    )}]=${this.GetFormattedDate(Dates[3])}&week_date[${this.getDayName(
      Dates[4]
    )}]=${this.GetFormattedDate(Dates[4])}&week_date[${this.getDayName(
      Dates[5]
    )}]=${this.GetFormattedDate(Dates[5])}&week_date[${this.getDayName(
      Dates[6]
    )}]=${this.GetFormattedDate(Dates[6])}&time_zone=${this.state.timezone}`;
    this.props.getTutorTimeSlots(ParamsString);
  };

  //get full day name like monday , tuesday
  getDayName = (date) => {
    let day = new Date(date);
    let weekDayName = day.toString().split(" ");
    return this.dayName(weekDayName[0]);
  };

  //day full name helper
  dayName = (weekDayName) => {
    if (weekDayName == "Mon") {
      return "Monday";
    } else if (weekDayName == "Tue") {
      return "Tuesday";
    } else if (weekDayName == "Wed") {
      return "Wednesday";
    } else if (weekDayName == "Thu") {
      return "Thursday";
    } else if (weekDayName == "Fri") {
      return "Friday";
    } else if (weekDayName == "Sat") {
      return "Saturday";
    } else if (weekDayName == "Sun") {
      return "Sunday";
    } else {
      return null;
    }
  };

  //get date formate in 12-5-2021
  GetFormattedDate = (date) => {
    var todayTime = new Date(date);

    var MyDateString =
      ("0" + todayTime.getDate()).slice(-2) +
      "-" +
      ("0" + (todayTime.getMonth() + 1)).slice(-2) +
      "-" +
      todayTime.getFullYear();

    return MyDateString;
  };
  //select a time slot from the list for the booking actions
  selectTimeSlot = async (timeSlot, timeSlotId, WeekDay) => {
    if (this.props.AuthData !== null) {
      if (this.props.AuthData.role !== "student") {
        this.props.showMessage(
          "You cant book a lesson from a tutor account please login with a student account",
          toast.TYPE.ERROR
        );
      } else {
        await this.setState({ selectedTimeSlotId: timeSlotId });
        let date = new Date(WeekDay).toLocaleDateString("en-US");
        //this props comes form parent component tutorBooking

        this.props.SetLessonDateAndTimeSlot(
          date,
          timeSlot,
          this.state.timezone
        );
      }
    } else {
      this.props.opneSignupModal();
    }
  };

  //handle selected week title string
  handleSelectedWeekString = (CompleteWeek) => {
    var weekMonday = CompleteWeek[0].toString().split(" ");
    var weekSunday = CompleteWeek[6].toString().split(" ");
    var nextMonthDate = weekMonday[1] == weekSunday[1] ? "" : weekSunday[1];
    var selectedWeek =
      weekMonday[1] +
      " " +
      weekMonday[2] +
      "-" +
      nextMonthDate +
      " " +
      weekSunday[2] +
      ", " +
      weekMonday[3];

    this.setState({ selectedWeekRange: selectedWeek });
  };

  //get whole week from one date to another
  getWeek(fromDate) {
    let CompleteWeek = [new Date(fromDate)];
    for (let i = 0; i <= 5; i++) {
      var Lastday = new Date(CompleteWeek[i]);
      var NextDay = Lastday.setDate(new Date(CompleteWeek[i]).getDate() + 1);
      CompleteWeek.push(new Date(NextDay));
    }

    return CompleteWeek;
  }

  //change TIME ZONE
  ChangeTimeZone = async (timezone) => {
    this.props.timeZoneDateCheck()
    var d = new Date();

    // convert to msec
    // subtract local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + d.getTimezoneOffset() * 60000;

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + 3600000 * timezone.offset);

    //   handle week selection  for ui
    var CompleteWeek = this.getWeek(nd);
    this.handleSelectedWeekString(CompleteWeek);
    await this.setState({ week: CompleteWeek, timezone: timezone.value });

    this.fetchTimeSlots();
  };

  //get next week
  nextWeek = async () => {
    var WeekLastDay = new Date(this.state.week[6]);
    var NextWeekDay = WeekLastDay.setDate(
      new Date(this.state.week[6]).getDate() + 1
    );
    //   handle week selection  for ui
    
    
    var CompleteWeek = this.getWeek(new Date(NextWeekDay));
    this.handleSelectedWeekString(CompleteWeek);
    await this.setState({ week: CompleteWeek });
    this.fetchTimeSlots();
  };

  //get previous week
  PreviousWeek = async () => {
    var WeekFirstDay = new Date(this.state.week[0]);
    var PreviousWeekDay = WeekFirstDay.setDate(
      new Date(this.state.week[0]).getDate() - 7
    );
    //   handle week selection  for ui
    var CompleteWeek = this.getWeek(new Date(PreviousWeekDay));
    this.handleSelectedWeekString(CompleteWeek);
    await this.setState({ week: CompleteWeek });
    this.fetchTimeSlots();
  };

  //Check day is of or on in the schedual
  CheckDayOf = (Day, schedual) => {
    let DayStatus = null;
    schedual.map((schedualDay) => {
      let schedualDayName = schedualDay.day_name.substring(0, 3);
      if (new Date(Day).toString().split(" ")[0] == schedualDayName) {
        DayStatus = schedualDay.is_on;
      }
    });
    return DayStatus;
  };

  //render TimeSlotes
  TimeSlots = (Day, schedual, dayName, date, timeSlots) => {
    let DayOf = this.CheckDayOf(Day, schedual);
    let DayFullName = this.dayName(dayName);
    let Year = new Date(Day).toISOString().split("T")[0].split("-")[0];
    let month = new Date(Day).toISOString().split("T")[0].split("-")[1];
    let day = new Date(Day).toISOString().split("T")[0].split("-")[2];
    let CurrentDate = Year + "-" + month + "-" + day;

    if (DayOf == "2" || DayOf == null) {
      return <React.Fragment></React.Fragment>;
    } else {
      if (
        timeSlots[DayFullName] !== undefined &&
        Array.isArray(timeSlots[DayFullName][CurrentDate])
      ) {
        return timeSlots[DayFullName][CurrentDate].map((timeslot, index2) => {
          if (timeslot.status == "Available") {
            return (
              <div
                key={index2}
                className={
                  index2 + date == this.state.selectedTimeSlotId
                    ? "selected-time-slot"
                    : ""
                }
                onClick={() =>
                  this.selectTimeSlot(timeslot.slot, index2 + date, Day)
                }
              >
                <div className="TimeSlotAvailable TimeSlot">
                  {timeslot.slot}
                </div>
              </div>
            );
          } else {
            return <React.Fragment key={index2}></React.Fragment>;
          }
        });
      } else {
        <React.Fragment></React.Fragment>;
      }
    }
  };

  render() {
    const { selectedWeekRange } = this.state;
    const {
      tutorDetail,
      tutorTimeSlots,
      tutorTimeSlotsError,
      tutorTimeSlotsLoader,
    } = this.props;

    return (
      <div className="bg-white">
        {/* date and time zone selector */}
        <div className="row justify-content-between">
          {/* Week selector */}
          <div className="col-lg-5 col-md-5 col-sm-12">
            <h6 className="font-size-3 ">Select Date</h6>
            <div className="d-flex  align-items-center">
              <div className="d-flex">
                {/* Previous btn */}
                <button
                  className="btn-date-action"
                  disabled={
                    new Date(this.state.week[0]).toString().split(" ")[2] ==
                    new Date().toString().split(" ")[2]
                      ? true
                      : false
                  }
                  onClick={() => this.PreviousWeek()}
                >
                  <i className="fa fa-chevron-left" aria-hidden="true"></i>
                </button>
                {/* Next button */}
                <button
                  className="btn-date-action"
                  onClick={() => this.nextWeek()}
                >
                  <i className="fa fa-chevron-right" aria-hidden="true"></i>
                </button>
              </div>
              {/* selected week range string */}
              <p className="font-size-4 mb-0 ml-2 font-weight-semibold">
                {selectedWeekRange}
              </p>
            </div>
          </div>

          {/* time zone selector */}
          <div className="col-lg-6 col-md-6 col-sm-12">
            <h6 className="font-size-3 ">Please select time zone</h6>
            <TimezoneSelect
              i={"true"}
              value={""}
              // value={this.state.timezone}
              onChange={(data) => this.ChangeTimeZone(data)}
            />
          </div>
        </div>
        {/* Date Views */}
        <div className="w-100">
          <div className="booking_DaysHead mt-10">
            {/* A day */}
            {tutorTimeSlots?.dates?.length > 0 ?
              tutorTimeSlots.dates.map((WeekDay, index) => {
                let dayData = new Date(WeekDay).toString().split(" ");
                return (
                  <div className="booking_DayName booking_Day" key={index}>
                    <p className="booking_DayTitle">{dayData[0]}</p>
                    <p className="booking_DayDate">{dayData[2]}</p>
                    <div className="booking_day_timeslots_list" key={index}>
                      {/* day time slots */}
                      {tutorTimeSlotsLoader || tutorTimeSlotsError !== null
                        ? null
                        : this.TimeSlots(
                            WeekDay,
                            tutorDetail.schedules,
                            dayData[0],
                            dayData[2],
                            tutorTimeSlots.data
                          )}
                    </div>
                  </div>
                );
              })  
              :
              this.state.week.map((WeekDay, index) => {
                let dayData = new Date(WeekDay).toString().split(" ");
                return (
                  <div className="booking_DayName booking_Day" key={index}>
                    <p className="booking_DayTitle">{dayData[0]}</p>
                    <p className="booking_DayDate">{dayData[2]}</p>
                    <div className="booking_day_timeslots_list" key={index}>
                      {/* day time slots */}
                      {tutorTimeSlotsLoader || tutorTimeSlotsError !== null
                        ? null
                        : this.TimeSlots(
                            WeekDay,
                            tutorDetail.schedules,
                            dayData[0],
                            dayData[2],
                            tutorTimeSlots.data
                          )}
                    </div>
                  </div>
                );
              })
            }
          </div>
          
          {tutorTimeSlotsLoader ? (
            <div className="text-center w-100 mt-20 mb-20">
              <div
                className="spinner-border"
                style={{
                  width: "2rem",
                  height: "2rem",
                  color: "#00b074",
                }}
                role="status"
              ></div>
            </div>
          ) : tutorTimeSlotsError !== null ? (
            <div className="text-center w-100 mt-20 mb-20">
              <p>No timeslots found....</p>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    tutorTimeSlots: state.tutorTimeSlots.tutorTimeSlots,
    tutorTimeSlotsError: state.tutorTimeSlots.tutorTimeSlotsError,
    tutorTimeSlotsLoader: state.tutorTimeSlots.tutorTimeSlotsLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorTimeSlots: (params) => dispatch(getTutorTimeSlots(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingCalander);
