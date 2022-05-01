import React from "react";
import { Link } from "react-router-dom";

import BookingCalander from "./bookingCalander";
import { localRoutes } from "../utils/local_routes";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../Pages/auth/login";

import Signup from "../Pages/auth/signup";
import ForgetPassword from "../Pages/auth/ForgetPassword";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { SetPayload } from "../Redux/Actions/checkOutActions";
class Tutor_Booking_lesson extends React.Component {
  state = {
    loginModal: false,
    forgetPasswordModal: false,
    signupModal: false,
    booking_date: "",
    timeslot: "",
    timezone: "",
    student_Id: "",
    tutor_id: "",
    price_per_hr: "",
    timeZoneDateCheck: false,
  };

  setSelectTimeZone = () => {
    this.setState({ timeZoneDateCheck: true });
  };

  opneLoginModal = () => {
    this.setState({ signupModal: false });
    this.setState({ forgetPasswordModal: false });
    this.setState({ loginModal: true });
  };

  onCloseLoginModal = () => {
    this.setState({ loginModal: false });
  };
  opneForgetPasswordModal = () => {
    this.setState({ signupModal: false });
    this.setState({ loginModal: false });
    this.setState({ forgetPasswordModal: true });
  };

  onCloseForgetPasswordModal = () => {
    this.setState({ forgetPasswordModal: false });
  };

  opneSignupModal = () => {
    this.setState({ loginModal: false });
    this.setState({ forgetPasswordModal: false });
    this.setState({ signupModal: true });
  };

  onCloseSignupModal = () => {
    this.setState({ signupModal: false });
  };

  //Select a date and time Slot

  SetLessonDateAndTimeSlot = async (date, timeslot, timezone) => {
    const { tutorDetail, AuthData } = this.props;

    await this.setState({
      booking_date: date,
      timeslot: timeslot,
      timezone: timezone,
      student_Id: AuthData.id
        ? AuthData.id
        : AuthData.user_id == undefined || AuthData.id
        ? AuthData.id
        : AuthData.user_id == ""
        ? AuthData.user_id
        : AuthData.id
        ? AuthData.id
        : AuthData.user_id,
      tutor_id: tutorDetail.id,
      price_per_hr: tutorDetail.per_hr_rate,
    });
    let payload = {
      booking_date: date,
      timeslot: timeslot,
      timezone: timezone,
      student_Id: AuthData.id
        ? AuthData.id
        : AuthData.user_id == undefined || AuthData.id
        ? AuthData.id
        : AuthData.user_id == ""
        ? AuthData.user_id
        : AuthData.id
        ? AuthData.id
        : AuthData.user_id,
      tutor_id: tutorDetail.id,
      tutorInfo: tutorDetail,
      price_per_hr: tutorDetail.per_hr_rate,
    };
    this.props.SetPayload(payload);
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
    const { tutorDetail, AuthData } = this.props;

    return (
      <div className="bg-white border-top p-5 pl-xs-12 pt-7 pb-5 rounded-bottom-left-10 rounded-bottom-right-10" id="lesson_booking">
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
          Book a trial lesson
        </h4>
        <BookingCalander
          tutorDetail={tutorDetail}
          SetLessonDateAndTimeSlot={this.SetLessonDateAndTimeSlot}
          opneLoginModal={this.opneLoginModal}
          opneSignupModal={this.opneSignupModal}
          showMessage={this.showMessage}
          timeZoneDateCheck={() => this.setSelectTimeZone()}
        />
        <div className="d-flex justify-content-end w-100 mt-13 show_fixed_position">
          {AuthData !== null ? (
            AuthData.role !== "student" ? (
              <a
                className="btn btn-success text-uppercase font-size-3"
                onClick={() =>
                  this.showMessage(
                    "You cant book a lesson from a tutor account please login with a student account",
                    toast.TYPE.ERROR
                  )
                }
              >
                Book Trial Lesson
              </a>
            ): !this.state.timeZoneDateCheck ? (
              <a
                className="btn btn-success text-uppercase font-size-3"
                onClick={() =>
                  this.showMessage(
                    "Please select a time zone",
                    toast.TYPE.ERROR
                  )
                }
              >
                Book Trial Lesson
              </a>
            ) : this.state.timeslot == "" ? (
              <a
                className="btn btn-success text-uppercase font-size-3"
                onClick={() =>
                  this.showMessage(
                    "Please select a time slot to start booking",
                    toast.TYPE.ERROR
                  )
                }
              >
                Book Trial Lesson
              </a>
            ) : (
              <Link
                to={localRoutes.checkout}
                className="btn btn-success text-uppercase font-size-3"
              >
                Book Lesson
              </Link>
            )
          ) : (
            <a
              className="btn btn-success text-uppercase font-size-3"
              onClick={() => this.opneSignupModal()}
            >
              Book Trial Lesson
            </a>
          )}
        </div>

        {/* Login form Modal */}
        <Modal
          center
          open={this.state.loginModal}
          showCloseIcon={false}
          onClose={this.onCloseLoginModal}
        >
          <Login
            onCloseLoginModal={this.onCloseLoginModal}
            opneSignupModal={this.opneSignupModal}
            opneForgetPasswordModal={this.opneForgetPasswordModal}
          />
        </Modal>

        {/* Signup formmodal */}
        <Modal
          center
          open={this.state.signupModal}
          showCloseIcon={false}
          onClose={this.onCloseSignupModal}
        >
          <Signup
            onCloseSignupModal={this.onCloseSignupModal}
            opneLoginModal={this.opneLoginModal}
          />
        </Modal>

        {/* Forget Password formmodal */}
        <Modal
          center
          open={this.state.forgetPasswordModal}
          showCloseIcon={false}
          onClose={this.onCloseForgetPasswordModal}
        >
          <ForgetPassword
            onCloseForgetPasswordModal={this.onCloseForgetPasswordModal}
            opneLoginModal={this.opneLoginModal}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    payload: state.checkout.payload,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetPayload: (payload) => dispatch(SetPayload(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tutor_Booking_lesson);
