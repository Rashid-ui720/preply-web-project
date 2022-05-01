import React from "react";
import { connect } from "react-redux";
import { Register } from "../Redux/Actions/authActions";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";

class BecomeTutorHeader extends React.Component {
  state = {
    mobile: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "instructor",
  };
  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.password == this.state.confirmPassword) {
      let Params = new FormData();
      Params.append("fname", this.state.name);
      Params.append("email", this.state.email);
      Params.append("password", this.state.password);
      Params.append("role", this.state.role);

      this.props.Register(Params);
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

  render() {
    return (
      <div className="bg-gradient-1   position-relative z-index-1 overflow-hidden">
        {/* <!-- .Hero pattern --> */}
        <div className="pos-abs-tr w-50 z-index-n2">
          <img
            src="image/patterns/hero-pattern.png"
            alt=""
            className="gr-opacity-1"
          />
        </div>
        {/* <!-- ./Hero pattern --> */}
        <div className="container">
          <div className="row position-relative align-items-center ">
            <div
              className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 pt-20 pt-md-25 pt-lg-25 pb-7  "
              data-aos="fade-right"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className="bg-white pt-5 pb-5 pl-10 pr-10 rounded">
                {/* <!-- .search-form --> */}
                <h4 className="text-center w-100 mb-3">Sign up as a Tutor</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label
                      htmlFor="fullname"
                      className="font-size-3 text-black-2 font-weight-semibold line-height-reset"
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
                      className="font-size-3 text-black-2 font-weight-semibold line-height-reset"
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
                      htmlFor="password2"
                      className="font-size-3 text-black-2 font-weight-semibold line-height-reset"
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
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password23"
                      className="font-size-3 text-black-2 font-weight-semibold line-height-reset"
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

                  <div className="form-group mb-8">
                    <button
                      className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                      type="submit"
                    >
                      Sign Up{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* <!-- Hero Right Image --> */}
            <div
              className="col-lg-6 col-md-4 col-sm-10 col-xs-12 col-12  pos-abs-br z-index-n1 position-static position-md-absolute mx-auto ml-md-auto"
              data-aos="fade-left"
              data-aos-duration="800"
              data-aos-once="true"
            >
              <div className=" ml-xxl-23 ml-xl-12 ml-md-7">
                <img
                  src="image/l1/tutor_signup_img.png"
                  alt=""
                  className="w-65"
                />
              </div>
            </div>
            {/* <!-- ./Hero Right Image --> */}
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
    Register: (params) => dispatch(Register(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BecomeTutorHeader);
