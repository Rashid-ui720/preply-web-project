import React from "react";
import { BaseUrl } from "../utils/api_routes";
import Rating from "react-rating";
import Progress from "react-progressbar";
import TutorReviewsForDetailPage from "../components/tutorReviewsForDetailPage";
import { ceil } from "lodash";
import ReactPaginate from "react-paginate";

class TutorReviews extends React.Component {
  state = {
    loading: true,
    reviewsData: null,
    loadMore: 5,
    studentreviews: [],
    hideloadmore: true,
    showPreviews: false,

    current_page:1,
    reviewsListPage:1
  };

  componentDidMount = () => {
    this.showResults()
  };

  showResults = (page = 1) => {
    var reviewsData = [];
    var start = 0;
    if(page == 1){
      start = 0;
    }else{
      start = (page - 1) * 5
    }

    var end = page * 5;
    for (var a = start; a < end; a++) {
      if (this.props.instructor_profile_reviews[a] != undefined)
        reviewsData.push(this.props.instructor_profile_reviews[a]);
    }
    
    this.setState({ studentreviews: reviewsData });
    
  };

  // ** Custom Pagination
  CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={this.state.current_page - 1}
      onPageChange={(page) => this.handlePagination(page)}
      pageCount={this.props.instructor_profile_reviews.length/5}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="page-active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link-pagination"
      nextLinkClassName="page-link-pagination fa fa-angle-right"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link-pagination fa fa-angle-left"
      pageLinkClassName="page-link-pagination"
      breakClassName="page-item"
      breakLinkClassName="page-link-pagination"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );

  // ** Function to handle Pagination
  handlePagination = (page) => {
    this.setState({ reviewsListPage: page.selected + 1 });
    this.showResults(page.selected + 1);
  };

  render() {
    const { instructor_profile_reviews, reviews } = this.props;
    return (
      <div
        className="p-5 pl-xs-12 pt-7 pb-5 bg-white rounded mb-10"
        id="taken_reviews_section"
      >
        <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
          Tutor Reviews
        </h4>
        <div
          className="col-12 col-xl-10 col-lg-12 col-md-10 col-xs-11 pt-lg-3 pb-lg-2"
          data-aos="fade-in"
          data-aos-duration="800"
          data-aos-once="true"
        >
          <div className="row no-gutters align-items-center justify-content-center">
            <div className="col-12 col-xl-12 col-lg-12">
              <div className="slide-content pl-5 pl-lg-0 pl-xxl-0 pr-0 pr-xl-0 py-lg-5 py-0">
                {/* <!-- review start --> */}
                <div className="pt-0">
                  <div className="row">
                    <div
                      className="col-md-6 pr-5"
                      style={{ borderRight: "2px solid #dcdcd8" }}
                    >
                      <div className="justify-content-center">
                        <div className="square-90 d-block mr-0 text-center">
                          <h4 className="font-size-5 text-black-2 mb-0">
                            Average Rating
                            <p className="text-center font-size-8 mb-0">
                              {Math.round(
                                reviews?.instructor_avg_rating[0]?.avg_reviews
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
                                  reviews?.instructor_avg_rating[0]?.avg_reviews
                                )
                              )}
                            />
                            <p
                              href="javascript:void(0)"
                              className="font-size-3 text-default-color line-height-2 underline"
                            >
                              {reviews.instructor_profile_reviews_count}{" "}
                              reviews!
                            </p>
                          </h4>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="col-md-6 pl-10 pr-0">
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
                              completed={reviews?.percentage?.fiveper}
                              className="progress_bg"
                            />
                          </span>
                          <span className="font-size-3">
                            {reviews?.percentage?.fiveper}%
                          </span>
                        </div>
                        <div className="square-90 d-flex mr-0">
                          <span className="font-size-3 mr-3 underline">
                            4 Stars
                          </span>
                          <span className="w-50 mr-3 mt-4">
                            <Progress
                              completed={reviews?.percentage?.fourper}
                              className="progress_bg"
                            />
                          </span>
                          <span className="font-size-3">
                            {reviews?.percentage?.fourper}%
                          </span>
                        </div>
                        <div className="square-90 d-flex mr-0">
                          <span className="font-size-3 mr-3 underline">
                            3 Stars
                          </span>
                          <span className="w-50 mr-3 mt-4">
                            <Progress
                              completed={reviews?.percentage?.threeper}
                              className="progress_bg"
                            />
                          </span>
                          <span className="font-size-3">
                            {reviews?.percentage?.threeper}%
                          </span>
                        </div>
                        <div className="square-90 d-flex mr-0">
                          <span className="font-size-3 mr-3 underline">
                            2 Stars
                          </span>
                          <span className="w-50 mr-3 mt-4">
                            <Progress
                              completed={reviews?.percentage?.twoper}
                              className="progress_bg"
                            />
                          </span>
                          <span className="font-size-3">
                            {reviews?.percentage?.twoper}%
                          </span>
                        </div>
                        <div className="square-90 d-flex mr-0">
                          <span className="font-size-3 mr-3 underline">
                            1 Stars
                          </span>
                          <span className="w-50 mr-3 mt-4">
                            <Progress
                              completed={reviews?.percentage?.oneper}
                              className="progress_bg"
                            />
                          </span>
                          <span className="font-size-3">
                            {reviews?.percentage?.oneper}%
                          </span>
                        </div>
                      </div>
                      {/* Star section end */}
                    </div>
                  </div>
                </div>
                {/*  review Info End */}
              </div>
            </div>
          </div>
        </div>
        {/* <!-- tutor scroll text review section start --> */}
        <TutorReviewsForDetailPage
          instructor_profile_reviews={this.state.studentreviews}
        />
        {this.CustomPagination()}
        {/* <!-- tutor scroll text review section end --> */}
      </div>
    );
  }
}

export default TutorReviews;
