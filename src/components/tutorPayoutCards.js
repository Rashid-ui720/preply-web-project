import React from "react";
import { connect } from "react-redux";
class TutorPayoutCards extends React.Component {
  state = {};
  render() {
    const { revenue, completedpayout, pending, currency, curency_rate } =
      this.props;

    return (
      <div className="row mb-7">
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-blue bg-blue-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fa fa-money-bill-wave"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">
                  {" "}
                  {revenue !== ""
                    ? currency == "GBP"
                      ? "£ " + parseInt(revenue)
                      : "$ " + parseInt(curency_rate * parseInt(revenue))
                    : ""}
                </span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Total Revenue
              </p>
            </div>
          </a>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-check"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">
                  {completedpayout !== ""
                    ? currency == "GBP"
                      ? "£ " + parseInt(completedpayout)
                      : "$ " +
                        parseInt(curency_rate * parseInt(completedpayout))
                    : ""}
                </span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Completed Payout
              </p>
            </div>
          </a>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-sm-6">
          <a
            href="#"
            className="media bg-white rounded-4 pl-8 pt-9 pb-9 pr-7 hover-shadow-1 mb-9 shadow-8"
          >
            <div className="text-pink bg-pink-opacity-1 circle-56 font-size-6 mr-7">
              <i className="fas fa-clock"></i>
            </div>

            <div className="">
              <h5 className="font-size-8 font-weight-semibold text-black-2 line-height-reset font-weight-bold mb-1">
                <span className="counter">
                  {pending !== ""
                    ? currency == "GBP"
                      ? "£ " + parseInt(pending)
                      : "$ " + parseInt(curency_rate * parseInt(pending))
                    : ""}
                </span>
              </h5>
              <p className="font-size-4 font-weight-normal text-gray mb-0">
                Pending Payout
              </p>
            </div>
          </a>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};

export default connect(mapStateToProps, null)(TutorPayoutCards);
