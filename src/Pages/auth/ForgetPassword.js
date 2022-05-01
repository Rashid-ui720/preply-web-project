import React from "react";
import axios from "axios";
import { api } from "../../utils/api_routes";
import { ToastContent } from "../../components/Toast";
import { toast } from "react-toastify";
class ForgetPassword extends React.Component {
  state = {
    email: "",
    code: "",
    password: "",
    old_password: "",
    verify: true,
    ForgetPasswordView: "email",
  };

  handleEmailSubmit = (event) => {
    event.preventDefault();
    let Params = new FormData();
    Params.append("email", this.state.email);
    toast.dismiss();
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.ForgetPasswordSendEmail, Params)
      .then((res) => {
        toast.dismiss();
        toast(
          () => ToastContent("Please check your email an code is sent to it."),
          {
            toastId: "successtoast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.SUCCESS,
          }
        );
        this.setState({ ForgetPasswordView: "otp" });
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () =>
            ToastContent(
              "An error accoured while sending verificaiton code to your email"
            ),
          {
            toastId: "errorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };

  //   Haandle Verification Code Check Api
  handleVerificationCodeCheck = (event) => {
    event.preventDefault();
    let Params = new FormData();
    Params.append("code", this.state.code);
    Params.append("email", this.state.email);
    toast.dismiss();
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.ForgetPasswordCodeCheck, Params)
      .then((res) => {
        toast.dismiss();
        this.setState({ ForgetPasswordView: "passwordReset" });
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () => ToastContent("Verification faild please enter correct code!"),
          {
            toastId: "errorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };

  //   Handle Reset Password
  handelResetPassword = (event) => {
    event.preventDefault();
    if (this.state.old_password !== this.state.password) {
      toast.dismiss();
      toast(
        () => ToastContent("Your passwords dose not match please check again!"),
        {
          toastId: "errorToast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        }
      );
    } else {
      let Params = new FormData();
      Params.append("old_password", this.state.old_password);
      Params.append("password", this.state.password);
      Params.append("email", this.state.email);
      Params.append("verify", this.state.verify);
      toast.dismiss();
      toast(() => ToastContent("Please Wait"), {
        toastId: "infoToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.INFO,
      });
      axios
        .post(api.ChangePassword, Params)
        .then((res) => {
          toast.dismiss();
          toast(() => ToastContent("Your password is chnaged successfully"), {
            toastId: "successtoast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.SUCCESS,
          });
          this.props.opneLoginModal();
        })
        .catch((err) => {
          toast.dismiss();
          toast(
            () =>
              ToastContent("An error accoured while reseting your password"),
            {
              toastId: "errorToast",
              hideProgressBar: true,
              autoClose: true,
              type: toast.TYPE.ERROR,
            }
          );
        });
    }
  };

  //   Render Email Submit View
  renderEmailSubmitView = () => {
    return (
      <div className="col-lg-7 col-md-6">
        <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
          <p className="mb-0 font-size-4 ">
            Please enter your registered email to receive verification code
          </p>
          <form onSubmit={this.handleEmailSubmit}>
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                E-mail
              </label>
              <input
                type="email"
                className="form-control"
                placeholder="example@gmail.com"
                id="email"
                required
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
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
            <p className="font-size-4 text-center heading-default-color">
              <a
                onClick={() => this.props.opneLoginModal()}
                className="text-primary"
              >
                Go back to login
              </a>
            </p>
          </form>
        </div>
      </div>
    );
  };

  //   Render verification code
  renderVerificationCode = () => {
    return (
      <div className="col-lg-7 col-md-6">
        <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
          <p className="mb-0 font-size-4 ">
            Please enter verificaiton code you received on your email
          </p>
          <form onSubmit={this.handleVerificationCodeCheck}>
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Verification Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="XXXXXX"
                id="code"
                required
                value={this.state.code}
                onChange={(e) => this.setState({ code: e.target.value })}
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

  //   render Password Reset
  renderPasswordReset = () => {
    return (
      <div className="col-lg-7 col-md-6">
        <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
          <p className="mb-0 font-size-4 ">Please enter your new Password</p>
          <form onSubmit={this.handelResetPassword}>
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                New Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="*****"
                id="code"
                required
                value={this.state.old_password}
                onChange={(e) =>
                  this.setState({ old_password: e.target.value })
                }
              />
            </div>
            <div className="form-group">
              <label
                htmlFor="email"
                className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="*****"
                id="code"
                required
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>

            <div className="form-group mb-8">
              <button
                className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                type="submit"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div className=" max-width-px-840 position-relative">
        <button
          onClick={() => this.props.onCloseForgetPasswordModal()}
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
                    Forget Password
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Please follow the steps to rreset your password
                  </p>
                </div>
              </div>
            </div>
            {this.state.ForgetPasswordView == "email"
              ? this.renderEmailSubmitView()
              : this.state.ForgetPasswordView == "otp"
              ? this.renderVerificationCode()
              : this.renderPasswordReset()}
          </div>
        </div>
      </div>
    );
  }
}

export default ForgetPassword;
