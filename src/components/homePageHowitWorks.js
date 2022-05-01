import React from "react";
class HomepageHowItWorks extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <section className="pt-13 pt-lg-30 pb-lg-30 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-18 px-xl-9 px-xxl-7">
                  <h2 className="font-size-8 mb-6">How Quran Tutor works</h2>
                  <p className="font-size-4 text-default-color px-xs-9 px-md-0">
                    Learn online with the world's best tutors
                  </p>
                </div>
              </div>
            </div>

            {/* Step start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-11 col-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}
                  <div className="row how-it-work-step-text">
                    <div className="text-green bg-green-opacity-1 circle-40 rounded-10  mr-4 font-size-7 col-2">
                      <p className="m-0 text-green font-size-6">1</p>
                    </div>
                    <div className="col-10">
                      <h4 className="font-size-6 ">Select a tutor</h4>
                      <p className="text-default-color font-size-3 mb-7 mb-lg-12 pr-xxl-13 pr-lg-0 pr-md-10">
                        Search for your tutor based on your course, expertise,
                        country and learning needs. Compare different tutors
                        easily.
                      </p>
                    </div>
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- content-2 end --> */}
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/step-1.png"
                    alt=""
                    className="w-100 rounded-4"
                  />
                </div>
              </div>
            </div>

            {/* Step ends*/}

            {/* Step start */}
            <div className="row align-items-center justify-content-center mt-20">
              <div
                className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-11 col-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}
                  <div className="row how-it-work-step-text">
                    <div className="text-green bg-green-opacity-1 circle-40 rounded-10  mr-4 font-size-7 col-2">
                      <p className="m-0 text-green font-size-6">2</p>
                    </div>
                    <div className="col-10">
                      <h4 className="font-size-6 ">
                        Register, Select, and Pay
                      </h4>
                      <p className="text-default-color font-size-3 mb-7 mb-lg-12 pr-xxl-13 pr-lg-0 pr-md-10">
                        Book the tutor, register for the right course, and make
                        secure payments at ease.
                      </p>
                    </div>
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- content-2 end --> */}
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/step-2.webp"
                    alt=""
                    className="w-100 rounded-4"
                  />
                </div>
              </div>
            </div>

            {/* Step ends*/}

            {/* Step start */}
            <div className="row align-items-center justify-content-center mt-20">
              <div
                className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-11 col-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}
                  <div className="row how-it-work-step-text">
                    <div className="text-green bg-green-opacity-1 circle-40 rounded-10  mr-4 font-size-7 col-2">
                      <p className="m-0 text-green font-size-6">3</p>
                    </div>
                    <div className="col-10">
                      <h4 className="font-size-6 ">Learn and Grow</h4>
                      <p className="text-default-color font-size-3 mb-7 mb-lg-12 pr-xxl-13 pr-lg-0 pr-md-10">
                        With one-on-one personalized lessons, reach your goals
                        faster with your tutor.
                      </p>
                    </div>
                  </div>
                  {/* <!-- media end --> */}
                </div>
                {/* <!-- content-2 end --> */}
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/step-3.webp"
                    alt=""
                    className="w-100 rounded-4"
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

export default HomepageHowItWorks;
