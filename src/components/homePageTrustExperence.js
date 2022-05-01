import React from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";

import { Component } from "react";

class homePageTrustExperence extends Component {
  state = {};
  render() {
    return (
      <div className="pt-20 pt-lg-20 pb-7 pb-lg-5 ">
        <div className="container ">{/* <!-- End Services Content --> */}</div>
        {/* start trusted div */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
            <div className="text-center mb-5 mb-lg-12 px-xl-9 px-xxl-7">
              <h2 className="px-7 px-sm-0 px-md-0">
                Trusted, experienced and dedicated{" "}
                <span className="text-green"> Quran tutors</span>
              </h2>
              <p className="font-size-7 text-default-color text-center px-xs-9 px-md-0 width-40P ml-auto mr-auto ">
                "Verily the most superior amongst you ( Muslims ) are those who
                learn the Quran and teach it."
              </p>
            </div>
          </div>
        </div>
        {/* end trusted div */}
        <div
          className="row justify-content-center mb-10 px-lg-20 px-xl-20"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-once="true"
        >
          {/* <!-- Single one Services --> */}
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 mb-md-10">
            <div className="px-9 pt-9 pb-7">
              <p className="font-size-5 m-0 text-justified">
                As we know, Quran recitation is a comprehensive act of Muslims.
                Muslims read Quran for getting Allah's affectation. It's
                essential to learn Quran accurately. Therefore, we should learn
                Quran with well-versed and certified Quran tutors.
              </p>
            </div>
          </div>
          {/* <!-- End Single one Services -->
            <!-- Single Services --> */}
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 mb-md-10">
            <div className="px-9 pt-9 pb-7">
              <p className="font-size-5 m-0 text-justified">
                We have certified Quran teachers who hold degrees in Islamic and
                Quran study. They are all graduated in Islamic research and have
                previous experience of educating Quran online to students. Our
                female Quran teachers include Hifz-e-Quran and Qari-e-Quran, who
                are aware of all Tajweed rules.
              </p>
            </div>
          </div>
          {/* <!-- End Single Services -->
          {/* <!-- End Single Services --> */}
        </div>
      </div>
    );
  }
}

export default homePageTrustExperence;
