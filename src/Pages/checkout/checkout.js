import React from "react";
import { localRoutes } from "../../utils/local_routes";
import CheckoutForm from "./checkoutForm";
import CheckoutFreeTrail from "./checkoutFreeTrailAppointmentForm";
import BookingDetail from "./BookingDetail";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SetPayload } from "../../Redux/Actions/checkOutActions";
class Checkout extends React.Component {
  state = {};
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  render() {
    const { currency, curency_rate, free_appointment } = this.props;
    return (
      <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
        <div className="container">
          {/* <!-- back Button --> */}
          <div className="row justify-content-center">
            <div className="col-12 dark-mode-texts">
              <div className="mb-9">
                <Link
                  className="d-flex align-items-center ml-4"
                  to={localRoutes.tutor_list}
                >
                  <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                  <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                    Back
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* <!-- back Button End --> */}
          <div className="row justify-content-center ">
            {parseInt(free_appointment) === 0 ? (
              <CheckoutForm
                payload={this.props.payload}
                currency={currency}
                curency_rate={curency_rate}
                free_appointment={free_appointment}
              />
            ) : 
            <CheckoutFreeTrail
              payload={this.props.payload}
              currency={currency}
              curency_rate={curency_rate}
              free_appointment={free_appointment}
            />
            }
            <BookingDetail
              payload={this.props.payload}
              currency={currency}
              curency_rate={curency_rate}
              free_appointment={free_appointment}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    payload: state.checkout.payload,
    currency: state.currency.currency,
    curency_rate: state.currency.curency_rate,
    free_appointment: state.Auth.FreeAppoinment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDetail: (payload) => dispatch(SetPayload(payload)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
