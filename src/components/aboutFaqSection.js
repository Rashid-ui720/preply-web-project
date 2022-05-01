import React, { Component } from "react";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";

class aboutFaqSection extends Component {
  render() {
    return (
      <div>
        <section className="pt-10 pt-lg-12 pb-lg-10 bg-gradient-1">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-5 px-xl-9 px-xxl-7">
                  <h2 className="mb-4 mb-md-6 font-size-11">
                    Frequently <span className="text-green"> asked</span>{" "}
                    questions
                  </h2>
                </div>
              </div>
            </div>

            {/* Step start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xl-7 col-lg-12 col-md-12 col-sm-12 col-xs-12 col-12"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- accordion start --> */}
                <div className="content-2 pl-xl-0 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}

                  <div className="faq-content pt-lg-4 pt-6">
                    <div
                      className="accordion rounded-10 border-green border-top-5 pl-1"
                      id="accordion03"
                    >
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-1">
                          <button
                            className="mystyle btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-1"
                            aria-expanded="true"
                            aria-controls="collapse2-1"
                          >
                            Is it practical to learn Quran online?
                          </button>
                        </div>
                        <div
                          id="collapse2-1"
                          className="collapse pr-7"
                          aria-labelledby="heading2-1"
                          data-parent="#accordion03"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-4 pr-7 pt-6 pl-11">
                            Yes! We have taught Quran online to 500+ students.
                            According to our experience, learning Quran online
                            proved to be very effective for kids and adults. You
                            can learn Quran online at your desired timing
                            without going anywhere. Besides, online Quran
                            classes provides you one on one classes to better
                            understand.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-2">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-2"
                            aria-expanded="false"
                            aria-controls="collapse2-2"
                          >
                            Is it important to have a laptop or computer for
                            taking Quran classes?
                          </button>
                        </div>
                        <div
                          id="collapse2-2"
                          className="collapse pr-7"
                          aria-labelledby="heading2-2"
                          data-parent="#accordion03"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            If you have a laptop, then that is great otherwise
                            it's not necessary to have a computer or laptop. You
                            can take your Quran class on mobile or tablet
                            through our app.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-3">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-3"
                            aria-expanded="false"
                            aria-controls="collapse2-3"
                          >
                            Is there any cost for the trial class?
                          </button>
                        </div>
                        <div
                          id="collapse2-3"
                          className="collapse pr-7"
                          aria-labelledby="heading2-3"
                          data-parent="#accordion03"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            We give you the option of taking a trial Quran class
                            with your chosen teacher and if you’re not fully
                            satisfied with your lesson, we’ll refund your money.
                          </div>
                        </div>
                      </div>
                      <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-4">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-4"
                            aria-expanded="false"
                            aria-controls="collapse2-4"
                          >
                            Is your Quran classes helpful for beginners?
                          </button>
                        </div>
                        <div
                          id="collapse2-4"
                          className="collapse pr-7"
                          aria-labelledby="heading2-4"
                          data-parent="#accordion03"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            Don't worry! We have designed our Quran courses so
                            that beginners will not face any difficulty in
                            learning. Our certified Quran teachers share Quran
                            knowledge from basic to advance to clear everything.
                            Hence, whoever the beginners or advanced learner, we
                            derive hundred percent and complete results of
                            students from our interactive Quran classes.
                          </div>
                        </div>
                      </div>
                      <div className="overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                        <div className="mb-0 border-bottom-0" id="heading2-5">
                          <button
                            className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                            type="button"
                            data-toggle="collapse"
                            data-target="#collapse2-5"
                            aria-expanded="false"
                            aria-controls="collapse2-5"
                          >
                            Is there an age limit to take our Quran classes
                            online?
                          </button>
                        </div>
                        <div
                          id="collapse2-5"
                          className="collapse pr-7"
                          aria-labelledby="heading2-5"
                          data-parent="#accordion03"
                        >
                          <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                            No, there's no age limit for learning Quran online
                            from our platform. In addition to kids, adults can
                            also learn Quran online from our platform.
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
                className="col-xl-5 col-lg-12 col-md-12 col-xs-12 col-sm-12 pt-xs-10 d-flex justify-content-center"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l1/faq_section.jpg"
                    alt=""
                    className="rounded-4 pb-10"
                    style={{}}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default aboutFaqSection;
