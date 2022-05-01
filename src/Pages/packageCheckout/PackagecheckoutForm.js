import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  ElementsConsumer,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  Elements
} from "@stripe/react-stripe-js";
import CardSection from "../../components/paymentCardsection";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContent } from "../../components/Toast";
import CardPaymentRadioBtn from "../../components/cardPaymentRadioBtn";
import PaypalPaymentRadioBtn from "../../components/paypalPaymentRadiobtn";
import axios from "axios";
import { api } from "../../utils/api_routes";
import { Redirect } from "react-router";
import { localRoutes } from "../../utils/local_routes";
import { PayPalButton } from "react-paypal-button-v2";
import Loader from "../../components/loader";

const stripePromise = loadStripe(
  "pk_live_51IqEMJJbWXYIZElI114LAZNpGeE3nFzkvoxWxWBBugWJByPvRxQUcW8ZqnILKC9shwMyensbDqXdFwXrihlOFYDc00cwfJ0m7h"
  // "pk_test_51IqEMJJbWXYIZElIOUliCk9vNvatqqjqpa6aJZ3o1giDX0DR0KvrqUjHOVUKI3FMXzFdUU6fCCahZIG9PPUNxaVh004nQPAyeq"
);
class PackageCheckoutForm extends React.PureComponent {
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
    const { packagesPayload } = this.props;
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
    const { stripe, elements } = this.props;
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(
      CardNumberElement,
      CardExpiryElement,
      CardCvcElement
    );
    const result = await stripe.createToken(card);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    if (result.error || error) {
      toast.dismiss();
      toast(() => ToastContent(result.error.message), {
        toastId: "errorToast",
        hideProgressBar: true,
        type: toast.TYPE.ERROR,
        autoClose: 10000,
      });
      this.setState({ disablePaymentButton: false });
    } else {
      const FinalPayload = {
        student_id: packagesPayload.student_id,
        instructor_id: packagesPayload.instructor_id,
        instructor_package_id: packagesPayload.instructor_package_id,
        total_hours: packagesPayload.total_hours,
        amount: packagesPayload.amount,
        payment_status: "Paid",
        gateway: "Stripe",
        token: paymentMethod.id,
      };

      axios
        .post(api.Stripe_purchasePackage, FinalPayload)
        .then((res) => {
          if (res.data[0].condition == "requires_action") {
            // Card actions
            stripe.handleCardAction(res.data[0].data).then((result) => {
              if (result.error) {
                // Show `result.error.message` in payment form
                toast.dismiss();
                toast(() => ToastContent(result.error.message), {
                  toastId: "errToas",
                  hideProgressBar: true,
                  type: toast.TYPE.ERROR,
                  autoClose: 2000,
                });
                this.setState({ loading: false });
              } else {
                // The card action has been handled
                // The PaymentIntent can be confirmed again on the server
                FinalPayload["payment_intent_id"] = result.paymentIntent.id;
                // Second Api Call
                axios
                  .post(api.Stripe_purchasePackage, FinalPayload)
                  .then((res) => {
                    toast.dismiss();
                    toast(() => ToastContent("Payment successful"), {
                      toastId: "successToast",
                      hideProgressBar: true,
                      type: toast.TYPE.SUCCESS,
                      autoClose: 2000,
                    });

                    this.setState({ paymentSuccess: true });
                    this.setState({ loading: false });
                  })
                  .catch((err) => {
                    console.error(err);
                    toast.dismiss();
                    toast(
                      () =>
                        ToastContent(
                          "An unknown error acccoured while making payment"
                        ),
                      {
                        toastId: "errToas",
                        hideProgressBar: true,
                        type: toast.TYPE.ERROR,
                        autoClose: 2000,
                      }
                    );
                    this.setState({ loading: false });
                  });
                //  Second Api call End
              }
            });
            // Card Action End
          } else {
            toast.dismiss();
            toast(() => ToastContent("Payment successful"), {
              toastId: "successToast",
              hideProgressBar: true,
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            });

            this.setState({ paymentSuccess: true });
            this.setState({ loading: false });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.dismiss();
          toast(
            () =>
              ToastContent("An unknown error acccoured while making payment"),
            {
              toastId: "errToas",
              hideProgressBar: true,
              type: toast.TYPE.ERROR,
              autoClose: 2000,
            }
          );
          this.setState({ disablePaymentButton: false });
        });
    }
  };

  //handle Paymentmethod change
  handlePaymentMethodChange = (method) => {
    if (method == "paypal") {
      this.fetchPaypalSettings();
    }
    this.setState({ PaymentMethod: method });
  };

