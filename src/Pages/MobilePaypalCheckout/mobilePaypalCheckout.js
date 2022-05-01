import React from "react";

import axios from "axios";
import { api } from "../../utils/api_routes";
import { Redirect } from "react-router";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../../components/loader";
import { localRoutes } from "../../utils/local_routes";
class MobilePaypalCheckout extends React.PureComponent {
  state = {
    paymentSuccess: null,
    paymentError: null,
    student_id: null,
    instructor_id: null,
    time_slot: null,
    booked_date: null,
    timezone: null,
    appointment_status: "Booked",
    gateway: "Paypal",
    currency: "GBP",
    price: null,
    payment_status: "succeeded",
    //packages Checkout State
    instructor_package_id: null,
    total_hours: null,
    amount: null,
    queryError: false,
    loading: true,

    paypalSettings: {},
    checkout_type: null,
  };

  async componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var query = urlParams.get("query");
    if (query !== null) {
      //checkout type appointment
      if (urlParams.get("checkout_type").trim() == "appointment") {
        let student_id = urlParams.get("student_id").trim();
        let instructor_id = urlParams.get("instructor_id").trim();
        let time_slot = urlParams.get("time_slot").trim();
        let booked_date = urlParams.get("booked_date").trim();
        let timezone = urlParams.get("timezone").trim();
        let price = urlParams.get("price").trim();
        let checkout_type = urlParams.get("checkout_type").trim();

        await this.setState({
          student_id: parseInt(student_id),
          instructor_id: parseInt(instructor_id),
          time_slot: time_slot,
          booked_date: booked_date,
          timezone: timezone,
          price: parseInt(price),
          queryError: false,
          checkout_type: checkout_type,
        });
      }
      //checkout type packages
      else {
        let student_id = urlParams.get("student_id").trim();
        let instructor_id = urlParams.get("instructor_id").trim();
        let instructor_package_id = urlParams
          .get("instructor_package_id")
          .trim();
        let total_hours = urlParams.get("total_hours").trim();
        let amount = urlParams.get("amount").trim();
        let checkout_type = urlParams.get("checkout_type").trim();
        await this.setState({
          student_id: parseInt(student_id),
          instructor_id: parseInt(instructor_id),
          instructor_package_id: parseInt(instructor_package_id),
          total_hours: parseInt(total_hours),
          amount: parseInt(amount),
          queryError: false,
          checkout_type: checkout_type,
        });
      }

      axios
        .get(api.getPaypalSettings)
        .then(async (res) => {
          await this.setState({ paypalSettings: res.data });
          await this.setState({ loading: false });
        })
        .catch((err) => {
          console.error("error in paypal setting fetch", err);
        });
    } else {
      await this.setState({
        queryError: true,
        loading: false,
      });
    }
  }
  GetFormattedDate = (date) => {
    var todayTime = new Date(date);
    var month = todayTime.getMonth() + 1;
    var day = todayTime.getDate();
    var year = todayTime.getFullYear();
    var newMonth = month < 10 ? `0${month}` : month;
    var newDay = day < 10 ? `0${day}` : day;
    return year + "-" + newMonth + "-" + newDay;
  };

  //PayPal Lesson  Create Api After payment
  PaypalTrailAppointmentCheckout = (paymentDetails) => {
    const FinalPayload = {
      student_id: this.state.student_id,
      instructor_id: this.state.instructor_id,
      time_slot: this.state.time_slot,
      booked_date: this.GetFormattedDate(this.state.booked_date),
      timezone: this.state.timezone,
      appointment_status: "Booked",
      gateway: "Paypal",
      currency: "GBP",
      price: this.state.price,
      payment_status: "succeeded",
      created: this.GetFormattedDate(new Date()),
      transaction_id: paymentDetails.id,
    };

    this.setState({ loading: true });
    axios
      .post(api.paypal_trail_appoitment, FinalPayload)
      .then((res) => {
        if ((res.data.message = "success")) {
          window.location.replace(
            localRoutes.mobil_paypal_checkout_result + "?message=success"
          );
        }
      })
      .catch((err) => {
        console.error(err);
        window.location.replace(
          localRoutes.mobil_paypal_checkout_result + "?message=error"
        );
      });
  };

  //packages chekcout
  PaypalPackagesCheckout = (paymentDetails) => {
    const FinalPayload = {
      student_id: this.state.student_id,
      instructor_id: this.state.instructor_id,
      instructor_package_id: this.state.instructor_package_id,
      total_hours: this.state.total_hours,
      amount: this.state.amount,
      payment_status: "Paid",
      gateway: "Paypal",
      transaction_id: paymentDetails.id,
    };

    this.setState({ loading: true });
    axios
      .post(api.Stripe_purchasePackage, FinalPayload)
      .then((res) => {
        if ((res.data.message = "success")) {
          window.location.replace(
            localRoutes.mobil_paypal_checkout_result + "?message=success"
          );
        }
      })
      .catch((err) => {
        console.error(err);

        window.location.replace(
          localRoutes.mobil_paypal_checkout_result + "?message=error"
        );
      });
  };
  //PayPal payment Button
  PayPalButton = (paypalSettings) => {
    {
      return (
        <PayPalButton
          amount={
            this.state.checkout_type == "appointment"
              ? this.state.price
              : this.state.amount
          }
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            // OPTIONAL: Call your server to save the transaction
            return this.state.checkout_type == "appointment"
              ? this.PaypalTrailAppointmentCheckout(details)
              : this.PaypalPackagesCheckout(details);
          }}
          options={{
            clientId: paypalSettings.client_id,
            currency: "GBP",
          }}
          style={{ color: "blue" }}
        />
      );
    }
  };
  render() {
    if (this.state.loading) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <div className="col-12 col-xxl-5 col-lg-5 col-md-12 mb-4 ml-auto mr-auto mt-10">
            <div className="pl-lg-5">
              {/* <!-- Top Start --> */}
              <div className="bg-white  p-10 ">
                <Loader />
              </div>
            </div>
          </div>
        </div>
      );
    }
    if (this.state.queryError) {
      return (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <div className="col-12 col-xxl-5 col-lg-5 col-md-12 mb-4 ml-auto mr-auto mt-10">
            <div className="pl-lg-5">
              {/* <!-- Top Start --> */}
              <div className="bg-white  p-10 ">
                <div
                  style={{
                    width: "100%",
                    minHeight: "6rem",
                    marginBottom: "4rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "50px",
                  }}
                >
                  <div className="text-center w-100">
                    <h3
                      className=" font-size-4 text-center"
                      style={{
                        marginLeft: "10px",
                        marginTop: "10px",
                      }}
                    >
                      An error accoured in payload data
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <div className="col-12 col-xxl-5 col-lg-5 col-md-12 mb-4 ml-auto mr-auto mt-10">
          <div className="pl-lg-5">
            {/* <!-- Top Start --> */}
            <div className="bg-white p-10 ">
              <h6 className="font-size-4 text-gray font-weight-semi-bold mb-8">
                Secure checkout
              </h6>

              <p className="font-size-4 text-gray mb-0">Payment method</p>
              <p className="font-size-2">
                <i className="fa fa-lock mr-2 text-green mb-7"></i>It's safe to
                pay on Quran tutor. All transactions are protected by SSL
                encryption
              </p>

              <h5 className="font-size-4 m-0">
                Please select an option to pay
              </h5>

              <div className="d-flex justify-content-center mt-8 w-100 paypal-container">
                {this.PayPalButton(this.state.paypalSettings)}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MobilePaypalCheckout;
