import React from "react";
import { Component } from "react";

class homePageSuccessStory extends Component {
  state = {};

  render() {
    return (
      <div>
        <section className="pt-13 pt-lg-15 pb-lg-15 bg-white">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-md-12 col-lg-12 col-xxl-12">
                <div className="text-center mb-8 mb-lg-18 px-xl-9 px-xxl-7">
                  <h2 className="font-size-11 text-center px-xs-9 px-md-0 width-40P ml-auto mr-auto ">
                    Success stories from{" "}
                    <span className="text-green">our students</span>
                  </h2>
                </div>
              </div>
            </div>

            {/* success story 1st start */}
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                <div className="position-relative ">
                  {/* <!-- content img start --> */}
                  <img
                    src="image/l3/png/ummayyah_success_story.webp"
                    alt=""
                    className="w-100 rounded-4"
                  />
                </div>
              </div>
              <div
                className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-11 col-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  <div className="row how-it-work-step-text">
                    <div className="col-12">
                      <h4 className="font-size-7 ">
                        “I like my Quran teacher he is very kind ”
                      </h4>
                      <p className="text-default-color font-size-5 mb-7 mb-lg-8 pr-xxl-13 pr-lg-0 pr-md-10">
                        Ummayyah used Quran Teacher Live to:
                      </p>
                      <ul className="list-unstyled pl-0 pr-lg-20 pr-xl-20 font-size-5">
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p>
                            {" "}
                            Gain confidence in reciting from Quran out loud and
                            in front of others.
                          </p>
                        </li>
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p>Reciting Quran with proper tajweed.</p>
                        </li>
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p>
                            Read any surah from the Quran on their own without
                            assistance.
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* <!-- content-2 end --> */}
              </div>
            </div>

            {/* success story 1st end */}

            {/* success story 2nd start */}
            <div className="row align-items-center justify-content-center mt-20">
              <div
                className="col-xxl-6 col-xl-6 col-lg-6 col-md-8 col-sm-11 col-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-10 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-0 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}
                  <div className="row how-it-work-step-text">
                    <div className="col-12">
                      <h4 className="font-size-7">
                        “Alhamdulillah, my teacher is very patient, she takes
                        time in explaining things and makes sure everything is
                        being understood”
                      </h4>
                      <p className="text-default-color font-size-5 mb-7 mb-lg-8 pr-xxl-13 pr-lg-0 pr-md-10">
                        Safaa used Quran Teacher Live to:
                      </p>
                      <ul className="list-unstyled pl-0 pr-lg-20 pr-xl-20 font-size-5">
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p> Learn how to implement all tajweed rules.</p>
                        </li>
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p> Recite Quran with ease.</p>
                        </li>
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p> Increase love for the Quran by reciting often.</p>
                        </li>
                        <li className="font-weight-400 border-0 d-flex heading-default-color">
                          <i className="fas fa-check font-size-4 text-green mr-6"></i>
                          <p> Memorize more ayat and surahs of the Quran.</p>
                        </li>
                      </ul>
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
                    src="image/l3/png/safaa_success_story.webp"
                    alt=""
                    className="w-100 rounded-4"
                  />
                </div>
              </div>
            </div>

            {/* success story 2nd end  */}
          </div>
        </section>
      </div>
    );
  }
}

export default homePageSuccessStory;
