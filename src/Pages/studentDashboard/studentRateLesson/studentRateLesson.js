import React from "react";
import { Link, Redirect } from "react-router-dom";
import { localRoutes } from "../../../utils/local_routes";
import { connect } from "react-redux";
import { getTutorDetail } from "../../../Redux/Actions/tutorDetailAction";
import { SetStudentLessonReview } from "../../../Redux/Actions/studentReviewActions";
import Loader from "../../../components/loader";
import ErrorMessage from "../../../components/ErrorMessage";
import { BaseUrl } from "../../../utils/api_routes";
import Rating from "react-rating";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
class StudentRateLessonModal extends React.Component {
  state = { rating: 0 };
  componentDidMount() {
    this.props.getTutorDetail(this.props.tutor_id);
  }

  SubmitReview = () => {
    const { AuthData } = this.props;

    if (this.state.rating == 0) {
      toast.dismiss();
      toast(() => ToastContent("Please give some rating to submit review"), {
        toastId: "error",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    } else {
      let params = {
        student_user_id: AuthData.id ? AuthData.id : AuthData.user_id,
        appointment_id: this.props.appointment_id,
        remarks: this.state.rating,
      };
      this.props.SetStudentLessonReview(
        params,
        false,
        true,
        this.props.onCloseRateLessonModal,
        this.props.getStudentLessons
      );
    }
  };

  render() {
    const { tutorDetail, tutorDetailError, tutorDetailLoader, AuthData } =
      this.props;

    if (tutorDetailLoader) {
      return (
        <div className="mt-35 mb-30 min-width-60">
          <Loader />
        </div>
      );
    }
    if (tutorDetailError !== null) {
      return (
        <div className="mt-35 mb-30">
          <ErrorMessage message="An unkown error accoured while fetching tutor data" />
        </div>
      );
    }
    return (
      <div className="bg-white select_packages_modal_width position-relative">
        <button
          onClick={() => this.props.onCloseRateLessonModal()}
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>

        <div className="bg-white rounded-4 border border-mercury shadow-9 pt-10 pb-10">
          <div className="row d-flex flex-column align-items-center">
            <div className="col-12 d-flex flex-column align-items-center ">
              <h4 className="mt-5 mb-0 ml-0 mr-0 text-center">
                Lesson confirmed
              </h4>
              <h4 className="mt-0 mb-5 ml-0 mr-0 text-center">
                Please rate your experience
              </h4>
              <img
                className="profile-image-package-booking "
                src={
                  tutorDetail.user_img == null
                    ? `image/l3/png/userAvtar.webp`
                    : `${BaseUrl}/UserProfile/Images/${tutorDetail.user_img}`
                }
                alt=""
              />
              <h6 className="mt-5 mb-0 ml-0 mr-0 text-center">
                {tutorDetail.fname}
              </h6>
              <p className="font-size-3 m-0 mb-10">{tutorDetail.email}</p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 px-10 d-flex flex-column align-items-center">
              <h6 className="mt-5 mb-8 ml-0 mr-0 text-center">
                How happy are you with the lesson?
              </h6>
              <Rating
                emptySymbol={
                  <i
                    className="fa fa-star"
                    style={{ color: "#babfc7", fontSize: "25px" }}
                  ></i>
                }
                fullSymbol={
                  <i
                    className="fa fa-star"
                    style={{ color: "#ffa534", fontSize: "25px" }}
                  ></i>
                }
                onChange={(value) => this.setState({ rating: value })}
                step={1}
                initialRating={this.state.rating}
              />
              <p
                className="mt-10 mb-8 ml-0 mr-0 text-center font-size-4  "
                style={{ width: "70%" }}
              >
                Rate the lesson on the 5-star scale above. It is anonymous and
                helps us ensure 100% learning satisfaction
              </p>

              <div className="d-flex justify-content-center w-100 mt-3">
                <a
                  onClick={() => this.SubmitReview()}
                  className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
                >
                  Submit Review
                </a>
              </div>
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
    SetStudentLessonReview: (
      params,
      referesh,
      closeModal,
      onCloseRateLessonModal,
      getStudentLessons
    ) =>
      dispatch(
        SetStudentLessonReview(
          params,
          referesh,
          closeModal,
          onCloseRateLessonModal,
          getStudentLessons
        )
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentRateLessonModal);
