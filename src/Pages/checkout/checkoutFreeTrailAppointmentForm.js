import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import axios from "axios";
import { api } from "../../utils/api_routes";
import { Redirect } from "react-router";
import { localRoutes } from "../../utils/local_routes";
import Loader from "../../components/loader";

class CheckoutFreeTrail extends React.PureComponent {
  state = {
    paymentSuccess: null,
    selectedSlot: null,
    PaymentMethod: "card",
    loading: true,
    disablePaymentButton: false,
    paypalSettings: {},
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
  //handle Stripe Checkout
  handleSubmit = async (event) => {
    // const { payload } = this.props;
    let payload = this.props.payload;
    this.setState({ disablePaymentButton: true });
    event.preventDefault();
    toast.dismiss();
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: false,
    });
    // handle payment
    const { free_appointment } = this.props;
    const FinalPayload = {
      student_id: payload.student_Id,
      instructor_id: payload.tutor_id,
      time_slot: payload.timeslot,
      booked_date: this.GetFormattedDate(payload.booking_date),
      timezone: payload.timezone,
      appointment_status: "Booked",
      gateway: "none",
      currency: "none",
      price: 0,
      payment_status: "Free",
      created: this.GetFormattedDate(new Date()),
      token: "",
    };
    this.setState({ paymentSuccess: false });
    axios
      .post(api.stripeTrailPayment, FinalPayload)
      .then((res) => {
        toast.dismiss();
        
          if(res.data?.error === 1) {
            toast(() => ToastContent(res.data.msg), {
              toastId: "errToas",
              hideProgressBar: true,
              type: toast.TYPE.ERROR,
              autoClose: 2000
            })
          }else{
            toast(() => ToastContent("You have successfully booked a free appointment"), {
              toastId: "successToast",
              hideProgressBar: true,
              type: toast.TYPE.SUCCESS,
              autoClose: 2000
            })
            this.setState({ paymentSuccess: true })
            this.setState({ loading: false })
          }
      })
      .catch((err) => {
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
        this.setState({ disablePaymentButton: false });
      });
  };

  render() {
    const { currency, curency_rate, payload } = this.props;
    if (this.state.paymentSuccess) {
      return <Redirect to={localRoutes.appointment_booked} />;
    }
    return (
      <div className="col-12 col-xxl-5 col-lg-5 col-md-12 mb-4">
        <div className="pl-lg-5">
          {/* <!-- Top Start --> */}
          <div className="bg-white shadow-9 rounded-4 p-10 ">
            <h6 className="font-size-4 text-gray font-weight-semi-bold mb-8">
              Book Free Appointment
            </h6>

            <p className="font-size-4 text-gray mb-0">Payment method</p>
            <p className="font-size-2">
              <i className="fa fa-lock mr-2 text-green mb-7"></i>No payment
              method required
            </p>

            <form onSubmit={this.handleSubmit} style={{ marginTop: "0rem" }}>
              <div className="d-flex justify-content-end mt-8">
                <button
                  type="submit"
                  className="btn btn-primary btn-medium  rounded-5 "
                  disabled={
                    this.state.disablePaymentButton == true ? true : false
                  }
                >
                  Book Free Appointment{" "}
                </button>
              </div>
            </form>
            <div className="border-bottom border-mercury w-100 mt-7"></div>
            <div className="row p-0 mt-6">
              <div className="col-lg-2 col-md-2 col-sm-12 d-flex justify-content-center align-items-center">
                <i className="fas fa-ribbon  guarentyIcon"></i>
              </div>
              <div className="col-lg-10 col-md-10 col-sm-12 ">
                <h5 className="font-size-4 m-0">
                  Learn with 100% satisfaction guarantee
                </h5>
                <p className="font-size-3 m-0">
                  If your lesson does not take place, or you are not satisfied
                  with the tutor, we will provide you with a free replacement to
                  another tutor of your choice or offer you a full refund.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CheckoutFreeTrail;
