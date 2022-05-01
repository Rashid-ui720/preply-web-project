import React from "react";
import { Component } from "react";

class tutorVideoSection extends Component {
  render() {
    return (
      <div>
        <section className="pt-13 pt-lg-5 pb-lg-15 bg-white">
          <div className="container">
            {/* pay bill video section start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-sm-10 col-xs-10 col-12 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-0 pt-md-0 pt-sm-0 pt-xs-0 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}
                  <div className="row how-it-work-step-text">
                    <div className="col-12">
                      <h4 className="font-size-8 pt-lg-10">
                        Pay Bills, Impact Lives, and Earn Rewards in One
                        Sitting!
                      </h4>
                      <p className="text-default-color font-size-5 mb-7 mb-lg-12 pr-xxl-13 pr-lg-0 pr-md-10">
                        We support you throughout your tutoring journey. From
                        providing access to students, to stable marketing, we
                        optimize your tutoring business. Work at flexible
                        timings, earn with comfort, and great a striking CV that
                        benefits your career.
                      </p>
                    </div>
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- content-2 end --> */}
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-xs-10 pb-xs-10 col-12 pb-15 pt-15 pr-lg-15 pr-xl-15  aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l1/pay_bills_tutor.jpg"
                    alt=""
                    className="w-100 rounded-4"
                    style={{}}
                  />
                </div>
              </div>
            </div>

            {/* pay bill video section end  */}
          </div>
        </section>
      </div>
    );
  }
}

export default tutorVideoSection;
