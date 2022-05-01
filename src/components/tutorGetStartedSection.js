import React from "react";
import { Component } from "react";
import "../cssmodule/chatStyles.css";

class tutorGetStartedSection extends Component {
  render() {
    return (
      <>
        <section id="tutor_back" className="tutor_bg pt-13 pt-lg-20 pb-lg-20">
          {/* <!-- Section Top --> */}
          <div className="row align-items-center justify-content-center">
            {/* <!-- Section Title --> */}
            <div className="col-12 col-xl-7 col-lg-7 col-md-9">
              <div className="text-center mb-12 mb-lg-12">
                <h2 className="font-size-9 font-weight-bold mb-8 text-white">
                  Want to Get Started? Here’s how:
                </h2>
                <p className="font-size-5 px-5 px-lg-7 px-xl-9 px-xxl-15 mb-6 text-white">
                  With Quran Teacher Live, registration is a smooth process. Get
                  verified, upgrade your business, get paid securely.
                </p>
              </div>
            </div>
          </div>
          {/* <!-- End Section Top --> */}
          <div
            className="row justify-content-center"
            data-aos="fade-right"
            data-aos-duration="800"
            data-aos-once="true"
          >
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-2 col-lg-4 col-sm-6 col-xs-8">
              <a className="bg-lightdark border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-6 mb-9 d-block w-100 text-center">
                <div className="text-white bg-blue square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                  <i className="fa fa-image"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1"></h5>
                  <p className="font-size-4 font-weight-normal text-white">
                    <span></span> Sign up and create a free profile
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-2 col-lg-4 col-sm-6 col-xs-8">
              <a className="bg-lightdark border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-6 mb-9 d-block w-100 text-center">
                <div className="text-white bg-spray square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                  <i className="fa fa-calendar"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1"></h5>
                  <p className="font-size-4 font-weight-normal text-white">
                    <span></span> Message Students to arrange lessons
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-2 col-lg-4 col-sm-6 col-xs-8">
              <a className="bg-lightdark border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-6 mb-9 d-block w-100 text-center">
                <div className="text-white bg-coral square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                  <i className="fa fa-edit"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1"></h5>
                  <p className="font-size-4 font-weight-normal text-white">
                    <span></span> Book in sessions to match your timetable
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-2 col-lg-4 col-sm-6 col-xs-8">
              <a className="bg-lightdark border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-6 mb-9 d-block w-100 text-center">
                <div className="text-white bg-red square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                  <i className="fa fa-shopping-cart"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1"></h5>
                  <p className="font-size-4 font-weight-normal text-white">
                    <span></span> Teach! Enjoy helping students progress
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
            {/* <!-- Single Category --> */}
            <div className="col-12 col-xl-2 col-lg-4 col-sm-6 col-xs-8">
              <a className="bg-lightdark border border-color-2 rounded-4 pl-5 pt-10 pb-3 px-2 hover-shadow-6 mb-9 d-block w-100 text-center">
                <div className="text-white bg-orange square-70 rounded-4 mb-7 font-size-7 text-center mx-auto">
                  <i className="fa fa-star"></i>
                </div>
                {/* <!-- Category Content --> */}
                <div className="">
                  <h5 className="font-size-5 font-weight-semibold text-black-2 line-height-1"></h5>
                  <p className="font-size-4 font-weight-normal text-white">
                    <span></span> Get paied straight into your bank account
                  </p>
                </div>
              </a>
            </div>
            {/* <!-- End Single Category --> */}
          </div>
        </section>
      </>
    );
  }
}

export default tutorGetStartedSection;
