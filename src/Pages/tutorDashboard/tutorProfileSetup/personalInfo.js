import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import ImageUploader from "react-images-upload";
import TimezoneSelect from "react-timezone-select";
import { connect } from "react-redux";
import { getTutorProfile } from "../../../Redux/Actions/tutorProfileActions";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
import axios from "axios";
import StepProgressBar from "react-step-progress";
import "react-step-progress/dist/index.css";
import { BaseUrl, api } from "../../../utils/api_routes";
import CountiresList from "../../../components/countriesList";
import LanguageList from "../../../components/languageList";
import CoursesList from "../../../components/coursesList";
class PersonalInfo extends React.Component {
  state = {
    fname: "",
    email: "",
    detail: "",
    city_name: "",
    gender: "",
    mobile: "",
    dob: "",
    timezone: "",
    user_img: "",
    per_hr_rate: "",
    user_image_view: "",
    country_id: { country_id: "", nicename: "" },
    languages: [],
    languages_lavels: [],
    course_id: [],
  };
  arrangeLanguages = (languages) => {
    if (languages.length == 0) {
      return [];
    } else {
      let NewLanguages = [];
      for (let i = 0; i < languages.length; i++) {
        NewLanguages.push(languages[i].language);
      }
      return NewLanguages;
    }
  };

