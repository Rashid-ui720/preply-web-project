import React from "react";
import { Link, Redirect } from "react-router-dom";
import { localRoutes } from "../../../utils/local_routes";
import { connect } from "react-redux";
import { getTutorDetail } from "../../../Redux/Actions/tutorDetailAction";

import { SetPackagesPayload } from "../../../Redux/Actions/checkOutActions";
import Loader from "../../../components/loader";
import ErrorMessage from "../../../components/ErrorMessage";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { BaseUrl } from "../../../utils/api_routes";
class StudentBuyPackageModal extends React.Component {
  state = { forceRedirect: false };
  componentDidMount() {
    this.props.getTutorDetail(this.props.tutor_id);
  }

  forceRedirectToCheckout = () => {
    this.setState({ forceRedirect: true });
  };

  selectedPackage = (TutorPackage) => {
    const { tutorDetail, AuthData } = this.props;
    let payLoad = {
      student_id: AuthData.id ? AuthData.id : AuthData.user_id,
      instructor_id: tutorDetail.id,
      instructor_package_id: TutorPackage.id,
      total_hours: TutorPackage.total_hours,
      amount:
        parseInt(TutorPackage.total_hours) * parseInt(TutorPackage.pp_hour),
      payment_status: "Paid",
      tutorDetail: tutorDetail,
      TutorPackage: TutorPackage,
    };
    this.props.SetPackagesPayload(payLoad, this.forceRedirectToCheckout);
  };
  PackageCard = (Tutorpackage, index) => {
    const { currency, curency_rate } = this.props;
    return (
      <div key={index}>
        {/* <!-- card-header start --> */}
        <div className="card border-mercury rounded-8 mb-lg-3 ">
          <div className="card-header bg-transparent border-hit-gray-opacity-5 text-center pt-6 pb-2">
            <div className="pricing-title text-center">
              <h5 className="font-weight-semibold font-size-3 text-black-2">
                {Tutorpackage.title}
              </h5>
            </div>
            <h2 className="mt-4 text-dodger font-size-6">
              {Tutorpackage.pp_hour !== ""
                ? currency == "GBP"
                  ? "£ " + Tutorpackage.pp_hour
                  : "$ " +
                    parseInt(curency_rate * parseInt(Tutorpackage.pp_hour))
                : ""}
              <span className="font-size-4 text-smoke font-weight-normal">
                /hr
              </span>{" "}
            </h2>
          </div>

          <div className="card-body px-6 pt-2 pb-6 d-flex align-items-center flex-column">
            <ul className="list-unstyled align-items-center justify-content-center d-flex flex-column">
              <li
                className="mb-6  font-weight-bold d-flex font-size-4"
                style={{ minHeight: "1.5rem" }}
              >
                <span className="badge badge-primary m-0 pt-4  pb-4">
                  {Tutorpackage.discount_detail == null ||
                  Tutorpackage.discount_detail == "" ||
                  Tutorpackage.discount_detail == "0"
                    ? ""
                    : `You save  ${
                        currency == "GBP"
                          ? "£" + Tutorpackage.discount_detail
                          : "$" +
                            parseInt(
                              curency_rate *
                                parseInt(Tutorpackage.discount_detail)
                            )
                      }`}
                </span>
              </li>
              <li className="mb-6 text-black-2 d-flex font-size-4">
                <i className="fas fa-clock font-size-3 text-black-2 mr-3"></i>{" "}
                {Tutorpackage.total_hours} Total Hours
              </li>
              <li className="mb-6 text-black-2 d-flex font-size-4">
                <span className="text-primary mr-2">
                  {currency == "GBP"
                    ? "£ " +
                      parseInt(Tutorpackage.total_hours) *
                        parseInt(Tutorpackage.pp_hour)
                    : "$ " +
                      parseInt(Tutorpackage.total_hours) *
                        parseInt(parseInt(Tutorpackage.pp_hour) * curency_rate)}
                </span>
                Package Price
              </li>
            </ul>
            <div className="">
              <button
                className="btn btn-green"
                onClick={() => this.selectedPackage(Tutorpackage)}
              >
                Choose
              </button>
            </div>
          </div>
          {/* {Tutorpackage.discount_detail == null ||
          Tutorpackage.discount_detail == "" ||
          Tutorpackage.discount_detail == "0" ? null : (
            <div
              className="mb-6  d-flex font-size-2 position-absolute badge-primary badge "
              style={{ right: "0px" }}
            >
              <p className="m-0 text-white font-size-2">
                {Tutorpackage.discount_detail}% off
              </p>
            </div>
          )} */}
        </div>
      </div>
    );
  };

  render() {
    const { tutorDetail, tutorDetailError, tutorDetailLoader, AuthData } =
      this.props;
    if (this.state.forceRedirect) {
      return <Redirect to={localRoutes.packageCheckout} />;
    }
    if (tutorDetailLoader) {
      return (
        <div className="mt-35 mb-30 min-width-60">
          <Loader />
        </div>
      );
    }
    if (tutorDetailError !== null) {
      return (
        <div className="mt-35 mb-30">
          <ErrorMessage message="An unkown error accoured while fetching tutor data" />
        </div>
      );
    }
    return (
      <div className="bg-white select_packages_modal_width position-relative">
        <button
          onClick={() => this.props.onCloseBuyPackageModal()}
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-white rounded-4 border border-mercury shadow-9 pt-10 pb-10">
          <div className="row d-flex flex-column align-items-center">
            <div className="col-12 d-flex flex-column align-items-center ">
              <img
                className="profile-image-package-booking "
                src={
                  tutorDetail.user_img == null
                    ? `image/l3/png/userAvtar.webp`
                    : `${BaseUrl}/UserProfile/Images/${tutorDetail.user_img}`
                }
                alt=""
              />
              <h6 className="mt-5 mb-0 ml-0 mr-0 text-center">
                {tutorDetail.fname}
              </h6>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 px-10 d-flex flex-column align-items-center">
              <h4>Please select a package</h4>
              <OwlCarousel
                className="owl-theme   d-flex flex-column "
                nav={true}
                dots={true}
                margin={10}
                responsive={{
                  0: {
                    items: 1,
                  },
                  600: {
                    items: 3,
                  },
                  1000: {
                    items: 3,
                  },
                }}
              >
                {/* Free lancer cards */}
                {tutorDetail.packages.map((Tutorpackage, index) => {
                  return this.PackageCard(Tutorpackage, index);
                })}
              </OwlCarousel>
              {/* {tutorDetail.packages.map((Tutorpackage, index) => {
                console.error(Tutorpackage);

                return this.PackageCard(Tutorpackage, index);
              })} */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    tutorDetail: state.tutorDetail.tutorDetail,
    tutorDetailError: state.tutorDetail.tutorDetailError,
    tutorDetailLoader: state.tutorDetail.tutorDetailLoader,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDetail: (tutor_id) => dispatch(getTutorDetail(tutor_id)),
    SetPackagesPayload: (payload, forceRedirectToCheckout) =>
      dispatch(SetPackagesPayload(payload, forceRedirectToCheckout)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentBuyPackageModal);
