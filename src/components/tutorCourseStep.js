import React from "react";
import { Component } from "react";

class tutorCourseStep extends Component {
  render() {
    return (
      <>
        <div className="pt-11 pt-lg-20 pb-7 pb-lg-18 accordion-bg">
          <div className="container">
            {/* <!-- Services Content --> */}
            <div
              className="row justify-content-center"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-once="true"
            >
              {/* <!-- Single Services --> */}
              <div className="col-12 col-lg-4 col-md-6 col-sm-8 col-xs-8">
                <div className="px-xl-7 px-xxl-12 pt-5 pb-3 pb-lg-9 text-center">
                  <div className="square-92 rounded-4 bg-dodger text-white font-size-9 mx-auto shadow-dodger mb-11">
                    <i className="fa fa-list-ul"></i>
                  </div>
                  <div className="services-content">
                    <h3 className="font-size-6 mb-7">Choose Your Course</h3>
                    <p className="font-size-4 text-default-color">
                      We currently offer three courses with different bases;
                      from primary Quran reading to Tajweed Al Quran, to
                      complete memorization of the Quran, our pupils search for
                      the best tutors.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- End Single Services --> */}
              {/* <!-- Single Services --> */}
              <div className="col-12 col-lg-4 col-md-6 col-sm-8 col-xs-8">
                <div className="px-xl-7 px-xxl-12 pt-5 pb-3 pb-lg-9 text-center">
                  <div className="square-92 rounded-4 bg-green text-white font-size-9 mx-auto shadow-green mb-11">
                    <i className="fa fa-image "></i>
                  </div>
                  <div className="services-content">
                    <h3 className="font-size-6 mb-7">Marketing</h3>
                    <p className="font-size-4 text-default-color">
                      A whole student base visits your profile, we bring to you
                      a world of opportunity for online career opportunities.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- End Single Services --> */}
              {/* <!-- Single Services --> */}
              <div className="col-12 col-lg-4 col-md-6 col-sm-8 col-xs-8">
                <div className="px-xl-7 px-xxl-12 pt-5 pb-3 pb-lg-9 text-center">
                  <div className="square-92 rounded-4 bg-casablanca text-white font-size-9 mx-auto shadow-casablanca mb-11">
                    <i className="fa fa-paper-plane"></i>
                  </div>
                  <div className="services-content">
                    <h3 className="font-size-6 mb-7">Flexible Schedules</h3>
                    <p className="font-size-4 text-default-color">
                      Choose your timings, work as your schedule allows whether
                      its work or university, your convenience is accounted for.
                    </p>
                  </div>
                </div>
              </div>
              {/* <!-- End Single Services --> */}
            </div>
            {/* <!-- End Services Content --> */}
          </div>
        </div>
      </>
    );
  }
}

export default tutorCourseStep;
