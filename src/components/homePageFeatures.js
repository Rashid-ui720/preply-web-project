import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";
class HomePageFeatures extends React.Component {
  state = {};
  render() {
    return (
      <div className="pt-10 pt-lg-10 pb-7 pb-lg-10 ">
        <div className="container ">
          {/* <!-- Section title --> */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
              <div className="text-center mb-8 mb-lg-18 px-xl-9 px-xxl-7">
                <h2 className="font-size-8 mb-6">
                  Make the world your comfort zone
                </h2>
                <p className="font-size-4 text-default-color px-xs-9 px-md-0">
                  Speak naturally with professional online tutors from different
                  cities
                </p>
              </div>
            </div>
          </div>
          {/* <!-- End Section title -->
          <!-- Services Content --> */}
          <div
            className="row justify-content-center mb-15"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            {/* <!-- Single Services --> */}
            <div className="col-12 col-lg-3 col-md-6 col-sm-8 col-xs-8 bg-white rounded shadow-dodger mr-lg-10">
              <div className=" pt-10 pb-5 text-center">
                <div className="square-70 rounded-4 bg-dodger text-white font-size-7 mx-auto shadow-dodger mb-11">
                  <i className="fas fa-video"></i>
                </div>
                <div className="services-content">
                  <h3 className="font-size-6 mb-7">
                    One-on-One Interactive Training
                  </h3>
                  <p className="font-size-3 text-default-color">
                    A reinforced Quran tuition, available on all streaming
                    platforms, provides the feel of an actual Madrassa. Matching
                    the learning pace and goals of their pupils, our certified
                    tutors provide personalized feedback and Quran teaching.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- End Single Services -->
            <!-- Single Services --> */}
            <div className="col-12 col-lg-3 col-md-6 col-sm-8 col-xs-8  bg-white rounded shadow-dodger  mr-lg-10">
              <div className="pt-10 pb-5 text-center">
                <div className="square-70 rounded-4 bg-green text-white font-size-7 mx-auto  mb-11">
                  <i className="fas fa-user-check"></i>
                </div>
                <div className="services-content">
                  <h3 className="font-size-6 mb-7">
                    Certified Tutors for Professional Quran Training{" "}
                  </h3>
                  <p className="font-size-3 text-default-color">
                    Our group of expert tutors have deep insight and background
                    into the Islamic practicum. Here at Quran Teacher Live, we
                    do not compromise on the quality of our tutoring. Our
                    pupils’ satisfaction matters most to us.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- End Single Services -->
            <!-- Single Services --> */}
            <div className="col-12 col-lg-3 col-md-6 col-sm-8 col-xs-8 bg-white rounded shadow-dodger">
              <div className="pt-10 pb-5 text-center">
                <div className="square-70 rounded-4 bg-casablanca text-white font-size-7 mx-auto  mb-11">
                  <i className="far fa-clock"></i>
                </div>
                <div className="services-content">
                  <h3 className="font-size-6 mb-7">
                    Flexible Schedules All Around the Globe
                  </h3>
                  <p className="font-size-3 text-default-color">
                    Join anytime from anywhere. Catering the needs of our
                    diversified student group, we offer flexible timings
                    ensuring maximum productivity.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- End Single Services --> */}
            {/* <!-- End Single Services --> */}
          </div>
          {/* <!-- End Services Content --> */}
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
            <div className="text-center mb-5 mb-lg-12 px-xl-9 px-xxl-7">
              <h2 className="font-size-7 mb-6">
                Trusted Curriculum, Qualified Tutors, Interactive Lessons
              </h2>
              <p className="font-size-3 text-default-color text-center px-xs-9 px-md-0 width-40P ml-auto mr-auto ">
                Catering to the learning needs of 500 + pupils from all around
                the world, our online Madrassa is trusted and recommended.
                Together, our pupils and certified tutors, build impacting
                Islamic journeys. Join our community today and make your goals
                seem closer!
              </p>
              <Link
                to={localRoutes.tutor_list}
                className="btn btn-green btn-h-60 btn-xl col-1 ml-auto mr-auto mx-4 mt-6 text-uppercase"
              >
                Find Tutor
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePageFeatures;