  ArrangeLavels = (languages) => {
    if (languages.length == 0) {
      return [];
    } else {
      let NewLanguagesLavels = [];
      for (let i = 0; i < languages.length; i++) {
        NewLanguagesLavels.push({
          id: parseInt(languages[i].language_id),
          level: languages[i].level,
        });
      }
      return NewLanguagesLavels;
    }
  };
  ArrangeCourses = (courses) => {
    if (courses.length == 0) {
      return [];
    } else {
      let Newcourses = [];
      for (let i = 0; i < courses.length; i++) {
        Newcourses.push({
          course_id: parseInt(courses[i].instructor_courses.id),
          title: courses[i].instructor_courses.title,
        });
      }
      return Newcourses;
    }
  };
  componentDidMount() {
    const { tutorProfile } = this.props;

    this.setState({
      fname: tutorProfile.fname == null ? "" : tutorProfile.fname,
      email: tutorProfile.email == null ? "" : tutorProfile.email,
      detail: tutorProfile.detail == null ? "" : tutorProfile.detail,
      city_name: tutorProfile.city_name == null ? "" : tutorProfile.city_name,
      gender: tutorProfile.gender == null ? "" : tutorProfile.gender,
      mobile: tutorProfile.mobile == null ? "" : tutorProfile.mobile,
      dob: tutorProfile.dob == null ? "" : tutorProfile.dob,
      timezone: tutorProfile.timezone == null ? "" : tutorProfile.timezone,
      user_img: tutorProfile.user_img == null ? "" : tutorProfile.user_img,
      per_hr_rate:
        tutorProfile.per_hr_rate == null ? "" : tutorProfile.per_hr_rate,
      user_image_view:
        tutorProfile.user_img == null
          ? ""
          : `${BaseUrl}/UserProfile/Images/` + tutorProfile.user_img,
      country_id: { country_id: tutorProfile.country_id, nicename: "" },
      languages: this.arrangeLanguages(tutorProfile.languages),
      languages_lavels: this.ArrangeLavels(tutorProfile.languages),
      course_id: this.ArrangeCourses(tutorProfile.courses),
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
    if (
      this.state.country_id.country_id == "" ||
      this.state.country_id.country_id == null ||
      this.state.languages.length == 0 ||
      this.state.languages_lavels.length == 0 ||
      this.checkAllLevels() ||
      this.state.course_id.length == 0
    ) {
      toast.dismiss();
      toast(() => ToastContent("Please complete all feilds"), {
        toastId: "ErrorrToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
      return;
    }
    let params = new FormData();
    params.append("fname", this.state.fname);
    params.append("email", this.state.email);
    params.append("detail", this.state.detail);
    params.append("city_name", this.state.city_name);
    params.append("timezone", this.state.timezone);
    params.append("gender", this.state.gender);
    params.append("mobile", this.state.mobile);
    params.append("per_hr_rate", this.state.per_hr_rate);
    params.append("dob", this.state.dob);
    params.append("user_image", this.state.user_img);
    params.append("country_id", this.state.country_id.country_id);
    for (let i = 0; i < this.state.languages.length; i++) {
      params.append(`language[${i}][id]`, this.state.languages[i].id);
      for (let j = 0; j < this.state.languages_lavels.length; j++) {
        if (
          parseInt(this.state.languages[i].id) ==
          parseInt(this.state.languages_lavels[j].id)
        ) {
          params.append(
            `language[${i}][level]`,
            this.state.languages_lavels[j].level
          );
        }
      }
    }
    for (let i = 0; i < this.state.course_id.length; i++) {
      params.append(`course[${i}]`, this.state.course_id[i].course_id);
    }
    //request updation
    toast.dismiss();
    toast(() => ToastContent("Please Wait"), {
      toastId: "infoToast",
      hideProgressBar: true,
      autoClose: false,
      type: toast.TYPE.INFO,
    });

    let Url = api.updateTutorProfile;

    axios
      .post(`${Url}/${AuthData.id ? AuthData.id : AuthData.user_id}`, params)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent("Personal Info successfully updated"), {
          toastId: "SuccessToast",
          hideProgressBar: true,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });

        this.props.getTutorProfile(
          AuthData.id ? AuthData.id : AuthData.user_id
        );
        this.props.nextStep(1);
      })
      .catch((err) => {
        toast.dismiss();

        toast(
          () =>
            ToastContent(
              "Unable to update your profile some error has accoured"
            ),
          {
            toastId: "ErrorToast",
            hideProgressBar: true,
            autoClose: true,
            type: toast.TYPE.ERROR,
          }
        );
      });
  };

  //remove selected language
  removeSeletedLanguage = async (lang) => {
    var PreviousLanguages = this.state.languages;
    var PreviousLanguages_lavels = this.state.languages_lavels;
    let newLanguages = [];
    let newLavels = [];
    for (let i = 0; i < PreviousLanguages.length; i++) {
      if (PreviousLanguages[i].id !== lang.id) {
        newLanguages.push(PreviousLanguages[i]);
      }
    }
    for (let i = 0; i < PreviousLanguages_lavels.length; i++) {
      if (PreviousLanguages_lavels[i].id !== lang.id) {
        newLavels.push(PreviousLanguages_lavels[i]);
      }
    }
    await this.setState({ languages: [] });
    await this.setState({ languages_lavels: [] });

    await this.setState({ languages: newLanguages });
    await this.setState({ languages_lavels: newLavels });
  };

  //handle remove of selected courses
  removeSeletedCourse = async (course) => {
    var Previouscourses = this.state.course_id;

    let newcourses = [];

    for (let i = 0; i < Previouscourses.length; i++) {
      if (
        parseInt(Previouscourses[i].course_id) !== parseInt(course.course_id)
      ) {
        newcourses.push(Previouscourses[i]);
      }
    }
    await this.setState({ course_id: [] });
    await this.setState({ course_id: newcourses });
  };
  // Handle Language and country selection
  handleCountry_or_language_select = async (objName, value, languageLevel) => {
    if (objName == "language_id") {
      var Newlanguages = this.state.languages;
      var newlavels = this.state.languages_lavels;
      newlavels.push({ id: value.id, level: languageLevel });
      Newlanguages.push(value);
      await this.setState({ languages: [] });
      await this.setState({ languages: Newlanguages });
      await this.setState({ languages_lavels: [] });
      await this.setState({ languages_lavels: newlavels });
    }
    if (objName == "course_id") {
      var Newcourses = this.state.course_id;

      Newcourses.push(value);
      await this.setState({ course_id: [] });
      await this.setState({ course_id: Newcourses });
    } else {
      this.setState({ [objName]: value });
    }
  };

  checkAllLevels = () => {
    for (let j = 0; j < this.state.languages_lavels.length; j++) {
      if (this.state.languages_lavels[j].level == "") {
        return true;
      }
    }
    return false;
  };

  render() {
    return (
      <div>
        <StepProgressBar
          startingStep={0}
          buttonWrapperClass="hide_everything"
          steps={[
            {
              label: "Info",
              name: "step 1",
            },
            {
              label: "Packages",
              name: "step 2",
            },
            {
              label: "Availability",
              name: "step 3",
            },
          ]}
        />

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
                      disabled
                      required
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
                  <label
                    htmlFor="namedash"
                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                  >
                    Country
                  </label>
                  <div className="form-group conutry_langugae_select">
                    <CountiresList
                      handleCountry_or_language_select={
                        this.handleCountry_or_language_select
                      }
                      country_id={this.state.country_id}
                      tutorSignup={true}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <label
                    htmlFor="namedash"
                    className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                  >
                    Language
                  </label>
                  <div className="form-group conutry_langugae_select">
                    <LanguageList
                      handleCountry_or_language_select={
                        this.handleCountry_or_language_select
                      }
                      removeSeletedLanguage={this.removeSeletedLanguage}
                      languages={this.state.languages}
                      tutorSignup={true}
                      languages_lavels={this.state.languages_lavels}
                    />
                  </div>
                </div>
              </div>
              <div className="row mb-8">
                <div className="row col-lg-6 no-gutters">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label
                        htmlFor="namedash"
                        className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                      >
                        Price per hour
                      </label>
                      <input
                        type="number"
                        className="form-control h-px-48"
                        id="price"
                        min="1"
                        placeholder="Price per Hour"
                        value={this.state.per_hr_rate}
                        required
                        onChange={(e) =>
                          this.setState({ per_hr_rate: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Courses to teach
                    </label>
                    <div className="form-group conutry_langugae_select">
                      <CoursesList
                        handleCountry_or_language_select={
                          this.handleCountry_or_language_select
                        }
                        removeSeletedCourse={this.removeSeletedCourse}
                        course_id={this.state.course_id}
                        tutorSignup={true}
                      />
                    </div>
                  </div>
                  <div className="col-12">
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
                        onChange={(val) =>
                          this.setState({ timezone: val.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
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
                <div className=" col-lg-6 no-gutters">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label
                        htmlFor="aboutTextarea"
                        className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                      >
                        About
                      </label>
                      <textarea
                        name="textarea"
                        id="aboutTextarea"
                        cols="30"
                        rows="15"
                        className="border border-mercury text-gray w-100 pt-4 pl-6"
                        placeholder="Describe about your self"
                        value={this.state.detail}
                        required
                        onChange={(e) =>
                          this.setState({ detail: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row"></div>
              <div className="row d-flex justify-content-end mr-3">
                <button className="btn btn-green" type="submit">
                  Next
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
    getTutorProfile: (user_id) => dispatch(getTutorProfile(user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
