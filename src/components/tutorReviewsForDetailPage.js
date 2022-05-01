import React from "react";
import { BaseUrl } from "../utils/api_routes";
import Rating from "react-rating";
import Progress from "react-progressbar";

class tutorReviewsForDetailPage extends React.Component {
  reviewDate = (review_date) => {
    let dateArray = review_date.split("T");
    let date = dateArray[0];

    return date;
  };
  render() {
    const { instructor_profile_reviews } = this.props;
    return (
      <>
        <div className="tutor_reviews_portion-">
          {instructor_profile_reviews.length == 0 ? (
            <div className="d-flex align-items-center">
              <p className="font-size-4 text-center w-100 mb-7 mt-5">
                No reviews given to this Tutor yet
              </p>
            </div>
          ) : (
            instructor_profile_reviews.map((review, index) => {
              return (
                <div className="w-100" key={index}>
                  <div className="d-flex align-items-center pr-11 mb-9 flex-wrap flex-sm-nowrap">
                    <div className="square-72 d-block mr-8 mb-7 mb-sm-0">
                      <img
                        src={
                          review.student.user_img == null
                            ? `image/l3/png/userAvtar.webp`
                            : `${BaseUrl}/UserProfile/Images/${review.student.user_img}`
                        }
                        alt=""
                        className="lesson-detail-user-img"
                      />
                    </div>
                    <div className="w-100 mt-n2">
                      <h3 className="mb-0">
                        <a
                          className="font-size-6 text-black-2 font-weight-semibold"
                          href="#"
                        >
                          {review.student.fname}
                        </a>
                      </h3>
                      <div className="d-flex align-items-center justify-content-md-between flex-wrap">
                        <a href="#" className="font-size-2 text-gray mr-5">
                          {this.reviewDate(review.created_at)}
                        </a>
                      </div>
                      <div className="w-100">
                        <Rating
                          emptySymbol={
                            <i
                              className="fa fa-star font-size-3"
                              style={{ color: "#babfc7" }}
                            ></i>
                          }
                          fullSymbol={
                            <i
                              className="fa fa-star font-size-3"
                              style={{ color: "#ffa534" }}
                            ></i>
                          }
                          readonly={true}
                          step={1}
                          initialRating={parseInt(review.remarks)}
                        />
                      </div>

                      <a
                        href="#"
                        className="font-size-4 text-default-color line-height-2"
                      >
                        {review.comment}
                      </a>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </>
    );
  }
}

export default tutorReviewsForDetailPage;
