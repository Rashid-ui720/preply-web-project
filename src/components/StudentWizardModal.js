import React from "react";
import { connect } from "react-redux";
import { Logout } from "../Redux/Actions/authActions";
import StepProgressBar from "react-step-progress";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../utils/api_routes";
import { getChildDetail } from "../Redux/Actions/tutorDetailAction";
class StudentWizardModal extends React.Component {
  state = {
    step: 1,
    interested_course: "",
    is_parent: null,
    childrens: null,
    childrens_name: null,
  };

  nextStep = () => {
    const { step, interested_course, is_parent, childrens } = this.state;
    if (step == 1) {
      if (interested_course == "") {
        toast.dismiss();
        toast(() => ToastContent("Please select an option first"), {
          toastId: "error",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
        return;
      } else {
        this.setState({ step: step + 1 });
      }
    }

    if (step == 2) {
      if (is_parent == null) {
        toast.dismiss();
        toast(() => ToastContent("Please select an option first"), {
          toastId: "error",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
        return;
      } else {
        this.setState({ step: step + 1 });
      }
    }

    if (step === 3) {
      if (childrens == null) {
        toast.dismiss();
        toast(() => ToastContent("Please select childrens"), {
          toastId: "error",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
        return;
      } else {
        this.setState({ step: step + 1 });
      }
    }
  };
  PreviousStep = () => {
    const { step, interested_course } = this.state;

    this.setState({ step: step - 1 });
  };
  QuestionOne = () => {
    return (
      <div className="col-12">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <div className="step-wizard">
              <h6 className="m-0" style={{ color: "white" }}>
                1
              </h6>
            </div>
            <p>Step 1</p>
          </div>
        </div>
        <div className="row p-0 m-0 ">
          <p className="col-12 p-0 m-0 mb-6 mt-8">
            What Course are you interested in?
          </p>
        </div>

        <div className="d-flex flex-column">
          <div className="row col-12">
            <label
              htmlFor="terms-check1"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check1"
                checked={this.state.interested_course == "Basic Quran Reading"}
                onChange={() =>
                  this.setState({ interested_course: "Basic Quran Reading" })
                }
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                Basic Quran Reading
              </span>
            </label>
          </div>
          {/* option */}
          <div className="row col-12">
            <label
              htmlFor="terms-check2"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check2"
                checked={this.state.interested_course == "Tajweed Al Quran"}
                onChange={() =>
                  this.setState({ interested_course: "Tajweed Al Quran" })
                }
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                Tajweed Al Quran
              </span>
            </label>
          </div>
          {/* option */}
          <div className="row col-12">
            <label
              htmlFor="terms-check3"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check3"
                checked={this.state.interested_course == "Quran Memorisation"}
                onChange={() =>
                  this.setState({ interested_course: "Quran Memorisation" })
                }
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                Quran Memorisation
              </span>
            </label>
          </div>
        </div>

        <div className="d-flex w-100 justify-content-end">
          <button
            className=" btn-step rounded-5 "
            onClick={() => this.nextStep()}
          >
            Next
          </button>
        </div>
      </div>
    );
  };

  QuestionTwo = () => {
    return (
      <div className="col-12 ">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <div className="step-wizard">
              <h6 className="m-0" style={{ color: "white" }}>
                2
              </h6>
            </div>
            <p>Step 2</p>
          </div>
        </div>
        <div className="row p-0 m-0 ">
          <p className="col-12 p-0 m-0 mb-6 mt-8">Are you a parent?</p>
        </div>

        <div className="d-flex flex-column">
          <div className="row col-12">
            <label
              htmlFor="terms-check1"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check1"
                checked={this.state.is_parent == 1}
                onChange={() => this.setState({ is_parent: 1 })}
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                Yes
              </span>
            </label>
          </div>
          {/* option */}
          <div className="row col-12">
            <label
              htmlFor="terms-check2"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check2"
                checked={this.state.is_parent == 0}
                onChange={() => this.setState({ is_parent: 0 })}
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                No
              </span>
            </label>
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between">
          <button
            className=" btn-step rounded-5 "
            onClick={() => this.PreviousStep()}
          >
            Previous
          </button>
          {this.state.is_parent == 1 ? (
            <button
              className=" btn-step rounded-5 "
              onClick={() => this.nextStep()}
            >
              Next
            </button>
          ) : this.state.is_parent == 0 ? (
            <button
              className=" btn-step rounded-5 "
              onClick={() => this.handleSubmit()}
            >
              Submit
            </button>
          ) : null}
        </div>
      </div>
    );
  };

  QuestionThree = () => {
    return (
      <div className="col-12 ">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <div className="step-wizard">
              <h6 className="m-0" style={{ color: "white" }}>
                3
              </h6>
            </div>
            <p>Step 3</p>
          </div>
        </div>
        <div className="row p-0 m-0 ">
          <p className="col-12 p-0 m-0 mb-6 mt-8">
          How many children?
          </p>
        </div>

        <div className="d-flex flex-column">
          <div className="row col-12">
            <label
              htmlFor="terms-check1"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check1"
                checked={this.state.childrens == 1}
                onChange={() => this.setState({ childrens: 1 })}
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                1
              </span>
            </label>
          </div>
          {/* option */}
          <div className="row col-12">
            <label
              htmlFor="terms-check2"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check2"
                checked={this.state.childrens == 2}
                onChange={() => this.setState({ childrens: 2 })}
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                2
              </span>
            </label>
          </div>
          {/* option */}
          <div className="row col-12">
            <label
              htmlFor="terms-check3"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check3"
                checked={this.state.childrens == 3}
                onChange={() => this.setState({ childrens: 3 })}
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                3
              </span>
            </label>
          </div>
          <div className="row col-12">
            <label
              htmlFor="terms-check4"
              className="gr-check-input d-flex  mr-3"
            >
              <input
                className="d-none"
                type="checkbox"
                id="terms-check4"
                checked={this.state.childrens === 4}
                onChange={() => this.setState({ childrens: 4 })}
              />
              <span className="checkbox mr-5"></span>
              <span className="font-size-3 mb-0 line-height-reset d-block">
                4+
              </span>
            </label>
          </div>
        </div>

        <div className="d-flex w-100 justify-content-between">
          <button
            className=" btn-step rounded-5 "
            onClick={() => this.PreviousStep()}
          >
            Previous
          </button>

          <button
            className=" btn-step rounded-5 "
            onClick={
              (() => this.handleSubmit())
            }
          >
            Submit
          </button> 
        </div>
      </div>
    );
  };

  QuestionFour = () => {
    return (
      <div className="col-12 ">
        <div className="d-flex justify-content-center">
          <div className="d-flex flex-column align-items-center">
            <div className="step-wizard">
              <h6 className="m-0" style={{ color: "white" }}>
                4
              </h6>
            </div>
            <p>Step 4</p>
          </div>
        </div>
        <div className="row p-0 m-0 ">
          <p className="col-12 p-0 m-0 mb-6 mt-8">
            Please fill with all children(s) name.
          </p>
        </div>

        <div className="d-flex flex-column">
          <div className="row col-12">
            <textarea
              name="childrenname"
              id="aboutTextarea"
              cols="30"
              rows="5"
              className="border border-mercury text-gray w-100 pt-4 pl-6"
              placeholder="Children name one, Children name Two, Children name three"
              required
              onChange={(e) => this.setState({ childrens_name: e.target.value })}
            ></textarea>
            <small className="ml-5 mb-5">Please enter child name with comma seperate</small>
            <br />
          </div>
          {/* option */}
        </div>

        <div className="d-flex w-100 justify-content-between">
          <button
            className=" btn-step rounded-5 "
            onClick={() => this.PreviousStep()}
          >
            Previous
          </button>

          <button
            className=" btn-step rounded-5 "
            onClick={
              (() => this.handleSubmit())
            }
          >
            Submit
          </button> 
        </div>
      </div>
    );
  };

  handleSubmit = () => {
    const { is_parent, interested_course, childrens, step , childrens_name } = this.state;
    const { AuthData } = this.props;

    if(step === 4 && (childrens_name === '' || childrens_name === null)){
      toast.dismiss();
      toast(() => ToastContent("Please fill children name"), {
        toastId: "error",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
      return;  
    }

    let params = {
      is_parent: is_parent,
      interested_course: interested_course,
      childrens: childrens,
      student_user_id: AuthData.id ? AuthData.id : AuthData.user_id,
      children_name: childrens_name
    };

    toast.dismiss();
    toast(() => ToastContent("Please Wait"), {
      toastId: "info",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
    });

    axios
      .post(api.studentWizardApi, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Thank you for completing the wizard"), {
          toastId: "success",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.SUCCESS,
        });
        this.props.getChildDetail(res.data.parent_child);
        localStorage.setItem("wizar_check", true);
        this.props.onCloseWizardModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };
  render() {
    return (
      <div className=" max-width-px-840 position-relative">
        {/* <button
          onClick={() => this.props.onCloseWizardModal()}
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button> */}
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-12">
              <div className="bg-white-2 h-100 px-0 pt-11 pb-7 wizard-width ">
                <div className="d-flex justify-content-center px-5">
                  <p className="text-align-center">
                    Lets Create Your Dashboard
                  </p>
                </div>

                {this.state.step === 1
                  ? this.QuestionOne()
                  : this.state.step === 2
                  ? this.QuestionTwo()
                  : this.state.step === 3
                  ? this.QuestionThree()
                  : this.QuestionFour()}
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => dispatch(Logout()),
    getChildDetail: (child_data) => dispatch(getChildDetail(child_data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentWizardModal);
