import React from "react";
import { Component } from "react";

class homePageOnlineCourse extends Component {
  state = {};

  render() {
    return (
      <div>
        <section className="pt-13 pt-lg-10 pb-lg-15 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-12 px-xl-9 px-xxl-7">
                  <h2 className="mb-4 mb-md-6 font-size-10">
                    Online <span className="text-green">Quran courses</span> we
                    offer
                  </h2>
                </div>
              </div>
            </div>

            {/* Step start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-xs-12 col-sm-12 pl-lg-10 pl-xl-10"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/online_course_offer.webp"
                    alt=""
                    className="w-100 rounded-4"
                    style={{}}
                  />
                </div>
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-sm-12 col-xs-12 col-12 pb-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- accordion start --> */}
                <div className="content-2 pl-xl-0 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}

                  <div className="faq-content pt-lg-4 pt-6">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordion02"
                    >
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading5-1">
                          <button
                            className="text-col mystyle btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse5-1"
                            aria-expanded="true"
                            aria-controls="collapse5-1"
                          >
                            Online Quran reading course for beginners
                          </button>
                        </div>
                        <div
                          id="collapse5-1"
                          className="collapse pr-7"
                          aria-labelledby="heading5-1"
                          data-parent="#accordion02"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-4 pr-7 pt-6 pl-11">
                            Muslims learn Quran in their childhood. Therefore,
                            this course is usually taken by kids. Therefore, we
                            use handy tools to make our online Quran classes
                            interactive and easily accessible. It may take one
                            to two years to complete the whole Quran. After the
                            end, of course, your kids will be able to read Quran
                            fluently with accuracy.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading5-2">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse5-2"
                            aria-expanded="false"
                            aria-controls="collapse5-2"
                          >
                            Online Quran tajweed course
                          </button>
                        </div>
                        <div
                          id="collapse5-2"
                          className="collapse pr-7"
                          aria-labelledby="heading5-2"
                          data-parent="#accordion02"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            The Quran tutoring in this course allows pupils of
                            all levels to understand the principles of Tajweed
                            and learn to apply them. The methodology involves
                            memorization practices to successfully enable the
                            pupil to apply these principles. Learning Tajweed is
                            not only an obligation, but helps to rectify the
                            Tarteel, and Qira’at as well.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading5-3">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse5-3"
                            aria-expanded="false"
                            aria-controls="collapse5-3"
                          >
                            Online Quran memorization course
                          </button>
                        </div>
                        <div
                          id="collapse5-3"
                          className="collapse pr-7"
                          aria-labelledby="heading5-3"
                          data-parent="#accordion02"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            Hifz-ul-Quran is on the bucket list of every Muslim.
                            We assist our pupils towards completion of this
                            noble task and retention. With our joint repetition,
                            and revision exercises, we hold you accountable till
                            the end ensuring perfect retention. Trust our
                            process, and we support to till you reach your goal.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- accordion end --> */}
              </div>
            </div>

            {/* Step ends*/}
          </div>
        </section>
      </div>
    );
  }
}

export default homePageOnlineCourse;
