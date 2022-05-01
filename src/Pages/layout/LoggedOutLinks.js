import React from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../auth/login";
import Signup from "../auth/signup";
import ForgetPassword from "../auth/ForgetPassword";
class LoggedOutLinks extends React.Component {
  state = { loginModal: false, signupModal: false, forgetPasswordModal: false };

  opneLoginModal = () => {
    this.setState({ signupModal: false });
    this.setState({ forgetPasswordModal: false });
    this.setState({ loginModal: true });
  };

  onCloseLoginModal = () => {
    this.setState({ loginModal: false });
  };
  opneForgetPasswordModal = () => {
    this.setState({ signupModal: false });
    this.setState({ loginModal: false });
    this.setState({ forgetPasswordModal: true });
  };

  onCloseForgetPasswordModal = () => {
    this.setState({ forgetPasswordModal: false });
  };

  opneSignupModal = () => {
    this.setState({ loginModal: false });
    this.setState({ forgetPasswordModal: false });
    this.setState({ signupModal: true });
  };

  onCloseSignupModal = () => {
    this.setState({ signupModal: false });
  };

  render() {
    return (
      <div className="header-btns header-btn-devider ml-auto pr-2 ml-lg-6 d-none d-xs-flex">
        <a
          className="btn btn-transparent text-uppercase font-size-3 heading-default-color focus-reset"
          onClick={() => this.opneLoginModal()}
        >
          Log in
        </a>
        <a
          className="btn btn-primary text-uppercase font-size-3"
          onClick={() => this.opneSignupModal()}
        >
          Sign up
        </a>

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
            opneForgetPasswordModal={this.opneForgetPasswordModal}
          />
        </Modal>

        {/* Signup formmodal */}
        <Modal
          center
          open={this.state.signupModal}
          showCloseIcon={false}
          onClose={this.onCloseSignupModal}
        >
          <Signup
            onCloseSignupModal={this.onCloseSignupModal}
            opneLoginModal={this.opneLoginModal}
          />
        </Modal>

        {/* Forget Password formmodal */}
        <Modal
          center
          open={this.state.forgetPasswordModal}
          showCloseIcon={false}
          onClose={this.onCloseForgetPasswordModal}
        >
          <ForgetPassword
            onCloseForgetPasswordModal={this.onCloseForgetPasswordModal}
            opneLoginModal={this.opneLoginModal}
          />
        </Modal>
      </div>
    );
  }
}

export default LoggedOutLinks;
