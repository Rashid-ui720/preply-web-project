import React from "react";
import Rating from "react-rating";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../Pages/auth/login";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { SetStudentLessonReview } from "../Redux/Actions/studentReviewActions";
class AddTutorReview extends React.Component {
  state = { rating: 0, comment: "", loginModal: false, showForm: false };

  SubmitReview = () => {
    const { AuthData, AuthError } = this.props;

    if (this.state.rating == 0 || this.state.comment == "") {
      toast.dismiss();
      toast(() => ToastContent("Please fill all the feilds to submit review"), {
        toastId: "error",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    } else {
      let params = {
        student_user_id: AuthData.id ? AuthData.id : AuthData.user_id,
        instructor_user_id: this.props.tutor_id,
        comment: this.state.comment,
        remarks: this.state.rating,
      };
      this.props.SetStudentLessonReview(params, true);
    }
  };
  showMessage = (message, type) => {
    toast.dismiss();
    toast(() => ToastContent(message), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: type,
    });
  };
  opneLoginModal = () => {
    this.setState({ signupModal: false });
    this.setState({ loginModal: true });
  };

  onCloseLoginModal = () => {
    this.setState({ loginModal: false });
  };
  render() {
    const { AuthData, AuthError } = this.props;
    return (
      <div className="bg-white rounded p-5 pl-xs-12 pt-7 pb-5">
        {/* Add Review Form */}
        <div>
          {this.state.showForm === true ? (
            <>
              <h4 className="font-size-6 mb-7 mt-5 text-black-2 font-weight-semibold">
                Add Review
              </h4> 
              <div className="d-flex ">
                <h6 className="font-size-4 mb-5 text-black-2 font-weight-semibold">
                  Rating :
                </h6>
                <Rating
                  emptySymbol={
                    <i className="fa fa-star" style={{ color: "#babfc7" }}></i>
                  }
                  fullSymbol={
                    <i className="fa fa-star" style={{ color: "#ffa534" }}></i>
                  }
                  onChange={(value) => this.setState({ rating: value })}
                  step={1}
                  initialRating={this.state.rating}
                />
              </div>
              <textarea
                name="textarea"
                id="Your comment"
                cols="30"
                rows="6"
                className="border border-mercury text-gray w-100 pt-4 pl-6"
                placeholder="Describe about your self"
                value={this.state.comment}
                required
                onChange={(e) => this.setState({ comment: e.target.value })}
              ></textarea>
              <div className="d-flex justify-content-end w-100 mt-4">
                {AuthData !== null ? (
                  AuthData.role !== "student" ? (
                    <a
                      className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
                      onClick={() =>
                        this.showMessage(
                          "You cant give a Review from a tutor account please login with a student account",
                          toast.TYPE.ERROR
                        )
                      }
                    >
                      Submit Review
                    </a>
                  ) : (
                    <a
                      onClick={() => this.SubmitReview()}
                      className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
                    >
                      Submit Review
                    </a>
                  )
                ) : (
                  <a
                    className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
                    onClick={() => this.opneLoginModal()}
                  >
                    Submit Review
                  </a>
                )}
              </div>
            </>
          ) : (
            <div className="text-right">
              <button className="btn btn-success p-2 mb-5 mt-5" onClick={() => this.setState({showForm : true})}>Click here to add review</button>
            </div>
          )}

          {/* Login form Modal */}
          <Modal
            center
            open={this.state.loginModal}
            showCloseIcon={false}
            onClose={this.onCloseLoginModal}
          >
            <Login
              onCloseLoginModal={this.onCloseLoginModal}
              opneSignupModal={this.opneSignupModal}
            />
          </Modal>
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
    SetStudentLessonReview: (params, referesh) =>
      dispatch(SetStudentLessonReview(params, referesh)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddTutorReview);
