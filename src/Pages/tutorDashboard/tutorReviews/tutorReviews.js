import React from "react";
import TutorDashboardReviewCard from "../../../components/tutorDashboardReviewCard";
import { localRoutes } from "../../../utils/local_routes";
import { connect } from "react-redux";
import { getTutorDetail } from "../../../Redux/Actions/tutorDetailAction";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
class TutorDashboardReviews extends React.Component {
  state = {};
  async componentDidMount() {
    const { AuthData } = this.props;

    this.props.getTutorDetail(AuthData.id ? AuthData.id : AuthData.user_id);
  }
  render() {
    const { tutorDetail, tutorDetailError, tutorDetailLoader, AuthData } =
      this.props;
    if (tutorDetailLoader && JSON.stringify(tutorDetail) == "{}") {
      return <DashboardLoader />;
    }

    if (tutorDetailError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
        />
      );
    }

    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container">
          <div className="mb-5">
            <h4 className="font-size-7 mb-9">Reviews</h4>
            <div className="row justify-content-start">
              {tutorDetail.instructor_profile_reviews.length == 0 ? (
                <div className="w-100 mt-10 text-center">
                  <h6>No reviews found</h6>
                </div>
              ) : (
                tutorDetail.instructor_profile_reviews.map((review, index) => {
                  return (
                    <TutorDashboardReviewCard
                      review={review}
                      key={index}
                      index={index}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    tutorDetail: state.tutorDetail.tutorDetail,
    tutorDetailError: state.tutorDetail.tutorDetailError,
    tutorDetailLoader: state.tutorDetail.tutorDetailLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDetail: (tutor_id) => dispatch(getTutorDetail(tutor_id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorDashboardReviews);
