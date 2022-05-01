import React from "react";
import { localRoutes } from "../../utils/local_routes";
import PackageCheckoutForm from "./PackagecheckoutForm";
import PackageBookingDetail from "./PackageBookingDetail";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { SetPackagesPayload } from "../../Redux/Actions/checkOutActions";
class PackageCheckout extends React.Component {
  state = {};
  componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }
  render() {
    const {
      currency,

      curency_rate,
    } = this.props;
    return (
      <div className="bg-default-2 pt-22 pt-lg-25 pb-13 pb-xxl-32">
        <div className="container">
          {/* <!-- back Button --> */}
          <div className="row justify-content-center">
            <div className="col-12 dark-mode-texts">
              <div className="mb-9">
                <Link
                  className="d-flex align-items-center ml-4"
                  to={localRoutes.student_dashboard_lessons}
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
            <PackageCheckoutForm
              packagesPayload={this.props.packagesPayload}
              currency={currency}
              curency_rate={curency_rate}
            />
            <PackageBookingDetail
              packagesPayload={this.props.packagesPayload}
              currency={currency}
              curency_rate={curency_rate}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    packagesPayload: state.checkout.packagesPayload,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetPackagesPayload: (payload, forceRedirectToCheckout) =>
      dispatch(SetPackagesPayload(payload, forceRedirectToCheckout)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PackageCheckout);
