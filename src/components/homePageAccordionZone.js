import React from "react";
import { Component } from "react";

class homePageaccordionzone extends Component {
  state = {};

  render() {
    return (
      <div>
        <section className="pt-13 pt-lg-15 pb-lg-15 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-10 px-xl-9 px-xxl-7">
                  <h2 className="mb-4 mb-md-6 font-size-10">
                    High quality personalised online Quran tutoring
                  </h2>
                </div>
              </div>
            </div>

            {/* Step start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xxl-6 col-xl-6 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- accordion start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}

                  <div className="faq-content pt-lg-4 pt-6">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordionExample"
                    >
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-1">
                          <button
                            className="text-col mystyle btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-1"
                            aria-expanded="true"
                            aria-controls="collapse2-1"
                          >
                            Professional Quran teachers from around the globe
                          </button>
                        </div>
                        <div
                          id="collapse2-1"
                          className="collapse pr-7"
                          aria-labelledby="heading2-1"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-4 pr-7 pt-6 pl-11">
                            Our group of expert Quran tutors have deep insight
                            and background into the Islamic practicum. Here at
                            Quran Teacher Live, we do not compromise on the
                            quality of our tutoring. During our selection
                            process we thoroughly vet and personally interview
                            every tutor, we pride ourselves with an average
                            acceptance rate of 1 in 10 applicants.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-2"
                            aria-expanded="false"
                            aria-controls="collapse2-2"
                          >
                            One-on-one interactive training
                          </button>
                        </div>
                        <div
                          id="collapse2-2"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            A reinforced Quran tuition, available on all
                            streaming platforms, provides the feel of an actual
                            Madrassa. Matching the learning pace and goals of
                            their pupils, our certified tutors provide
                            personalized feedback and Quran teaching.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-3">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-3"
                            aria-expanded="false"
                            aria-controls="collapse2-3"
                          >
                            Flexible schedules
                          </button>
                        </div>
                        <div
                          id="collapse2-3"
                          className="collapse pr-7"
                          aria-labelledby="heading2-3"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            Join anytime from anywhere. Catering the needs of
                            our diversified student group, we offer flexible
                            timings ensuring maximum productivity.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-4">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-4"
                            aria-expanded="false"
                            aria-controls="collapse2-4"
                          >
                            Trial lesson satisfaction gaurantee
                          </button>
                        </div>
                        <div
                          id="collapse2-4"
                          className="collapse pr-7"
                          aria-labelledby="heading2-4"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            If you are not satisfied with your trial lesson, we
                            will give you a free replacement with another tutor
                            or a full refund
                          </div>
                        </div>
                      </div>
                      <div className="overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-5">
                          <button
                            className="text-col btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-5"
                            aria-expanded="false"
                            aria-controls="collapse2-5"
                          >
                            Highly affordable
                          </button>
                        </div>
                        <div
                          id="collapse2-5"
                          className="collapse pr-7"
                          aria-labelledby="heading2-5"
                          data-parent="#accordionExample"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            Choose verified and experienced Quran tutors that
                            fit your budget
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
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10 pt-md-10 pb-md-10 pt-sm-10 pb-sm-10 pt-xs-10 pb-xs-10  pt-10 pb-10 d-flex justify-content-center"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/comfort_zone_sec.webp"
                    alt=""
                    className=" rounded-4"
                    style={{ width: "360px", height: "360px" }}
                  />
                </div>
              </div>
            </div>

            {/* Step ends*/}
          </div>
        </section>
      </div>
    );
  }
}

export default homePageaccordionzone;
