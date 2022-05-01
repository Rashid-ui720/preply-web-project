import React from "react";
import { Component } from "react";

class homePageGetStarted extends Component {
  state = {};

  render() {
    return (
      <div>
        <section className="pt-13 pt-lg-15 pb-lg-2 accordion-bg">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-5 px-xl-9 px-xxl-7">
                  <h2 className="mb-4 mb-md-6 font-size-10">
                    It’s easy to get started
                  </h2>
                </div>
              </div>
            </div>

            {/* Accordion main div start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- accordion start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}

                  <div className="faq-content pt-lg-0">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordion01"
                    >
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-6 rounded bg-white">
                        <div className="mb-0 border-bottom-0" id="heading3-1">
                          <button
                            className="text-col mystyle btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse3-1"
                            aria-expanded="true"
                            aria-controls="collapse3-1"
                          >
                            Browse and compare verfied Quran teachers
                          </button>
                        </div>
                        <div
                          id="collapse3-1"
                          className="collapse pr-7"
                          aria-labelledby="heading3-1"
                          data-parent="#accordion01"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-4 pr-7 pt-6 pl-11">
                            Search for your tutor based on your course,
                            expertise, country and learning needs. Compare
                            different tutors easily
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-6 rounded bg-white">
                        <div className="mb-0 border-bottom-0" id="heading3-2">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse3-2"
                            aria-expanded="false"
                            aria-controls="collapse3-2"
                          >
                            Register, Select, and Pay
                          </button>
                        </div>
                        <div
                          id="collapse3-2"
                          className="collapse pr-7"
                          aria-labelledby="heading3-2"
                          data-parent="#accordion01"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            Book the tutor, register for the right course, and
                            make secure payments at ease
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-6 rounded bg-white">
                        <div className="mb-0 border-bottom-0" id="heading3-3">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse3-3"
                            aria-expanded="false"
                            aria-controls="collapse3-3"
                          >
                            Learn and Grow
                          </button>
                        </div>
                        <div
                          id="collapse3-3"
                          className="collapse pr-7"
                          aria-labelledby="heading3-3"
                          data-parent="#accordion01"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            With one-on-one personalized lessons, reach your
                            goals faster with your tutor
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- accordion end --> */}
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10 pt-md-10 pb-md-10 pt-sm-10 pb-sm-10 pt-xs-10 pb-xs-10 pt-10 pb-10 d-flex justify-content-center"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/get_started_sec.webp"
                    alt=""
                    className=" rounded-4"
                    style={{ width: "360px", height: "340px" }}
                  />
                </div>
              </div>

              <div className="text-center mb-0 mt-5 mb-lg-0 px-xl-9 px-xxl-7 pb-0">
                <h2 className="mb-4 mb-md-4 font-size-7">
                  100% Satisfaction Guarantee
                </h2>
                <p className="font-size-5 text-default-color text-center px-xs-9 px-md-0 width-45P ml-auto mr-auto ">
                  If you are not satisfied with your trial lesson, we will give
                  you a free replacement with another tutor or a full refund
                </p>
              </div>
            </div>

            {/* Accordion main div end*/}
          </div>
        </section>
        {/* truested experience start */}
        <div className="pt-0 pt-lg-0 pb-0 pb-lg-0 accordion-bg">
          <div className="container "></div>
          {/* start trusted div */}
          <div className="row justify-content-center">
            <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
              <div className="text-center mb-5 mb-lg-8 px-xl-9 px-xxl-7">
                <h2 className="px-7 px-sm-0 px-md-0">
                  Trusted, experienced and dedicated{" "}
                  <span className="text-green"> Quran tutors</span>
                </h2>
                <p className="font-size-7 text-default-color text-center px-xs-9 px-md-0 width-40P ml-auto mr-auto ">
                  "Verily the most superior amongst you ( Muslims ) are those
                  who learn the Quran and teach it."
                </p>
              </div>
            </div>
          </div>
          {/* end trusted div */}
          <div
            className="row justify-content-center mb-0 px-lg-20 px-xl-20"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-once="true"
          >
            {/* <!-- first service start box--> */}
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 mb-md-10">
              <div className="px-9 pt-9 pb-7">
                <p className="font-size-5 m-0 text-justified">
                  As we know, Quran recitation is a comprehensive act of
                  Muslims. Muslims read Quran for getting Allah's affectation.
                  It's essential to learn Quran accurately. Therefore, we should
                  learn Quran with well-versed and certified Quran tutors.
                </p>
              </div>
            </div>
            {/* <!-- End first service box -->
            <!-- Second service start box --> */}
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 mb-md-10">
              <div className="px-9 pt-9 pb-7">
                <p className="font-size-5 m-0 text-justified">
                  We have certified Quran teachers who hold degrees in Islamic
                  and Quran study. They are all graduated in Islamic research
                  and have previous experience of educating Quran online to
                  students. Our female Quran teachers include Hifz-e-Quran and
                  Qari-e-Quran, who are aware of all Tajweed rules.
                </p>
              </div>
            </div>
            {/* <!-- End second service box -->
          {/* <!-- End Single Services --> */}
          </div>
        </div>
        {/* trusted experience end */}
      </div>
    );
  }
}

export default homePageGetStarted;
