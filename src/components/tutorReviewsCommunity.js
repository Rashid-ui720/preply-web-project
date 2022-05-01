import React from "react";
import { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

class tutorReviewsCommunity extends Component {
  render() {
    return (
      <>
        <section className="pt-13 pt-lg-15 pb-lg-15 bg-white">
          <div className="container">
            <h2 className="font-size-8 mb-7 pr-xs-13  pr-md-0 pr-sm-8 text-center">
              Our <span className="text-green"> Community</span> of Experts
            </h2>
            <p className="font-size-7 text-default-color text-center px-xs-9 px-md-0 width-45P ml-auto mr-auto">
              Join our team of great individuals that make Quran Teacher Live
              known.
            </p>
            <div className="row align-items-center justify-content-center">
              <div
                className="col-xl-6 col-lg-6 col-md-8 col-xs-10 col-sm-12 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="pl-lg-10 pl-0">
                  {/* <!-- content img start --> */}
                  <div className="d-xs-flex  mx-sm-n3">
                    <div className="d-flex flex-column px-3 px-sm-6 w-lg-auto w-100">
                      {/* <!-- single image start --> */}
                      <img
                        src="image/l1/community_img_01.png"
                        alt=""
                        data-aos="zoom-in"
                        data-aos-duration="500"
                        data-aos-once="true"
                        className="w-100 pb-6 pb-sm-9 rounded-4 aos-init aos-animate"
                      />
                      {/* <!-- single image end --> */}
                      {/* <!-- single image --> */}
                      <img
                        src="image/l1/community_img_02.png"
                        alt=""
                        data-aos="zoom-in"
                        data-aos-duration="500"
                        data-aos-delay="700"
                        data-aos-once="true"
                        className="w-100 pb-6 pb-sm-9 rounded-4 aos-init aos-animate"
                      />
                      {/* <!-- single image end --> */}
                    </div>
                    <div className="d-flex flex-column pt-xs-11 px-3 px-sm-6 w-lg-auto w-100">
                      {/* <!-- single image --> */}
                      <img
                        src="image/l1/community_img_03.png"
                        alt=""
                        data-aos="zoom-in"
                        data-aos-duration="500"
                        data-aos-delay="400"
                        data-aos-once="true"
                        className="w-100 pb-6 pb-sm-9 rounded-4 aos-init aos-animate"
                      />
                      {/* <!-- single image end --> */}
                      {/* <!-- single image --> */}
                      <div className="bg-green py-16 px-19 rounded-4"></div>
                      {/* <!-- single image end --> */}
                    </div>
                  </div>
                  {/* <!-- abs-content end --> */}
                </div>
                {/* <!-- content-2 end --> */}
              </div>
              <div
                className="col-xxl-5 col-xl-6 col-lg-6 col-md-8 col-sm-12 pb-10"
                data-aos="fade-left"
                data-aos-duration="800"
                data-aos-once="true"
              >
                {/* <!-- content-2 start --> */}
                <div className="content-2 pl-xl-0 d-flex flex-column justify-content-center h-100 pt-lg-0 pt-15 pr-xl-10 pr-xxl-0">
                  {/* <!-- content section title start --> */}

                  {/* <!-- content section title end --> */}
                  <OwlCarousel
                    classNameName="owl-theme single-slider w-100"
                    dots={true}
                    margin={10}
                    responsive={{
                      0: {
                        items: 1,
                      },
                      600: {
                        items: 1,
                      },
                      1000: {
                        items: 1,
                      },
                    }}
                  >
                    {/* first  element */}
                    <div
                      className="single-slider w-100 rounded-4 p-0"
                      style={{ minHeight: "17rem" }}
                    >
                      <div className="row no-gutters align-items-center justify-content-center">
                        <div className="col-12 col-xl-12 col-lg-12 col-xs-10">
                          {/* <!-- Slide content Start --> */}
                          <div className="slide-content pl-lg-0 pl-xxl-0 pr-5 pr-xl-0 py-lg-0 py-0">
                            {/* <!-- Slide Brand Image --> */}
                            {/* <!-- Slide Info --> */}
                            <div className="">
                              <p className="font-size-6 text-black-2 pr-0 mb-10">
                                “Creating a profile was relly simple and I
                                immdiately started receiving requests for
                                tuition. The team are incredibly helpful and
                                supportive.”
                              </p>
                              <h6 className="mb-0 font-size-4">Sana Malik</h6>
                              {/* <p className="font-size-3 text-default-color">
                                Tutor
                              </p> */}
                            </div>
                            {/* <!-- Slide Info End --> */}
                          </div>
                          {/* <!-- Slide content End --> */}
                        </div>
                      </div>
                    </div>

                    {/* second  element */}
                    <div
                      className="single-slider w-100 rounded-4 p-0"
                      style={{ minHeight: "17rem" }}
                    >
                      <div className="row no-gutters align-items-center justify-content-center">
                        <div className="col-12 col-xl-12 col-lg-12 col-xs-10">
                          {/* <!-- Slide content Start --> */}
                          <div className="slide-content pl-lg-0 pl-xxl-0 pr-5 pr-xl-0 py-lg-5 py-0">
                            {/* <!-- Slide Brand Image --> */}
                            {/* <!-- Slide Info --> */}
                            <div className="">
                              <p className="font-size-6 text-black-2 pr-5 mb-10">
                                “The people at Quran Teacher are genuinely
                                interested in providing a good service with
                                integrity. Any pratical questions are answered
                                promptly and courteously.”
                              </p>
                              <h6 className="mb-0 font-size-4">Abdul Kareem</h6>
                              {/* <!-- User Info --> */}
                            </div>
                            {/* <!-- Slide Info End --> */}
                          </div>
                          {/* <!-- Slide content End --> */}
                        </div>
                      </div>
                    </div>
                    {/* third compoennt */}
                    <div
                      className="single-slider w-100 rounded-4 p-0"
                      style={{ minHeight: "17rem" }}
                    >
                      <div className="row no-gutters align-items-center justify-content-center">
                        <div className="col-12 col-xl-12 col-lg-12 col-xs-10">
                          {/* <!-- Slide content Start --> */}
                          <div className="slide-content pl-lg-0 pl-xxl-0 pr-5 pr-xl-0 py-lg-0 py-0">
                            {/* <!-- Slide Brand Image --> */}
                            {/* <!-- Slide Info --> */}
                            <div className="">
                              <p className="font-size-6 text-black-2 pr-0 mb-10">
                                “The work is incredlibly rewarding and my plan
                                is to continue for the forseeable future.”
                              </p>
                              <h6 className="mb-0 font-size-4">
                                Abdullahi M Said
                              </h6>
                              {/* <!-- User Info --> */}
                            </div>
                            {/* <!-- Slide Info End --> */}
                          </div>
                          {/* <!-- Slide content End --> */}
                        </div>
                      </div>
                    </div>

                    {/* foruth  element */}
                    <div
                      className="single-slider w-100 rounded-4 p-0"
                      style={{ minHeight: "17rem" }}
                    >
                      <div className="row no-gutters align-items-center justify-content-center">
                        <div className="col-12 col-xl-12 col-lg-12 col-xs-10">
                          {/* <!-- Slide content Start --> */}
                          <div className="slide-content pl-lg-0 pl-xxl-0 pr-5 pr-xl-0 py-lg-0 py-0">
                            {/* <!-- Slide Brand Image --> */}
                            {/* <!-- Slide Info --> */}
                            <div className="">
                              <p className="font-size-6 text-black-2 pr-0 mb-10">
                                “For me, it is a great part time job as it's
                                flexible and ideal alongside studying at uni.
                                It's also been a chance to gain some experience
                                in something new, and I really enjoy teaching
                                Quran online.”
                              </p>
                              <h6 className="mb-0 font-size-4">
                                Yasmin Hussain
                              </h6>
                              {/* <!-- User Info --> */}
                            </div>
                            {/* <!-- Slide Info End --> */}
                          </div>
                          {/* <!-- Slide content End --> */}
                        </div>
                      </div>
                    </div>
                  </OwlCarousel>
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

export default tutorReviewsCommunity;
