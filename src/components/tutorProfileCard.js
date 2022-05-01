import React from "react";
import { BaseUrl } from "../utils/api_routes";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Login from "../Pages/auth/login";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";
import { connect } from "react-redux";
import { localRoutes } from "../utils/local_routes";
import ReactPlayer from "react-player";
import "../cssmodule/chatStyles.css";

class TutorProfileCard extends React.Component {
  state = {
    loginModal: false,
    showCountry: false,
    countryName: "",
  };

  getCountryShortName = () => {
    let { CountiresList, tutorDetail } = this.props;
    let shortName = "";
    return tutorDetail?.country?.iso;
  };

  getCountryFullName = () => {
    let { CountiresList, tutorDetail } = this.props;
    let shortName = "";
    CountiresList.map((country) => {
      if (country.country_id == tutorDetail.country_id) {
        shortName = country.nicename;
      }
    });
    return shortName;
  };

  ShowCountry = () => {
    this.setState({ showCountry: true });
  };
  HideCountry = () => {
    this.setState({ showCountry: false });
  };

  opneLoginModal = () => {
    this.setState({ signupModal: false });
    this.setState({ loginModal: true });
  };

  onCloseLoginModal = () => {
    this.setState({ loginModal: false });
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

  //send message to the User
  SendMessage = () => {
    const { AuthData, tutorDetail } = this.props;
    const channel_id =
      tutorDetail.id.toString() + "_" + AuthData.id
        ? AuthData.id
        : AuthData.user_id.toString();

    window.location.replace(
      localRoutes.student_dashboard_messages +
        "?" +
        new Buffer(
          "uniqueName=" +
            channel_id +
            "&friendlyName=" +
            tutorDetail.fname +
            "_and_" +
            AuthData.fname +
            "&query=true"
        ).toString("base64")
    );
  };

  render() {
    const { tutorDetail, AuthData, currency, curency_rate } = this.props;

    const tutor_dash_circle = {
      maxWidth: "160px",
      minWidth: "160px",
      maxHeight: "180px",
      minHeight: "180px",
      borderRadius: "10px",
    };

    return (
      <>
        {/* <!-- Top Start --> */}
        <div className="bg-white rounded-left-10 rounded-right-10 rounded">
          {/* {tutorDetail.video_url != "" && tutorDetail.video_url != null ? (
            <div className="w-100">
              <div className="player-wrapper" style={{}}>
                <ReactPlayer
                  className="react-player"
                  url={tutorDetail.video_url}
                  // width='100%'
                  // height='100%'
                />
              </div>
            </div>
          ) : null} */}
          <div className="px-5 pt-11 pb-8 text-center  border-mercury">
            <a className="mb-4" href="#">
              <img
                className="circle-100 image-cover-fit"
                src={
                  tutorDetail.user_img == null
                    ? `image/l3/png/userAvtar.webp`
                    : `${BaseUrl}/UserProfile/Images/${tutorDetail.user_img}`
                }
                alt=""
                style={tutor_dash_circle}
              />
            </a>
            <h4 className="mb-0">
              <a
                className="text-black-2 font-size-6 font-weight-semibold"
                href="#"
              >
                {tutorDetail.fname}
              </a>
            </h4>
            {parseInt(tutorDetail.instructor_profile_reviews_count) < 5 ? 
              <span className="text-black-2 mb-0">
                <span class="badge badge-info">Newly Joined</span>
              </span>
              : null
            }
          </div>
          {/* <!-- Top End --> */}
          <div className="text-center pb-6 border-mercury">
            <div className="row pl-2 pr-2">
              {/* country */}
              <div className="col-4 col-xxl-4 col-lg-4 col-md-4">
                <div className="text-center">
                  <p className="mb-0 font-size-4 text-green">
                    <img
                      alt={
                        this.getCountryShortName() == ""
                          ? "GB"
                          : this.getCountryShortName()
                      }
                      src={`../image/flags/${
                        this.getCountryShortName() == ""
                          ? "gb"
                          : this.getCountryShortName().toString().toLowerCase()
                      }.png`}
                      width="20px"
                      height="100%"
                      className="mr-2 ml-2"
                      onMouseOver={() => this.ShowCountry()}
                      onMouseLeave={() => this.HideCountry()}
                    />
                    <p className="mb-0 font-size-3 text-capitalize">
                      {tutorDetail.country.name.toLowerCase()}
                    </p>
                  </p>
                </div>
              </div>
              {/* verified */}
              <div className="col-4 col-xxl-4 col-lg-4 col-md-4">
                <div className="text-center">
                  <p className="mb-0 font-size-4 text-green">
                    <img class="mr-2" src="../image/l3/png/verified.ico" />
                    <p className="mb-0 font-size-3 text-capitalize">verified</p>
                  </p>
                </div>
              </div>
              {/* Reviews */}
              <div className="col-4 col-xxl-4 col-lg-4 col-md-4">
                <div className="text-center">
                  <p className="mb-0 font-size-4 ">
                    <i className="fa fa-star text-yellow"></i>{" "}
                    {tutorDetail.instructor_avg_rating?.length == 0
                      ? 0
                      : parseInt(
                          tutorDetail?.instructor_avg_rating[0]?.avg_reviews
                        )}{" "}
                  </p>
                  <p className="mb-0 font-size-3 text-capitalize">
                    {/* {tutorDetail.instructor_profile_reviews.length}  */}
                    reviews
                  </p>
                </div>
              </div>
              {/* Checked */}
              <div className="col-4 col-xxl-4 col-lg-4 col-md-4">
                <div className="text-center">
                  <p className="mb-0 font-size-4 text-green">
                    <i className="fa fa-check-circle"></i>
                    <p className="mb-0 font-size-3">Checked</p>
                  </p>
                </div>
              </div>
              {/* Per hour */}
              <div className="col-4 col-xxl-4 col-lg-4 col-md-4">
                <div className="text-center">
                  <p className="mb-0 font-size-4 text-green">
                    {tutorDetail.per_hr_rate !== ""
                      ? currency == "GBP"
                        ? "£ " + tutorDetail.per_hr_rate
                        : "$ " +
                          parseInt(
                            curency_rate * parseInt(tutorDetail.per_hr_rate)
                          )
                      : ""}
                  </p>
                  <p className="mb-0 font-size-3 text-capitalize">per hour</p>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- Bottom Start --> */}
          {/* <div className="px-9 pt-lg-5 pt-9 pt-xl-9 pb-5">
            <a className="btn btn-primary font-size-3 w-100 mb-4">
              Book Trial Lesson
            </a>

            {AuthData !== null ? (
              AuthData.role !== "student" ? (
                <a
                  className="btn btn-outline btn-outline-primary text-uppercase font-size-3 mb-4 w-100"
                  onClick={() =>
                    this.showMessage(
                      "You cant send message to a tutor please login with student account",
                      toast.TYPE.ERROR
                    )
                  }
                >
                  Send Message
                </a>
              ) : (
                <a
                  onClick={() => this.SendMessage()}
                  className="btn btn-outline btn-outline-primary text-uppercase font-size-3 mb-4 w-100"
                >
                  Send Message
                </a>
              )
            ) : (
              <a
                className="btn btn-outline btn-outline-primary text-uppercase font-size-3 mb-4 w-100"
                onClick={() => this.opneLoginModal()}
              >
                Send Message
              </a>
            )} */}
          {/* <h5 className="text-black-2 mb-8 font-size-5">Contact Info</h5>
            
            <div className="mb-7">
              <p className="font-size-4 mb-0">Location</p>
              <h5 className="font-size-4 font-weight-semibold mb-0 text-black-2 text-break">
                {tutorDetail.city_name}
              </h5>
            </div>
            
            <div className="mb-7">
              <p className="font-size-4 mb-0">Time Zone</p>
              <h5 className="font-size-4 font-weight-semibold mb-0">
                <a className="text-black-2 text-break">
                  {tutorDetail.timezone}
                </a>
              </h5>
            </div>
            
            <p className="font-size-4 mb-0">Phone</p>
            <h5 className="font-size-4 font-weight-semibold mb-0">
              <a
                className="text-black-2 text-break"
                href={`tel:${tutorDetail.mobile}`}
              >
                {tutorDetail.mobile}
              </a>
            </h5> */}
          {/* </div> */}
          {/* <!-- Single List --> */}
        </div>
        {/* <!-- Bottom End --> */}
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
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    tutorCountiresList: state.tutorList.tutorCountiresList,
  };
};

export default connect(mapStateToProps, null)(TutorProfileCard);
