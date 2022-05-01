import React, { Component } from "react";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import { api } from "../utils/api_routes";
import axios from "axios";
import Progress from "react-progressbar";
import Rating from "react-rating";
import { Link } from "react-router-dom";
import { localRoutes } from "../utils/local_routes";

class ReviewsTestimonial extends Component {
  state = {
    loading: true,
    reviewsData: null,
  };
  async componentDidMount() {
    this.getreview();
  }

  getreview = () => {
    axios
      .get(api.getHomeReviews+ `?callfromhome=1`)
      .then((res) => {
        // Set states here
        this.setState({ reviewsData: res.data, loading: false });
        this.props.reviewsData(res.data);
      })
      .catch((err) => {
        console.error("api", err);
      });
  };

  render() {
    if (this.state.loading) {
      return <div></div>;
    }
    if (!this.state.reviewsData) {
      return <div>Data not fetch api working</div>;
    }

    return (
      <div className="bg-black-2 pattern-1 bg-image pt-8 pt-lg-10 pb-18 pb-lg-10 overflow-hidden">
        <div className="container">
          <div className="row justify-content-center">
            <h2 className="text-white mb-10 mt-4 text-center">
              Here’s what people are saying about us
            </h2>
            <div
              className="col-12 col-xl-10 col-lg-12 col-md-10 col-xs-11 z-index-2 pt-lg-3 pb-lg-2"
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="testimonial-slider-one  rounded-4">
                {/* <!-- single slider --> */}

                <div
                  className="single-slider w-100 bg-white rounded-4 p-8"
                  style={{ minHeight: "17rem" }}
                >
                  <div className="row no-gutters align-items-center justify-content-center">
                    <div className="col-12 col-xl-6 col-lg-6">
                      <div className="slide-content pl-5 pl-lg-0 pl-xxl-0 pr-0 pr-xl-0 py-lg-5 py-0">
                        {/* <!-- review start --> */}
                        <div className="pt-0">
                          <div className="row">
                            <div className="col-md-5 pr-5">
                              <div className="justify-content-center">
                                <div className="square-90 d-block mr-0 text-center">
                                  <h4 className="font-size-5 text-black-2 mb-0">
                                    Average Rating
                                    <p className="text-center font-size-8 mb-0">
                                      {Math.round(
                                        this.state.reviewsData.avg_reviews
                                          .avg_rating
                                      )}
                                    </p>
                                    <Rating
                                      emptySymbol={
                                        <i
                                          className="fa fa-star font-size-8"
                                          style={{ color: "#babfc7" }}
                                        ></i>
                                      }
                                      fullSymbol={
                                        <i className="fa fa-star font-size-8 text-yellow"></i>
                                      }
                                      readonly={true}
                                      step={1}
                                      initialRating={parseInt(
                                        Math.round(
                                          this.state.reviewsData.avg_reviews
                                            .avg_rating
                                        )
                                      )}
                                    />
                                    <p
                                      href="#"
                                      className="font-size-3 text-default-color line-height-2 underline"
                                    >
                                      <Link
                                        to={localRoutes.reviews}
                                        className="heading-default-color font-size-4 font-weight-normal"
                                      >
                                        {this.state.reviewsData.counts[0].count} reviews!
                                      </Link>
                                    </p>
                                  </h4>
                                </div>{" "}
                              </div>
                            </div>
                            <div className="col-md-7 pl-0 pr-0">
                              <h4 className="font-size-6 mb-7 text-black-2 font-weight-semibold text-center">
                                Student Reviews
                              </h4>
                              {/* Star section start */}
                              <div className="justify-content-center">
                                <div className="square-90 d-flex mr-0">
                                  <span className="font-size-3 mr-3 underline">
                                    5 Stars
                                  </span>
                                  <span className="w-50 mr-3 mt-4">
                                    <Progress
                                      completed={this.state.reviewsData.percentage.fiveper}
                                      className="progress_bg"
                                    />
                                  </span>
                                  <span className="font-size-3">{this.state.reviewsData.percentage.fiveper}%</span>
                                </div>
                                <div className="square-90 d-flex mr-0">
                                  <span className="font-size-3 mr-3 underline">
                                    4 Stars
                                  </span>
                                  <span className="w-50 mr-3 mt-4">
                                    <Progress
                                      completed={this.state.reviewsData.percentage.fourper}
                                      className="progress_bg"
                                    />
                                  </span>
                                  <span className="font-size-3">
                                    {this.state.reviewsData.percentage.fourper}%
                                  </span>
                                </div>
                                <div className="square-90 d-flex mr-0">
                                  <span className="font-size-3 mr-3 underline">
                                    3 Stars
                                  </span>
                                  <span className="w-50 mr-3 mt-4">
                                    <Progress
                                      completed={this.state.reviewsData.percentage.threeper}
                                      className="progress_bg"
                                    />
                                  </span>
                                  <span className="font-size-3">{this.state.reviewsData.percentage.threeper}%</span>
                                </div>
                                <div className="square-90 d-flex mr-0">
                                  <span className="font-size-3 mr-3 underline">
                                    2 Stars
                                  </span>
                                  <span className="w-50 mr-3 mt-4">
                                    <Progress
                                      completed={this.state.reviewsData.percentage.twoper}
                                      className="progress_bg"
                                    />
                                  </span>
                                  <span className="font-size-3">{this.state.reviewsData.percentage.twoper}%</span>
                                </div>
                                <div className="square-90 d-flex mr-0">
                                  <span className="font-size-3 mr-3 underline">
                                    1 Stars
                                  </span>
                                  <span className="w-50 mr-3 mt-4">
                                    <Progress
                                      completed={this.state.reviewsData.percentage.oneper}
                                      className="progress_bg"
                                    />
                                  </span>
                                  <span className="font-size-3">{this.state.reviewsData.percentage.oneper}%</span>
                                </div>
                              </div>
                              {/* Star section end */}
                            </div>
                          </div>
                        </div>
                        {/*  review Info End */}
                      </div>
                    </div>

                    <div className="col-12 col-xl-6 col-lg-6 col-xs-10">
                      <OwlCarousel
                        className="owl-theme single-slider w-100"
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
                        {this.state.reviewsData.reviews.map((review, index) => {
                          return (
                            <div
                              className="slide-content pl-5 pl-lg-10 pl-xxl-10 pr-5 pr-xl-5 py-lg-5 py-9"
                              key={index}
                            >
                              {/* <!-- Slide Brand Image --> */}
                              <div className="">
                                <h4 className="font-size-6 text-black-2 mb-0">
                                  {review.name}
                                </h4>
                              </div>
                              {/* <!-- Slide Info --> */}
                              <div className="">
                                <p className="font-size-4 text-black-2 pr-5 mb-10"
                                  style={{overflow:"hidden",textOverFlow: "ellipsis",
                                    display: "-webkit-box",
                                    webkitLineClamp: "5" ,  /* number of lines to show */
                                            lineClamp: "5",
                                    webkitBoxOrient: "vertical"}}
                                >
                                  “{review.comments}”
                                </p>
                                {/* <!-- User Info --> */}
                              </div>
                              {/* <!-- Slide Info End --> */}
                            </div>
                          );
                        })}
                      </OwlCarousel>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ReviewsTestimonial;
