import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import ImageUploader from "react-images-upload";
import TimezoneSelect from "react-timezone-select";
import { connect } from "react-redux";
import {
  getStudentProfile,
  UpdateStudentProfile,
} from "../../../Redux/Actions/studentProfileActions";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
import "react-step-progress/dist/index.css";
import { BaseUrl } from "../../../utils/api_routes";
class ProfileForm extends React.Component {
  state = {
    fname: "",
    email: "",
    city_name: "",
    gender: "",
    mobile: "",
    dob: "",
    timezone: "",

    user_img: "",
    user_image_view: "",
  };

  componentDidMount() {
    const { studentProfile } = this.props;

    this.setState({
      fname: studentProfile.fname == null ? "" : studentProfile.fname,
      email: studentProfile.email == null ? "" : studentProfile.email,

      city_name:
        studentProfile.city_name == null ? "" : studentProfile.city_name,
      gender: studentProfile.gender == null ? "" : studentProfile.gender,
      mobile: studentProfile.mobile == null ? "" : studentProfile.mobile,
      dob: studentProfile.dob == null ? "" : studentProfile.dob,
      timezone: studentProfile.timezone == null ? "" : studentProfile.timezone,

      user_img: studentProfile.user_img == null ? "" : studentProfile.user_img,
      user_image_view:
        studentProfile.user_img == null
          ? ""
          : `${BaseUrl}/UserProfile/Images/` + studentProfile.user_img,
    });
  }

  //handle Profil Image
  HandlePicture_upload = async (picture) => {
    await this.setState({
      user_img: picture[0],
    });
    await this.setState({
      user_image_view: URL.createObjectURL(picture[0]),
    });
  };

  //handle submit of form
  handleSubmit = (e) => {
    e.preventDefault();
    const { AuthData } = this.props;
    if (this.state.user_img == "") {
      toast.dismiss();
      toast(() => ToastContent("Please add a profile picture"), {
        toastId: "ErrorToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
      return;
    }
    let params = new FormData();
    params.append("fname", this.state.fname);
    params.append("email", this.state.email);

    params.append("city_name", this.state.city_name);
    params.append("timezone", this.state.timezone);
    params.append("gender", this.state.gender);
    params.append("mobile", this.state.mobile);
    params.append("dob", this.state.dob);

    params.append("user_image", this.state.user_img);

    this.props.UpdateStudentProfile(
      params,
      AuthData.id ? AuthData.id : AuthData.user_id
    );
  };

  render() {
    return (
      <div>
        <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
          <div className="upload-file mb-16 text-center">
            <div id="userActions" className="square-144 m-auto px-6 mb-7">
              <div className="square-144 profile-image-container">
                <img
                  className="fill-img"
                  src={
                    this.state.user_image_view == "" ||
                    this.state.user_image_view == null
                      ? "../image/svg/upload-file.svg"
                      : this.state.user_image_view
                  }
                  onError={(e)=>{e.target.onerror = null; e.target.src="image/l3/png/userAvtar.webp"}}
                ></img>
              </div>
              <ImageUploader
                fileContainerStyle={{
                  backgroundColor: "transparent",
                  boxShadow: "none",
                  height: "20px",
                  alignItems: "center",
                }}
                buttonClassName="btn btn-green w-120"
                buttonStyles={{
                  width: "123%",
                }}
                singleImage={true}
                withPreview={false}
                withIcon={false}
                withLabel={false}
                buttonText="Upload Image"
                onChange={this.HandlePicture_upload}
                imgExtension={[".jpg", ".jpeg", ".gif", ".png", ".gif"]}
                maxFileSize={5242880}
              />
            </div>
          </div>
          <form onSubmit={this.handleSubmit}>
            <fieldset>
              <div className="row mb-xl-1 mb-9">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control h-px-48"
                      id="namedash"
                      placeholder="Jhon"
                      value={this.state.fname}
                      required
                      onChange={(e) => this.setState({ fname: e.target.value })}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control h-px-48"
                      id="namedash"
                      placeholder="example@zyx.com"
                      value={this.state.email}
                      required
                      disabled
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-xl-1 mb-9">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control h-px-48"
                      id="namedash"
                      placeholder="city name"
                      required
                      value={this.state.city_name}
                      onChange={(e) =>
                        this.setState({ city_name: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Gender
                    </label>
                    <select
                      className="form-control h-px-48 w-100"
                      value={this.state.gender}
                      onChange={(e) =>
                        this.setState({ gender: e.target.value })
                      }
                      required
                    >
                      <option vlaue="" disabled>
                        Selet a gender
                      </option>
                      <option vlaue="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="row mb-xl-1 mb-9">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold "
                    >
                      Phone Number
                    </label>
                    <PhoneInput
                      className="regInput"
                      value={this.state.mobile}
                      placeholder="Mobile Number"
                      onChange={(value) => this.setState({ mobile: value })}
                      required
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold"
                    >
                      Time Zone
                    </label>
                    <TimezoneSelect
                      i={"true"}
                      value={this.state.timezone}
                      onChange={(val) => this.setState({ timezone: val.value })}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Dob
                    </label>
                    <input
                      type="date"
                      className="form-control h-px-48"
                      id="namedash"
                      placeholder="date of birth"
                      value={this.state.dob}
                      required
                      onChange={(e) => this.setState({ dob: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="row"></div>
              <div className="row d-flex justify-content-end mr-3">
                <button className="btn btn-green" type="submit">
                  Update Profile
                </button>
              </div>
            </fieldset>
          </form>
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
    getStudentProfile: (user_id) => dispatch(getStudentProfile(user_id)),
    UpdateStudentProfile: (params, user_id) =>
      dispatch(UpdateStudentProfile(params, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
