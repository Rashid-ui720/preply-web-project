import React, { Component } from "react";

class seoFaqData extends Component {
  render() {
    const { city_data } = this.props;
    return (
      <div>
        <section className="pt-13 pt-lg-15 pb-lg-15 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-13 px-xl-9 px-xxl-7">
                  <h2 className="mb-4 mb-md-6 font-size-10">
                    Frequently asked questions(FAQ)
                  </h2>
                </div>
              </div>
            </div>

            {/* Step start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xxl-9 col-xl-9 col-lg-10 col-sm-12 col-xs-12 col-12"
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
                      {city_data.faqscript.mainEntity.map((res) => {
                        return (
                          <div className="border-bottom overflow-hidden py-1 pl-4 pr-6 px-lg-6 mb-4 rounded accordion-bg">
                            <div className="mb-0 border-bottom-0">
                              <button
                                className="btn-reset font-size-5 font-weight-semibold text-left px-0 pb-3 pt-0 accord-trigger arrow-icon w-100 border-left-0 border-right-0 focus-reset mt-n2"
                                type="button"
                                data-toggle="collapse"
                                data-target={res.id}
                                aria-expanded="false"
                                aria-controls="collapse2-2"
                              >
                                {res.name}
                              </button>
                            </div>
                            <div
                              id={res.id2}
                              className="collapse pr-7"
                              aria-labelledby="heading2-2"
                              data-parent="#accordionExample"
                            >
                              <div className="mt-n3 font-size-4 text-col font-weight-normal pb-7 pr-0 pt-6 pl-11">
                                {res.acceptedAnswer.text}{" "}
                                {res.acceptedAnswer.steps}
                                {/* {city_data.faqscript.mainEntity.acceptedAnswer.steps.map(
                                  (res, index) => {
                                    return (
                                      <ul>
                                        <li key={index}>
                                          {res.acceptedAnswer.steps}
                                        </li>
                                      </ul>
                                    );
                                  }
                                )} */}
                                {res.acceptedAnswer.steps_end_text}
                              </div>
                            </div>
                          </div>
                        );
                      })}
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

export default seoFaqData;
