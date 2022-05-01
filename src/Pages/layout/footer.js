import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../auth/login";
import Signup from "../auth/signup";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { localRoutes } from "../../utils/local_routes";
class Footer extends React.Component {
  state = { loginModal: false, signupModal: false };

  opneLoginModal = () => {
    this.setState({ signupModal: false });
    this.setState({ loginModal: true });
  };

  onCloseLoginModal = () => {
    this.setState({ loginModal: false });
  };

  opneSignupModal = () => {
    this.setState({ loginModal: false });
    this.setState({ signupModal: true });
  };

  onCloseSignupModal = () => {
    this.setState({ signupModal: false });
  };
  render() {
    const { AuthData, AuthError } = this.props;
    return (
      <>
        {window.location.pathname !== localRoutes.mobile_paypal_checkout &&
        window.location.pathname !==
          localRoutes.mobil_paypal_checkout_result ? (
          <footer
            className="footer bg-ebony-clay dark-mode-texts"
            id="app-foooter"
          >
            {AuthData == null ? (
              <div className="container">
                {/* <!-- Cta section --> */}
                <div className="pt-11 pt-lg-20 pb-13 pb-lg-20 border-bottom border-width-1 border-default-color-2">
                  <div className="row justify-content-center ">
                    <div className="col-xl-7 col-lg-12">
                      {/* <!-- cta-content start --> */}
                      <div className="pb-xl-0 pb-9 text-xl-left text-center">
                        <h2 className="text-white font-size-8 mb-4">
                          100% Satisfaction Guarantee
                        </h2>
                        <p className="text-hit-gray font-size-5 mb-0">
                          If you're not satisfied with your trial lesson, we
                          will give you a free replacement with another tutor or
                          a full refund.
                        </p>
                      </div>
                      {/* <!-- cta-content end --> */}
                    </div>
                    <div className="col-xl-5 col-lg-12">
                      {/* <!-- cta-btns start --> */}
                      <div className="btns d-flex justify-content-xl-end justify-content-center align-items-xl-center flex-wrap h-100  mx-n4">
                        <a
                          className="btn btn-outline-gallery btn-xl mx-4 mt-6 text-uppercase"
                          onClick={() => this.opneLoginModal()}
                        >
                          Log in
                        </a>
                        <a
                          className="btn btn-green btn-h-60 btn-xl mx-4 mt-6 text-uppercase"
                          onClick={() => this.opneSignupModal()}
                        >
                          Register
                        </a>
                      </div>
                      {/* <!-- cta-btns end --> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            <div className="container  pt-12 pt-lg-19 pb-10 pb-lg-19">
              <div className="row">
                <div className="col-lg-4 col-sm-6 mb-lg-0 mb-9">
                  {/* <!-- footer logo start --> */}
                  <img
                    src="../image/quran_teacher_logo.png"
                    alt=""
                    className="footer-logo mb-14"
                  />
                  {/* <!-- footer logo End --> */}
                  {/* <!-- media start --> */}
                  <div className="media mb-11">
                    <img
                      src="image/l1/png/message.png"
                      className="align-self-center mr-3"
                      alt=""
                    />
                    <div className="media-body pl-5">
                      <p className="mb-0 font-size-4 text-white">
                        Contact us at
                      </p>
                      <a
                        className="mb-0 font-size-4 font-weight-bold"
                        href="mailto:info@quranteacherlive.com"
                      >
                        info@quranteacherlive.com
                      </a>
                    </div>
                  </div>
                  {/* <!-- media start --> */}
                  {/* <!-- widget social icon start --> */}
                  <div className="social-icons">
                    <ul className="pl-0 list-unstyled d-flex align-items-end ">
                      <li className="d-flex flex-column justify-content-center px-3 mr-3 font-size-4 heading-default-color">
                        Follow us on:
                      </li>
                      <li className="d-flex flex-column justify-content-center px-3 mr-3">
                        <a href="https://www.facebook.com/Quran-Teacher-Live-100839295729570" target={"_blank"} className="hover-color-primary heading-default-color">
                          <i className="fab fa-facebook-f font-size-3 pt-2"></i>
                        </a>
                      </li>
                      {/* <li className="d-flex flex-column justify-content-center px-3 mr-3">
                        <a className="hover-color-primary heading-default-color">
                          <i className="fab fa-twitter font-size-3 pt-2"></i>
                        </a>
                      </li>
                      <li className="d-flex flex-column justify-content-center px-3 mr-3">
                        <a className="hover-color-primary heading-default-color">
                          <i className="fab fa-linkedin-in font-size-3 pt-2"></i>
                        </a>
                      </li> */}
                    </ul>
                  </div>
                  {/* <!-- widget social icon end --> */}
                </div>
                <div className="col-lg-8 col-md-6">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                      <div className="footer-widget widget2 mb-md-0 mb-13">
                        {/* <!-- footer widget title start --> */}
                        <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                          Company
                        </p>
                        {/* <!-- footer widget title end -->
                      <!-- widget social menu start --> */}
                        <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                          <li className="mb-6">
                            <Link
                              to={localRoutes.about_us}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              About us
                            </Link>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.tutor_list}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Find tutors
                            </Link>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.become_tutor}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Become a tutor
                            </Link>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.contact_us}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Contact us
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                      <div className="footer-widget widget3 mb-sm-0 mb-13">
                        <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                          Pages
                        </p>

                        <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                          <li className="mb-6">
                            <Link
                              to={localRoutes.features}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Features{" "}
                            </Link>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.courses}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Courses
                            </Link>
                          </li>
                          <li className="mb-6">
                            <a
                              href="https://blog.quranteacherlive.com/"
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Blog
                            </a>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.reviews}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Reviews
                            </Link>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.cities_list}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Location
                            </Link>
                          </li>
                        </ul>
                        {/* <!-- widget social menu end --> */}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                      <div className="footer-widget widget4 mb-sm-0 mb-13">
                        {/* <!-- footer widget title start --> */}
                        <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                          Courses
                        </p>
                        {/* <!-- footer widget title end --> */}
                        {/* <!-- widget social menu start --> */}
                        <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                          <li className="mb-6">
                            <a className="heading-default-color font-size-4 font-weight-normal">
                              Tajweed
                            </a>
                          </li>
                          <li className="mb-6">
                            <a className="heading-default-color font-size-4 font-weight-normal">
                              Memorization
                            </a>
                          </li>
                          <li className="mb-6">
                            <a className="heading-default-color font-size-4 font-weight-normal">
                              Juzz Amma
                            </a>
                          </li>
                        </ul>
                        {/* <!-- widget social menu end --> */}
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-6 col-sm-3 col-xs-6">
                      <div className="footer-widget widget4">
                        {/* <!-- footer widget title start --> */}
                        <p className="widget-title font-size-4 text-gray mb-md-8 mb-7">
                          Legal
                        </p>
                        {/* <!-- footer widget title end --> */}
                        <ul className="widget-links pl-0 list-unstyled list-hover-primary">
                          <li className="mb-6">
                            <Link
                              to={localRoutes.privacy_policy}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Privacy Policy
                            </Link>
                          </li>
                          <li className="mb-6">
                            <Link
                              to={localRoutes.terms_conditions}
                              className="heading-default-color font-size-4 font-weight-normal"
                            >
                              Terms & Conditions
                            </Link>
                          </li>
                          <li>
                            <a
                              href="https://apps.apple.com/us/app/quran-teacher/id1586143736"
                              title="Quran Tutor IOS APP"
                              style={{marginBottom:'10px'}}
                              target={"_blank"}
                            >
                              <img
                                src="image/appstore225x78.webp"
                                alt="Quran Tutor IOS APP"
                                className=""
                              />
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://play.google.com/store/apps/details?id=com.qurantutor"
                              title="Quran Tutor Android APP"
                              target={"_blank"}
                            >
                              <img
                                src="image/playstore225x78.webp"
                                alt="Quran Tutor Android APP"
                                className=""
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Login form Modal */}
            {AuthData == null ? (
              <Modal
                center
                open={this.state.loginModal}
                showCloseIcon={false}
                onClose={this.onCloseLoginModal}
              >
                <Login
                  onCloseLoginModal={this.onCloseLoginModal}
                  opneSignupModal={this.opneSignupModal}
                />
              </Modal>
            ) : null}
            {/* Signup formmodal */}
            {AuthData == null ? (
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
            ) : null}
          </footer>
        ) : null}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};
export default connect(mapStateToProps, null)(Footer);
