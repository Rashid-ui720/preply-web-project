import React, { Component } from "react";

class aboutwhoWorkSec extends Component {
  render() {
    return (
      <>
        <section className="pt-7 pt-lg-30 pb-2 pb-lg-20 bg-white pb-xs-15">
          <div className="container">
            <div className="row pb-lg-6 justify-content-center">
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-sm-10 col-xs-10 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-1 start --> */}
                <div className="pl-lg-8 pl-0 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-md-5 pr-xl-8 pr-xxl-25 pr-0 ">
                  {/* <!-- content-1 section-title start --> */}
                  <p className="text-green blue font-size-4 font-weight-semibold mb-4">
                    Humble Beginnings:
                  </p>
                  <h2 className="font-size-9 mb-8 pr-xxl-15">Who We Are</h2>
                  <p className="text-gray font-size-5 mb-10 mb-lg-5">
                    Quran Teacher Live, like many other projects, was birthed
                    from a single pure intention: to readily make available
                    these Quranic teachings and resources to Muslims around the
                    globe to spread the Nur of Islam. It was more than a
                    momentary lapse. In our journey to spread the Holy teachings
                    and make the understanding of them embed deep into the
                    hearts of our brothers and sisters, we set out with clear
                    motives.
                  </p>
                  {/* <!-- content-1 section-title end --> */}
                  {/* <!-- content-1 list-group start --> */}
                  <ul className="list-unstyled pl-0">
                    <li className="font-weight-semibold border-0 d-flex mb-4 heading-default-color">
                      <i className="fas fa-check font-size-4 text-green mr-6"></i>
                      Today, we facilitate students from all around the world,
                      foster an ever-growing supportive Islamic community, and
                      make our brothers and sisters in Islam reach their goals
                      with convenience and comfort.
                    </li>
                    <li className="font-weight-semibold border-0 d-flex mb-4 heading-default-color">
                      <i className="fas fa-check font-size-4 text-green mr-6"></i>
                      We create everlasting impacts together with our bright
                      pupils and motivated tutors.
                    </li>
                    <li className="font-weight-semibold border-0 d-flex mb-4 heading-default-color">
                      <i className="fas fa-check font-size-4 text-green mr-6"></i>
                      Here, at Quran Tutor, we are a family with one direction.
                    </li>
                  </ul>
                  {/* <!-- content-1 list-group end --> */}
                </div>
                {/* <!-- content-1 end --> */}
              </div>
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-xs-10 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-1 left-content start --> */}
                <div className="position-relative pr-xl-20 pr-md-0 pr-15 pt-8 pr-sm-0 pr-xs-0">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l1/about_who_we_work.jpg"
                    alt=""
                    className="w-100 rounded overflow-hidden"
                  />
                  {/* <!-- content img end --> */}
                </div>
                {/* <!-- content-1 left-content end --> */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default aboutwhoWorkSec;
