import React, { Component } from "react";

class aboutMissionSec extends Component {
  render() {
    return (
      <>
        <section className="py-13 py-lg-20">
          <div className="container">
            <div className="row justify-content-center">
              <div
                className="col-xl-6 col-lg-6 col-md-10 col-sm-10 col-xs-10"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative pr-lg-10 pr-md-0">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l1/mission_page.jpg"
                    alt=""
                    className="w-100 rounded-4"
                  />
                  {/* <!-- content img end --> */}
                </div>
              </div>
              <div
                className="col-lg-6 col-md-10 col-xs-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-lg-6 pl-0 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-11 pr-md-5 pr-xl-8 pr-xxl-20 pr-0">
                  {/* <!-- content-2 section title start --> */}
                  <p className="text-green font-size-4 font-weight-semibold mb-4 blue">
                    online Quran classes
                  </p>
                  <h2 className="font-size-9 mb-5">Our Mission</h2>
                  <p className="text-default-color font-size-5 mb-5">
                    Our primary goal is to spread the message of Allah to the
                    Muslims in the form of Quran teaching. We aim to enable our
                    students to learn Quran fluently to get affection and love
                    from Allah in the world and hereafter. Our certified Quran
                    teachers not only teach students with Quran teaching but
                    also commit their ethical training.
                  </p>
                  <p className="text-default-color font-size-5 mb-5">
                    As a result, our students get success in every aspect of
                    life. Hence, stay carefree with our online Quran classes for
                    your kids. We assure you that your kids become great Muslims
                    who know the value of the Quran and Islamic study
                  </p>
                  {/* <!-- content-2 section title end --> */}
                </div>
                {/* <!-- content-2 end --> */}
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default aboutMissionSec;
