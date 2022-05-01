import React from "react";
import { BaseUrl } from "../utils/api_routes";
import { connect } from "react-redux";
import "react-responsive-modal/styles.css";
import axios from "axios";
import { api } from "../utils/api_routes";
import { Modal } from "react-responsive-modal";
import SelectSearch from "react-select";
import { ToastContent } from "../components/Toast";
import { toast } from "react-toastify";
class NewAppointmentModal extends React.Component {
  state = {
    studentList: null,
    options: [],
    student_id: null,
    childOptions: [],
    child_id: null,
    display: "none",
    showbtn: false,
  };
  // for search student
  fetchStudentList = (searchname) => {
    // if (searchname.length > 4) {
      axios
        .get(
          api.packagePurchasedStudentList +
            `${this.props.AuthData.id}` +
            "?name=" +
            `${searchname}`
        )
        .then(async (res) => {
          await this.setState({ options: res.data });
          this.setState({ display: "none" });
          this.setState({ showbtn: true });
        })
        .catch((err) => {
          console.error("Error in getting student data", err);
        });
    // }
  };

  // for fetching child list
  fetchChildList = (student) => {
    toast.dismiss();
    toast(() => ToastContent("Please Wait.."), {
      toastId: "infotoast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
    });
    this.setState({ student_id: student.id });
    axios
      .get(api.getParentChildData + `${student.id}`)
      .then(async (res) => {
        toast.dismiss();
        toast(() => ToastContent("Please Select Child"), {
          toastId: "infotoast",
          hideProgressBar: true,
          type: toast.TYPE.INFO,
        });
        this.setState({ display: "inline" });
        await this.setState({ childOptions: res.data });
      })
      .catch((err) => {
        console.error("Error in getting student data", err);
      });
  };

  handleChildList = (child) => {
    this.setState({ child_id: child.value });
    this.setState({ showbtn: true });
  };
  // handle booking
  handleBookAppointment = () => {
    this.props.closeNewAppointmentModal()
    this.setState({ showbtn: false });
    let payload = {
      booked_date: this.props.newAppointmentData.date,
      time_slot: this.props.newAppointmentData.date.toLocaleTimeString(),
      timezone: this.props.AuthData.timezone,
      student_id: this.state.student_id,
      instructor_id: this.props.AuthData.id,
      appointment_status: "booked",
      gateway: "Stripe",
      currency: "GBP",
      price: 0,
      payment_status: "credits",
      created: this.state.created,
      token: "DUMMY_TOKEN_XYZWE_122_UION_SDAS_LKIFGH",
      child_info: this.state.child_id,
    };
    toast.dismiss();
    toast(() => ToastContent("Please Wait.."), {
      toastId: "infotoast",
      hideProgressBar: true,
      type: toast.TYPE.INFO,
    });
    axios
      .post(api.stripeTrailPayment, payload)
      .then((res) => {
        if ((res.data.message = "success")) {
          toast.dismiss();
          toast(
            () => ToastContent("Appointment has been booked successfully"),
            {
              toastId: "successToast",
              hideProgressBar: true,
              type: toast.TYPE.SUCCESS,
              autoClose: 2000,
            }
          );
          window.location.reload(true);
        }
      })
      .catch((err) => {
        console.error(err);
        this.setState({ showbtn: false });
        toast.dismiss();
        toast(
          () => ToastContent("An unknown error acccoured while making payment"),
          {
            toastId: "errToas",
            hideProgressBar: true,
            type: toast.TYPE.ERROR,
            autoClose: 2000,
          }
        );
      });
  };

  render() {
    const { newAppointmentData } = this.props;
    return (
      <div>
        <button
          onClick={() => this.props.closeNewAppointmentModal()}
          type="button"
          className="circle-32 btn-reset  pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
          data-dismiss="modal"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="job-details-content pt-8 pl-sm-9 pl-6 pr-sm-9 pr-6 pb-10 border-bottom border-width-1 border-default-color light-mode-texts">
          <div className="row mb-7 pb-7 border-bottom border-width-1 border-default-color">
            <div className="col-lg-6 col-md-12 mb-md-0 mb-6">
              <span className="font-size-4 d-block mb-4 text-gray">
                <b>Selected Date:</b>{" "}
                {newAppointmentData.date.toLocaleDateString()}
              </span>
            </div>
            <div className="col-lg-6 col-md-4 mb-md-0 mb-6">
              <span className="font-size-4 d-block mb-4 text-gray">
                <b>Selected Time:</b>{" "}
                {newAppointmentData.date.toLocaleTimeString()}
              </span>
            </div>
            <div className="col-12">
              <div className="font-size-4 d-block mb-4 text-gray form-group">
                <label
                  htmlFor="namedash"
                  className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                >
                  Appointment with:
                </label>
                {/* <select
                  className="form-control h-px-48 w-100"
                  name="student_id"
                  required
                >
                  <option value="" disabled>
                    Select a student
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select> */}
                <SelectSearch
                  onInputChange={(val) => this.fetchStudentList(val)}
                  onChange={this.fetchChildList}
                  options={this.state.options}
                  isSearchable={true}
                  placeholder='Please search student name'
                />
              </div>
            </div>
            {this.state.display != "none" ? (
              <div className="col-12">
                <div className="font-size-4 d-block mb-4 text-gray form-group">
                  <label
                    htmlFor="namedash"
                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                  >
                    Choose Child:
                  </label>
                  <SelectSearch
                    onChange={this.handleChildList}
                    options={this.state.childOptions}
                    isSearchable={true}
                  />
                </div>
              </div>
            ) : (
              <></>
            )}
            {this.state.showbtn === true ? (
              <div className="d-flex justify-content-end w-100 mt-4">
                <a
                  className="btn btn-transparent btn-outline-primary text-uppercase font-size-3"
                  onClick={() => this.handleBookAppointment()}
                >
                  Book an Appointment
                </a>
              </div>
            ) : (
              <></>
            )}
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
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};

export default connect(mapStateToProps, null)(NewAppointmentModal);
