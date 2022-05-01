import React from "react";

import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../../utils/api_routes";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
class StudentChnagePassword extends React.Component {
  state = {
    password: "",
    old_password: "",
  };

  //   Handle Reset Password
  handelResetPassword = (event) => {
    event.preventDefault();

    let Params = new FormData();
    Params.append("old_password", this.state.old_password);
    Params.append("password", this.state.password);
    Params.append("email", this.props.AuthData.email);

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
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () => ToastContent("An error accoured while reseting your password"),
          {
            toastId: "errorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };
  render() {
    const { AuthData } = this.props;

    return (
      <div className="" id="dashboard-body">
        <div className="">
          <div className="mb-15 mb-lg-23">
            <div className="row">
              <div className="col-xxxl-9 px-lg-13 px-6">
                <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                  <p className="mb-0 font-size-4 ">
                    Please fill all feilds to chnage your password
                  </p>
                  <form onSubmit={this.handelResetPassword}>
                    <div className="form-group">
                      <label
                        htmlFor="email"
                        className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                      >
                        Old Password
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
                        New Password
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="*****"
                        id="code"
                        required
                        value={this.state.password}
                        onChange={(e) =>
                          this.setState({ password: e.target.value })
                        }
                      />
                    </div>

                    <div className="form-group mb-8">
                      <button
                        className="btn btn-primary btn-medium  rounded-5 text-uppercase"
                        type="submit"
                      >
                        Change Password
                      </button>
                    </div>
                  </form>
                </div>
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

export default connect(mapStateToProps, null)(StudentChnagePassword);
