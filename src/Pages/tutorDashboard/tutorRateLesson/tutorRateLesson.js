import React from "react";
import { Link, Redirect } from "react-router-dom";
import { localRoutes } from "../../../utils/local_routes";
import { connect } from "react-redux";
import { SetInstructorLessonReview } from "../../../Redux/Actions/tutorReviewAction";
import { BaseUrl } from "../../../utils/api_routes";
import Rating from "react-rating";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
class TutorRateLessonModal extends React.Component {
  state = { behaviour_rating: 0, attention_rating: 0, progress_rating: 0 };

  SubmitReview = () => {
    const { AuthData } = this.props;

    if (
      this.state.behaviour_rating == 0 ||
      this.state.attention_rating == 0 ||
      this.state.progress_rating == 0
    ) {
      toast.dismiss();
      toast(() => ToastContent("Please give all ratings to submit review"), {
        toastId: "error",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    } else {
      let params = {
        instructor_user_id: AuthData.id ? AuthData.id : AuthData.user_id,
        student_user_id: this.props.selected_student.id,
        appointment_id: this.props.appointment_id,
        behaviour_rating: this.state.behaviour_rating,
        attention_rating: this.state.attention_rating,
        progress_rating: this.state.progress_rating,
      };
      this.props.SetInstructorLessonReview(
        params,

        true,
        this.props.onCloseRateLessonModal,
        this.props.getTutorLessons
      );
    }
  };

  render() {
    const { selected_student, AuthData } = this.props;

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
              <h4 className="mt-0 mb-5 ml-0 mr-0 text-center">
                Please rate your experience
              </h4>
              <img
                className="profile-image-package-booking "
                src={
                  selected_student.user_img == null
                    ? `image/l3/png/userAvtar.webp`
                    : `${BaseUrl}/UserProfile/Images/${selected_student.user_img}`
                }
                alt=""
              />
              <h6 className="mt-5 mb-0 ml-0 mr-0 text-center">
                {selected_student.fname}
              </h6>
              <p className="font-size-3 m-0 mb-10">{selected_student.email}</p>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 px-10 d-flex flex-column align-items-center">
              <h6 className="mt-5 mb-8 ml-0 mr-0 text-center">
                How happy are you with the student performance?
              </h6>
              {/* Behaviour rating */}
              <div className="d-flex ">
                <h6 className="font-size-4 mb-5 text-black-2 mr-4 font-weight-semibold">
                  Student Behavior :
                </h6>
                <Rating
                  emptySymbol={
                    <i className="fa fa-star" style={{ color: "#babfc7" }}></i>
                  }
                  fullSymbol={
                    <i className="fa fa-star" style={{ color: "#ffa534" }}></i>
                  }
                  onChange={(value) =>
                    this.setState({ behaviour_rating: value })
                  }
                  step={1}
                  initialRating={this.state.behaviour_rating}
                />
              </div>
              {/* Attendtion rating */}
              <div className="d-flex ">
                <h6 className="font-size-4 mb-5 text-black-2 mr-4 font-weight-semibold">
                  Student Attention :
                </h6>
                <Rating
                  emptySymbol={
                    <i className="fa fa-star" style={{ color: "#babfc7" }}></i>
                  }
                  fullSymbol={
                    <i className="fa fa-star" style={{ color: "#ffa534" }}></i>
                  }
                  onChange={(value) =>
                    this.setState({ attention_rating: value })
                  }
                  step={1}
                  initialRating={this.state.attention_rating}
                />
              </div>
              {/* Student progress rating */}
              <div className="d-flex ">
                <h6 className="font-size-4 mb-5 text-black-2 mr-4 font-weight-semibold">
                  Student Progress :
                </h6>
                <Rating
                  emptySymbol={
                    <i className="fa fa-star" style={{ color: "#babfc7" }}></i>
                  }
                  fullSymbol={
                    <i className="fa fa-star" style={{ color: "#ffa534" }}></i>
                  }
                  onChange={(value) =>
                    this.setState({ progress_rating: value })
                  }
                  step={1}
                  initialRating={this.state.progress_rating}
                />
              </div>
              <div className="d-flex justify-content-center w-100 mt-3">
                <a
                  onClick={() => this.SubmitReview()}
                  className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
                >
                  Submit Review
                </a>
              </div>
              {/* <p
                className="mt-10 mb-8 ml-0 mr-0 text-center font-size-4  "
                style={{ width: "70%" }}
              >
                Rate the lesson on the 5-star scale above. It is anonymous and
                helps us ensure 100% learning satisfaction
              </p> */}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    SetInstructorLessonReview: (
      params,
      closeModal,
      onCloseRateLessonModal,
      getTutorLessons
    ) =>
      dispatch(
        SetInstructorLessonReview(
          params,
          closeModal,
          onCloseRateLessonModal,
          getTutorLessons
        )
      ),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorRateLessonModal);
