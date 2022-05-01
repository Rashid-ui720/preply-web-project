import React from "react";
import Rating from "react-rating";
import { BaseUrl } from "../utils/api_routes";
class TutorDashboardReviewCard extends React.Component {
  state = {};
  render() {
    const { review, index } = this.props;
    return (
      <div className="col-lg-6 col-md-6 col-sm-11 mb-9">
        <div className="pt-9 px-xl-9 px-lg-7 px-7 pb-7 light-mode-texts bg-white rounded hover-shadow-3">
          <div className="media align-items-center">
            <div className="square-52 bg-indigo mr-8 rounded">
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

            <div>
              <h3 className="font-size-6 mb-0">
                <a
                  className="heading-default-color font-weight-semibold"
                  href="#"
                >
                  {review.student.fname}
                </a>
              </h3>
              <a
                href="#"
                className="font-size-3 text-default-color line-height-2"
              >
                {review.created_at.split("T")[0]}
              </a>
            </div>
          </div>
          <div className="mt-5  d-flex flex-column">
            <Rating
              emptySymbol={<i className="fas fa-star empty-rating-star"></i>}
              fullSymbol={<i className="fas fa-star  fill-rating-star"></i>}
              readonly
              initialRating={parseInt(review.remarks)}
            />
            <a
              href="#"
              className="font-size-3 text-default-color line-height-2 review-text-container"
            >
              {review.comment}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TutorDashboardReviewCard;
