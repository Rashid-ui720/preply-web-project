import React from "react";
import { connect } from "react-redux";
import { Login as UserLogin } from "../../Redux/Actions/authActions";
class Login extends React.Component {
  state = { email: "", password: "" };

  handleSubmit = (event) => {
    event.preventDefault();
    let Params = new FormData();
    Params.append("email", this.state.email);
    Params.append("password", this.state.password);
    this.props.UserLogin(Params, this.props.onCloseLoginModal);
  };
  render() {
    const { AuthData, AuthError } = this.props;
    return (
      <div className=" max-width-px-840 position-relative">
        <button
          onClick={() => this.props.onCloseLoginModal()}
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
                    Welcome Back
                  </h3>
                  <p className="mb-0 font-size-4 text-white">
                    Log in to continue to learn and grow your knowledge with
                    expert Quran teachers.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-7 col-md-6">
              <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                <form onSubmit={this.handleSubmit}>
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
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                    >
                      Password
                    </label>
                    <div className="position-relative">
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Enter password"
                        required
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group d-flex flex-wrap justify-content-between">
                    <label
                      htmlFor="terms-check"
                      className="gr-check-input d-flex  mr-3"
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check"
                      />
                      <span className="checkbox mr-5"></span>
                      <span className="font-size-3 mb-0 line-height-reset mb-1 d-block">
                        Remember password
                      </span>
                    </label>
                    <a
                      className="font-size-3 text-dodger line-height-reset"
                      onClick={() => this.props.opneForgetPasswordModal()}
                    >
                      Forget Password
                    </a>
                  </div>
                  <div className="form-group mb-8">
                    <button
                      className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                      type="submit"
                    >
                      Log in{" "}
                    </button>
                  </div>
                  <p className="font-size-4 text-center heading-default-color">
                    Don’t have an account?{" "}
                    <a
                      onClick={() => this.props.opneSignupModal()}
                      className="text-primary"
                    >
                      Create a free account
                    </a>
                  </p>
                </form>
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
    UserLogin: (params, onCloseLoginModal) =>
      dispatch(UserLogin(params, onCloseLoginModal)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
