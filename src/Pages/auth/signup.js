import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import { connect } from "react-redux";
import { Register } from "../../Redux/Actions/authActions";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
import axios from "axios";
import { api } from "../../utils/api_routes";
class Signup extends React.Component {
  state = {
    mobile: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    FormView: "signupFrom",
    System_otp: "",
    user_otp: "",
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.password == this.state.confirmPassword) {
      let System_otp = Math.floor(100000 + Math.random() * 900000).toString();
      this.setState({ System_otp: System_otp });
      toast.dismiss();
      toast(() => ToastContent("Please Wait"), {
        toastId: "infoToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.INFO,
      });
      let OtpParams = {
        subject: "Your Otp for Registration",
        message:
          "Your OTP for Quran Teacher Live is " +
          System_otp +
          " please enter this in the required feild to complete the registration process.",
        email: this.state.email,
      };
      axios
        .post(api.sendOtp, OtpParams)
        .then((res) => {
          toast.dismiss();
          toast(
            () => ToastContent("An OTP is sent to your email for verification"),
            {
              toastId: "infoToast",
              hideProgressBar: true,
              autoClose: true,
              type: toast.TYPE.INFO,
            }
          );
          this.setState({ FormView: "otp" });
        })
        .catch((err) => {
          toast.dismiss();
          toast(() => ToastContent("An error accoured while sending OTP"), {
            toastId: "infoToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          });
        });
    } else {
      toast.dismiss();
      toast(() => ToastContent("Your passwords dose not match"), {
        toastId: "infoToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    }
  };
  handleSignup = (event) => {
    event.preventDefault();
    if (this.state.System_otp !== this.state.user_otp) {
      toast.dismiss();
      toast(() => ToastContent("Please enter correct OTP"), {
        toastId: "infoToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    } else {
      let Params = new FormData();
      Params.append("fname", this.state.name);
      Params.append("email", this.state.email);
      Params.append("password", this.state.password);
      Params.append("mobile", this.state.mobile);
      Params.append("role", this.state.role);
      this.props.Register(Params, this.props.onCloseSignupModal);
    }
  };
  // Rendr Otp View
  renderOtpView = () => {
    return (
      <div className="col-lg-7 col-md-6">
        <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
          <p className="mb-0 font-size-4 ">
            Please enter OTP that you received on Your given email
          </p>
          <form onSubmit={this.handleSignup}>
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                OTP
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="XXXXXX"
                id="code"
                required
                value={this.state.user_otp}
                onChange={(e) => this.setState({ user_otp: e.target.value })}
              />
            </div>

            <div className="form-group mb-8">
              <button
                className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Render SignupFrom
  renderSignupForm = () => {
    return (
      <div className="col-lg-7 col-md-6">
        <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label
                htmlFor="fullname"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="jhon doe"
                id="name"
                required
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email2"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
                id="email2"
                required
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="phnenumber"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Phone number
              </label>
              <PhoneInput
                className="regInput"
                vlaue={this.state.mobile}
                placeholder="Mobile Number"
                onChange={(value) => this.setState({ mobile: value })}
                required
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="password2"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Password
              </label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control"
                  id="password2"
                  placeholder="Enter password"
                  required
                  value={this.state.password}
                  onChange={(e) => this.setState({ password: e.target.value })}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                htmlFor="password23"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Confirm Password
              </label>
              <div className="position-relative">
                <input
                  type="password"
                  className="form-control"
                  id="password23"
                  placeholder="Enter password again"
                  required
                  value={this.state.confirmPassword}
                  onChange={(e) =>
                    this.setState({ confirmPassword: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-group d-flex flex-wrap justify-content-between mb-1">
              <label
                htmlFor="terms-check2"
                className="gr-check-input d-flex  mr-3"
              >
                <input className="d-none" type="checkbox" id="terms-check2" />
                <span className="checkbox mr-5"></span>
                <span className="font-size-3 mb-0 line-height-reset d-block">
                  Agree to the{" "}
                  <a href="#" className="text-primary">
                    Terms {"&"} Conditions
                  </a>
                </span>
              </label>
              <a href="#" className="font-size-3 text-dodger line-height-reset">
                Forget Password
              </a>
            </div>
            <div className="form-group mb-8">
              <button
                className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                type="submit"
              >
                Sign Up{" "}
              </button>
            </div>
            <p className="font-size-4 text-center heading-default-color">
              Already have an account?{" "}
              <a
                onClick={() => this.props.opneLoginModal()}
                className="text-primary"
              >
                Login to your account
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className=" max-width-px-840 position-relative">
        <button
          onClick={() => this.props.onCloseSignupModal()}
          type="button"
          className="circle-32 btn-reset bg-white pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="login-modal-main bg-white rounded-8 overflow-hidden">
          <div className="row no-gutters">
            <div className="col-lg-5 col-md-6">
              <div className="pt-10 pb-6 pl-11 pr-12 bg-black-2 h-100 d-flex flex-column dark-mode-texts">
                <div className="pb-9">
                  <h3 className="font-size-8 text-white line-height-reset pb-4 line-height-1p4">
                    Create a free account today
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Create your account to continue and meet Quran tutors.
                  </p>
                </div>
              </div>
            </div>
            {this.state.FormView == "signupFrom"
              ? this.renderSignupForm()
              : this.renderOtpView()}
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
    Register: (params, onCloseSignupModal) =>
      dispatch(Register(params, onCloseSignupModal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
