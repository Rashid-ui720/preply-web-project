import React from "react";
import { Link, Redirect } from "react-router-dom";

import BookingCalander from "../../../components/bookingCalander";
import { localRoutes } from "../../../utils/local_routes";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../../utils/api_routes";
import SelectSearch from "react-select";
class Booking_lesson extends React.Component {
  state = {
    booked_date: "",
    time_slot: "",
    timezone: "",
    student_id: "",
    instructor_id: "",
    appointment_status: "",
    gateway: "",
    currency: "",
    price: "",
    payment_status: "",
    created: "",
    token: "",
    child_info: "",
    LessonBookedSuccess: false,
    timeZoneDateCheck: false,
  };

  setSelectTimeZone = () => {
    this.setState({ timeZoneDateCheck: true });
  };

  GetFormattedDate = (date) => {
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var newMonth = month < 10 ? `0${month}` : month;
    var newDay = day < 10 ? `0${day}` : day;
    return year + "-" + newMonth + "-" + newDay;
  };

  //Select a date and time Slot

  SetLessonDateAndTimeSlot = async (date, timeslot, timezone) => {
    const { tutorDetail, AuthData } = this.props;
    await this.setState({
      booked_date: this.GetFormattedDate(date),
      time_slot: timeslot,
      timezone: timezone,
      student_id: AuthData.id
        ? AuthData.id
        : AuthData.user_id == undefined || AuthData.id
        ? AuthData.id
        : AuthData.user_id == ""
        ? AuthData.user_id
        : AuthData.id
        ? AuthData.id
        : AuthData.user_id,
      instructor_id: tutorDetail.id,
      appointment_status: "booked",
      gateway: "Stripe",
      currency: "GBP",
      price: 0,
      payment_status: "credits",
      created: this.GetFormattedDate(new Date()),
      token: "DUMMY_TOKEN_XYZWE_122_UION_SDAS_LKIFGH",
    });
  };

  schedualLesson = () => {
    let payload = {
      booked_date: this.state.booked_date,
      time_slot: this.state.time_slot,
      timezone: this.state.timezone,
      student_id: this.state.student_id,
      instructor_id: this.state.instructor_id,
      appointment_status: "booked",
      gateway: "Stripe",
      currency: "GBP",
      price: 0,
      payment_status: "credits",
      created: this.state.created,
      token: "DUMMY_TOKEN_XYZWE_122_UION_SDAS_LKIFGH",
      child_info: this.state.child_info,
    };
    toast.dismiss();
    toast(() => ToastContent("Please Wait.."), {
      toastId: "infotoast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.stripeTrailPayment, payload)
      .then((res) => {
        if ((res.data.message = "success")) {
          toast.dismiss();
          toast(() => ToastContent("Lesson successfully Booked"), {
            toastId: "successToast",
            hideProgressBar: true,
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
          });
          this.setState({ LessonBookedSuccess: true });
        }
      })
      .catch((err) => {
        console.error(err);
        toast.dismiss();
        toast(
          () => ToastContent("An unknown error acccoured while making payment"),
          {
            toastId: "errToas",
            hideProgressBar: true,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          }
        );
      });
  };

  showMessage = (message, type) => {
    toast.dismiss();
    toast(() => ToastContent(message), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: type,
    });
  };

  render() {
    const { tutorDetail, AuthData , ParentChild} = this.props;
    if (this.state.LessonBookedSuccess) {
      return <Redirect to={localRoutes.student_dashboard_lessons} />;
    }
    return (
      <div
        className="border-top p-5 pl-xs-12 pt-7 pb-5 mb-8 mb-md-18"
        id="lesson_booking"
      >
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
          Book a trail lesson
        </h4>
        <BookingCalander
          tutorDetail={tutorDetail}
          SetLessonDateAndTimeSlot={this.SetLessonDateAndTimeSlot}
          showMessage={this.showMessage}
          timeZoneDateCheck={() => this.setSelectTimeZone()}
        />

        <div className="form-group">
          <label
            htmlFor="fullname"
            className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
          >
            Please select your child for appointment
          </label>
          <SelectSearch
            onChange={(e) => this.setState({ child_info: e.value })}
            options={ParentChild}
            isSearchable={true}
          />
          {/* <input
            type="text"
            className="form-control"
            placeholder="Ful name"
            id="name"
            required
            value={this.state.child_info}
            onChange={(e) => this.setState({ child_info: e.target.value })}
          /> */}
        </div>

        <div className="d-flex justify-content-end w-100 mt-13">
          {this.state.time_slot == "" || (ParentChild.length > 0 && this.state.child_info == "") ? (
            <a
              className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
              onClick={() =>
                this.showMessage(
                  "Please select a time slot and provide kid name to start booking",
                  toast.TYPE.ERROR
                )
              }
            >
              Book Lesson
            </a>
          ) :
          !this.state.timeZoneDateCheck ? (
            <a
              className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
              onClick={() =>
                this.showMessage(
                  "Please select a time zone",
                  toast.TYPE.ERROR
                )
              }
            >
              Book Trial Lesson
            </a>
          )
          :
          (
            <a
              className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
              onClick={() => this.schedualLesson()}
            >
              Book Lesson
            </a>
          )}
        </div>
      </div>
    );
  }
}

export default Booking_lesson;
