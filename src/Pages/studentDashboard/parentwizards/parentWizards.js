import React from "react";

import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../../utils/api_routes";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
import { updateStudentWizardData } from "../../../Redux/Actions/studentProfileActions";
import $ from "jquery";
import { Modal } from "react-responsive-modal";
class parentWizards extends React.Component {
  state = {
    editChildName: "",
    deleteChildName: "",
    editChildId: "",
    deleteChildId: "",
    childData: [],
    showdata: false,
    childModal: false,
    childname: "",
  };

  componentDidMount = () => {
    this.getParentWizardChildData();
  };

  // get parent wizrd child data
  getParentWizardChildData = () => {
    toast.dismiss();
    toast(() => ToastContent("Please wait........!"), {
      toastId: "successtoast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.SUCCESS,
    });

    axios
      .get(api.getParentWizardDataForProfile + this.props.AuthData.id)
      .then((res) => {
        toast.dismiss();
        this.setState({ childData: res.data, showdata: true });
      })
      .catch((err) => {
        toast.dismiss();
        toast(
          () => ToastContent("An error accoured while getting wizard data"),
          {
            toastId: "errorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };

  deleteChild = (child) => {
    toast.dismiss();
    toast(() => ToastContent("Please wait........!"), {
      toastId: "successtoast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.SUCCESS,
    });
    axios
      .get(api.deleteParentChild + child)
      .then(async (res) => {
        toast.dismiss();
        toast(() => ToastContent("Child has been deleted successfully"), {
          toastId: "successtoast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.SUCCESS,
        });
        document.getElementById("child_" + child).remove();
        await localStorage.setItem("parentChild", res.data.wizard_child_data);
        this.props.updateStudentWizardData(res.data.wizard_child_data);
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("An error accoured while deleting child"), {
          toastId: "errorToast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
      });
  };

  updateChild = (child, name) => {
    toast.dismiss();
    toast(() => ToastContent("Please wait.......!"), {
      toastId: "successtoast",
      hideProgressBar: true,
      autoClose: true,
      type: toast.TYPE.SUCCESS,
    });
    axios
      .post(api.updateParentChild, { name: name, id: child })
      .then(async (res) => {
        toast.dismiss();
        toast(() => ToastContent("Child has been updated successfully"), {
          toastId: "successtoast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.SUCCESS,
        });
        document.getElementById("child_" + child).style.display = "block";
        document.getElementById("child_input_" + child).style.display = "none";
        $("#child_" + child)
          .find("span:first")
          .text(name);
        await localStorage.setItem("parentChild", res.data.wizard_child_data);
        this.props.updateStudentWizardData(res.data.wizard_child_data);
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("An error accoured while deleting child"), {
          toastId: "errorToast",
          hideProgressBar: true,
          autoClose: true,
          type: toast.TYPE.ERROR,
        });
      });
  };

  showInputText = (child, option) => {
    if (option === "close") {
      document.getElementById("child_" + child).style.display = "block";
      document.getElementById("child_input_" + child).style.display = "none";
    } else if (option === "edit") {
      document.getElementById("child_" + child).style.display = "none";
      document.getElementById("child_input_" + child).style.display = "block";
    } else if (option === "save") {
      var name = document.getElementById("childname_" + child).value;
      document.getElementById("child_" + child).style.display = "block";
      document.getElementById("child_input_" + child).style.display = "none";
      this.updateChild(child, name);
    }
  };

  openChildModal = () => {
    this.setState({ childModal: true });
  };

  onCloseChildModal = () => {
    this.setState({ childModal: false });
  };

  handleSubmit = () => {
    if (this.state.childname !== "") {
      toast.dismiss();
      toast(() => ToastContent("Please wait.....!"), {
        toastId: "successtoast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.SUCCESS,
      });
      axios
        .post(api.addParentChild, {
          name: this.state.childname,
          user_id: this.props.AuthData.id,
        })
        .then(async (res) => {
          this.setState({ childModal: true });
          await localStorage.setItem("parentChild", res.data.wizard_child_data);
          this.props.updateStudentWizardData(res.data.wizard_child_data);
          toast.dismiss();
          toast(() => ToastContent("Child has been added successfully"), {
            toastId: "successtoast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.SUCCESS,
          });
          window.location.reload();
        })
        .catch((err) => {
          toast.dismiss();
          toast(() => ToastContent("An error accoured while adding child"), {
            toastId: "errorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          });
        });
    } else {
      toast.dismiss();
      toast(() => ToastContent("Please enter valid name thanks....!"), {
        toastId: "errorToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
    }
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
                  <div className="row">
                    <div className="col-12">
                      <p className="mb-0 font-size-4 ">
                        <b>Parent Wizards Data</b>
                        <div className="float-right">
                          <button
                            className="bg-primary p-5 text-white border-0"
                            onClick={() => this.openChildModal()}
                          >
                            Add New Child
                          </button>
                        </div>
                      </p>
                    </div>
                  </div>
                  {this.state.showdata === true ? (
                    <div className="col-12 mt-5">
                      {this.state.childData.wizard_child_data?.length > 0
                        ? this.state.childData.wizard_child_data.map(
                            (element) => {
                              return (
                                <div>
                                  <div
                                    className="col-12 p-5 mb-2"
                                    style={{
                                      backgroundColor: "#fff",
                                      display: "none",
                                    }}
                                    id={"child_input_" + element.id}
                                  >
                                    <span className="w-60 text-left">
                                      <input
                                        type="text"
                                        name={"childname_" + element.id}
                                        id={"childname_" + element.id}
                                        defaultValue={element.name}
                                      />
                                    </span>
                                    <span className="w-40 text-right">
                                      <button
                                        className="mr-2 text-primary"
                                        style={{
                                          border: "none",
                                          backgroundColor: "#fff",
                                        }}
                                        onClick={(e) =>
                                          this.showInputText(element.id, "save")
                                        }
                                      >
                                        <i
                                          className="fa fa-save"
                                          title="Save child name"
                                        ></i>
                                      </button>
                                      <button
                                        className="mr-2 text-primary"
                                        style={{
                                          border: "none",
                                          backgroundColor: "#fff",
                                        }}
                                        onClick={(e) =>
                                          this.showInputText(
                                            element.id,
                                            "close"
                                          )
                                        }
                                      >
                                        <i
                                          className="fa fa-times-circle"
                                          title="Cancel"
                                        ></i>
                                      </button>
                                    </span>
                                  </div>
                                  <div
                                    className="col-12 p-5 mb-2"
                                    style={{ backgroundColor: "#fff" }}
                                    id={"child_" + element.id}
                                  >
                                    <span className="font-size-5 text-primary w-25 pl-5">
                                      {element.name}
                                    </span>
                                    <span className="w-75 text-right">
                                      <button
                                        className="mr-2 text-primary"
                                        style={{
                                          border: "none",
                                          backgroundColor: "#fff",
                                        }}
                                        onClick={(e) =>
                                          this.showInputText(element.id, "edit")
                                        }
                                      >
                                        <i className="fa fa-edit"></i>
                                      </button>
                                      <button
                                        className="mr-2 text-danger"
                                        style={{
                                          border: "none",
                                          backgroundColor: "#fff",
                                        }}
                                        onClick={(e) =>
                                          window.confirm(
                                            "Are you sure you wish to delete " +
                                              `${element.name}`
                                          ) && this.deleteChild(element.id)
                                        }
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              );
                            }
                          )
                        : null}
                    </div>
                  ) : null}
                  {/* <div className="form-group">
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
                    </div> */}
                  <Modal
                    center
                    open={this.state.childModal}
                    showCloseIcon={false}
                    onClose={this.onCloseChildModal}
                  >
                    <div className=" max-width-px-840 position-relative">
                      <button
                        onClick={() => this.onCloseChildModal()}
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
                                  Parent Wizard
                                </h3>
                                <p className="mb-0 font-size-4 text-white">
                                  Please add child name
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-7 col-md-6">
                            <div className="bg-white-2 h-100 px-11 pt-11 pb-7">
                              <div className="form-group">
                                <label
                                  htmlFor="email"
                                  className="font-size-4 text-black-2 font-weight-semibold line-height-reset"
                                >
                                  Child name
                                </label>
                                <input
                                  type="name"
                                  className="form-control"
                                  placeholder="M. Ahmad"
                                  id="childname"
                                  required
                                  value={this.state.childname}
                                  onChange={(e) =>
                                    this.setState({
                                      childname: e.target.value,
                                    })
                                  }
                                />
                              </div>
                              <div className="form-group mb-8">
                                <button
                                  className="btn btn-primary btn-medium w-100 rounded-5 text-uppercase"
                                  type="submit"
                                  onClick={this.handleSubmit}
                                >
                                  Submit
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
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
const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentWizardData: (wizard) =>
      dispatch(updateStudentWizardData(wizard)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(parentWizards);