  //fetch payPa Settings
  fetchPaypalSettings = () => {
    axios
      .get(api.getPaypalSettings)
      .then(async (res) => {
        await this.setState({ paypalSettings: res.data });
        await this.setState({ loading: false });
      })
      .catch((err) => {
        console.error("error in paypal setting fetch", err);
      });
  };
  //PayPal Lesson  Create Api After payment
  PaypalCheckout = (paymentDetails) => {
    const { packagesPayload } = this.props;
    const FinalPayload = {
      student_id: packagesPayload.student_id,
      instructor_id: packagesPayload.instructor_id,
      instructor_package_id: packagesPayload.instructor_package_id,
      total_hours: packagesPayload.total_hours,
      amount: packagesPayload.amount,
      payment_status: "Paid",
      gateway: "Paypal",
      transaction_id: paymentDetails.id,
    };

    toast.dismiss();
    toast(() => ToastContent("Please wait"), {
      toastId: "info",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
      autoClose: false,
    });
    axios
      .post(api.Stripe_purchasePackage, FinalPayload)
      .then((res) => {
        if ((res.data.message = "success")) {
          toast.dismiss();
          toast(() => ToastContent("Payment successful"), {
            toastId: "successToast",
            hideProgressBar: true,
            type: toast.TYPE.SUCCESS,
            autoClose: 2000,
          });

          this.setState({ paymentSuccess: true });
          this.setState({ loading: false });
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
        this.setState({ loading: false });
      });
  };

  //PayPal payment Button
  PayPalButton = (paypalSettings) => {
    {
      return (
        <PayPalButton
          amount={this.props.packagesPayload.amount}
          // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
          onSuccess={(details, data) => {
            // OPTIONAL: Call your server to save the transaction
            return this.PaypalCheckout(details);
          }}
          options={{
            clientId: paypalSettings.client_id,
            currency: "USD",
          }}
          style={{ color: "blue" }}
        />
      );
    }
  };

  render() {
    const {
      currency,

      curency_rate,
    } = this.props;
    if (this.state.paymentSuccess) {
      return <Redirect to={localRoutes.paymentSuccessful} />;
    }
    return (
      <div className="col-12 col-xxl-5 col-lg-5 col-md-12 mb-4">
        <div className="pl-lg-5">
          {/* <!-- Top Start --> */}
          <div className="bg-white shadow-9 rounded-4 p-10 ">
            <h6 className="font-size-4 text-gray font-weight-semi-bold mb-8">
              Secure checkout
            </h6>

            <p className="font-size-4 text-gray mb-0">Payment method</p>
            <p className="font-size-2">
              <i className="fa fa-lock mr-2 text-green mb-7"></i>It's safe to
              pay on Quran tutor. All transactions are protected by SSL
              encryption
            </p>

            <div className="row d-flex  justify-content-center">
              <div className="col-12">
                <CardPaymentRadioBtn
                  handlePaymentMethodChange={this.handlePaymentMethodChange}
                  PaymentMethod={this.state.PaymentMethod}
                />
              </div>
              <div className="col-12">
                <PaypalPaymentRadioBtn
                  handlePaymentMethodChange={this.handlePaymentMethodChange}
                  PaymentMethod={this.state.PaymentMethod}
                />
              </div>
            </div>
            {this.state.PaymentMethod == "card" ? (
              <form onSubmit={this.handleSubmit} style={{ marginTop: "0rem" }}>
                <CardSection />
                <div className="d-flex justify-content-end mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary btn-medium  rounded-5 "
                    disabled={
                      this.state.disablePaymentButton == true ? true : false
                    }
                  >
                    Pay safely{" "}
                    {this.props.packagesPayload.amount !== ""
                      ? currency == "GBP"
                        ? "£ " + this.props.packagesPayload.amount
                        : "$ " +
                          parseInt(
                            this.props.packagesPayload.TutorPackage.total_hours
                          ) *
                            parseInt(
                              parseInt(
                                this.props.packagesPayload.TutorPackage.pp_hour
                              ) * curency_rate
                            )
                      : ""}
                  </button>
                </div>
              </form>
            ) : (
              <div className="d-flex justify-content-center mt-8 w-100 paypal-container">
                {this.state.loading ? (
                  <Loader />
                ) : (
                  this.PayPalButton(this.state.paypalSettings)
                )}
              </div>
            )}
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

export default function InjectedCheckoutForm({
  packagesPayload,
  currency,
  curency_rate,
}) {
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ stripe, elements }) => (
          <PackageCheckoutForm
            stripe={stripe}
            elements={elements}
            packagesPayload={packagesPayload}
            currency={currency}
            curency_rate={curency_rate}
          />
        )}
      </ElementsConsumer>
    </Elements>
  );
}
