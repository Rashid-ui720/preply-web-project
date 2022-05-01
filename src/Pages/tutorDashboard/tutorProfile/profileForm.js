import React from "react";
import ReactDOM from "react-dom";
import "react-phone-number-input/style.css";
import PhoneInput, {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import ImageUploader from "react-images-upload";
import TimezoneSelect from "react-timezone-select";
import { connect } from "react-redux";
import {
  getTutorProfile,
  UpdateTutorProfile,
} from "../../../Redux/Actions/tutorProfileActions";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";
import "react-step-progress/dist/index.css";
import { BaseUrl } from "../../../utils/api_routes";
import CountiresList from "../../../components/countriesList";
import LanguageList from "../../../components/languageList";
import CoursesList from "../../../components/coursesList";
import $ from "jquery";
let optionRowId = 0;
let languagesArray = [];
let levelsArray = [];
class ProfileForm extends React.Component {
  state = {
    fname: "",
    email: "",
    detail: "",
    city_name: "",
    gender: "",
    mobile: "",
    dob: "",
    timezone: "",
    per_hr_rate: "",
    user_img: "",
    user_image_view: "",
    country_id: { country_id: "", nicename: "" },
    languages: [],
    languages_lavels: [],
    course_id: [],
    languagesLavel: [
      "Advanced ",
      "Upper intermediate ",
      "Intermediate ",
      "Basic",
      "Native",
      "Proficient",
    ],
    selectedLavel: null,
    selectedLanguage: [],
    selectedLevel: [],
    languageModal: false,
    showlangandlvl: false,
    optionData: [],
    submitted: false,
    optionRowId: 0,
    video_url: ''
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
  ArrangeLavels = (languages, onlylevel = 0) => {
    if (languages.length === 0) {
      return [];
    } else {
      let NewLanguagesLavels = [];
      for (let i = 0; i < languages.length; i++) {
        if (onlylevel === 1) {
          NewLanguagesLavels.push(languages[i].level);
        } else {
          // NewLanguagesLavels.push({
          //   id: parseInt(languages[i].language_id),
          //   level: languages[i].level,
          // });
          NewLanguagesLavels.push(languages[i].level);
        }
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
      per_hr_rate:
        tutorProfile.per_hr_rate == null ? "" : tutorProfile.per_hr_rate,
      video_url: tutorProfile.video_url == null ? "" : tutorProfile.video_url,  
      user_img: tutorProfile.user_img == null ? "" : tutorProfile.user_img,
      user_image_view:
        tutorProfile.user_img == null
          ? ""
          : `${BaseUrl}/UserProfile/Images/` + tutorProfile.user_img,
      country_id: { country_id: tutorProfile.country_id, nicename: "" },
      languages: this.arrangeLanguages(tutorProfile.languages),
      languages_lavels: this.ArrangeLavels(tutorProfile.languages),
      course_id: this.ArrangeCourses(tutorProfile.courses),
      optionData: tutorProfile.languages,
      selectedLanguage: this.arrangeLanguages(tutorProfile.languages),
      selectedLevel: this.ArrangeLavels(tutorProfile.languages, 1),
    });
  }

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
      await this.setState({ languages: [] });
      await this.setState({ languages: this.state.selectedLanguage });
    }

    if (objName === "level_id") {
      await this.setState({ languages_lavels: [] });
      await this.setState({ languages_lavels: this.state.selectedLevel });
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

  //handle Profil Image
  HandlePicture_upload = async (picture) => {
    await this.setState({
      user_img: picture[0],
    });
    await this.setState({
      user_image_view: URL.createObjectURL(picture[0]),
    });
  };

  checkAllLevels = () => {
    for (let j = 0; j < this.state.languages_lavels.length; j++) {
      if (this.state.languages_lavels[j] == "") {
        return true;
      }
    }
    return false;
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
    params.append("dob", this.state.dob);
    params.append("per_hr_rate", this.state.per_hr_rate);

    params.append("user_image", this.state.user_img);
    params.append("country_id", this.state.country_id.country_id);
    params.append("video_url", this.state.video_url);
    if (
      this.state.selectedLanguage.length !== this.state.selectedLevel.length
    ) {
      alert("Please Select valid value for language or level...");
    }

    for (let i = 0; i < this.state.languages.length; i++) {
      if (
        this.state.languages[i] != "empty" &&
        this.state.languages[i] != undefined
      ) {
        params.append(`language[${i}][id]`, this.state.languages[i].id);
        for (let j = 0; j < this.state.languages_lavels.length; j++) {
          if (i === j) {
            params.append(
              `language[${i}][level]`,
              this.state.languages_lavels[j]
            );
          }
        }
      }
    }
    for (let i = 0; i < this.state.course_id.length; i++) {
      params.append(`course[${i}]`, this.state.course_id[i].course_id);
    }
    this.props.UpdateTutorProfile(
      params,
      AuthData.id ? AuthData.id : AuthData.user_id
    );
  };

  // select language list
  selectLanguage = () => {
    const {
      handleCountry_or_language_select,
      tutorSignup,
      languages,
      removeSeletedLanguage,
    } = this.props;
    if (tutorSignup) {
      if (languages.length > 0) {
        for (let i = 0; i < languages.length; i++) {
          this.state.selectedLanguage.map((row) => {
            if (languages[i].id === row.id) {
              toast.dismiss();
              toast(() => ToastContent("This language is already added"), {
                toastId: "ErrorToast",
                hideProgressBar: true,
                autoClose: true,
                type: toast.TYPE.ERROR,
              });
              return;
            }
          });
        }
      }
    }

    this.handleCountry_or_language_select(
      "language_id",
      this.state.selectedLanguage,
      // this.state.selectedLavel
      this.state.selectedLevel
    );
  };

  setSelectLevel = () => {
    this.handleCountry_or_language_select(
      "level_id",
      "",
      this.state.selectedLevel
    );
  };

  languageLavel = (rowid) => {
    const {
      language_id,
      tutorListLoader,
      tutorLanguages,
      languages,
      tutorSignup,
    } = this.props;
    return (
      <div className="position-relative form-group conutry_langugae_select mb-1">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none", zIndex: "unset" }}
        >
          <a
            className="nav-link dropdown-toggle gr-toggle-arrow countrySecectorHeader"
            id={"navbarDropdown_level_" + rowid}
            href="#features"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            style={{
              whiteSpace: "normal",
              overflowWrap: "break-word",
            }}
          >
            {this.state.selectedLevel[rowid] == undefined
              ? "Level"
              : this.state.selectedLevel[rowid]}
          </a>
          <ul
            className="gr-menu-dropdown dropdown-menu country-selector list "
            style={{
              maxHeight: tutorSignup ? "" : "9rem",
              zIndex: "99",
            }}
            aria-labelledby={"navbarDropdown_level_" + rowid}
          >
            {this.state.languagesLavel.map((level, index) => {
              return (
                <li
                  key={index}
                  className={`drop-menu-item  ${
                    tutorSignup
                      ? this.state.selectedLevel.length !== 0
                        ? level === this.state.selectedLevel[rowid]
                          ? "selectedLanguage"
                          : ""
                        : ""
                      : ""
                  }`}
                  onClick={() => {
                    this.state.selectedLevel[rowid] = level;
                    this.setState({
                      selectedLevel: this.state.selectedLevel,
                    });
                    this.setSelectLevel();
                  }}
                >
                  <a>{level}</a>
                </li>
              );
            })}
          </ul>
        </li>
        {true ? null : (
          <span className="h-100 w-px-50 ml-auto pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
            <i className="fa fa-language text-primary font-weight-bold"></i>
          </span>
        )}
      </div>
    );
  };

  languageSelector = (rowid) => {
    const {
      language_id,
      tutorListLoader,
      tutorLanguages,
      languages,
      tutorSignup,
    } = this.props;
    return (
      <div className="position-relative w-100 form-group conutry_langugae_select mb-1">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none", zIndex: "unset" }}
        >
          <a
            className="nav-link dropdown-toggle gr-toggle-arrow countrySecectorHeader"
            id={"navbarDropdown_" + rowid}
            href="#features"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.selectedLanguage?.[rowid] === undefined
              ? "Language"
              : this.state.selectedLanguage[rowid].name}

            {/* {this.state.selectedLanguage.length <= rowid
              ? "Language"
              : this.state.selectedLanguage?.[rowid]?.name ? this.state.selectedLanguage[rowid].name != null ? this.state.selectedLanguage[rowid].name : "Language" 
            } */}
          </a>
          <ul
            className="gr-menu-dropdown dropdown-menu country-selector "
            style={{ maxHeight: tutorSignup ? "" : "9rem", zIndex: "99" }}
            aria-labelledby={"navbarDropdown_" + rowid}
          >
            {tutorListLoader ? (
              <li className="drop-menu-item ">
                <a>Loading...</a>
              </li>
            ) : (
              tutorLanguages.map((language, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      this.setState({ submitted: false });
                      this.selectLanguage();
                      this.state.selectedLanguage[rowid] = language;
                      this.setState({
                        selectedLanguage: this.state.selectedLanguage,
                      });
                    }}
                    className={`drop-menu-item  ${
                      tutorSignup
                        ? this.state.selectedLanguage.length !== 0
                          ? language.id ==
                            this.state.selectedLanguage[rowid]?.id
                            ? "selectedLanguage"
                            : ""
                          : ""
                        : ""
                    }`}
                  >
                    <a>{language.name}</a>
                  </li>
                );
              })
            )}
          </ul>
        </li>
        {true ? null : (
          <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
            <i className="fa fa-language text-primary font-weight-bold"></i>
          </span>
        )}
      </div>
    );
  };

  showLanguageandLevel = (del = 0, rowid = 0) => {
    return (
      <div className="row" id={"option_" + rowid}>
        <div className="form-group mr-0 col-6 pr-0 mb-0">
          {this.languageSelector(rowid)}
        </div>

        <div className="form-group {del > 0 ? col-5 : col-6} ml-0 pl-1 mb-0">
          {this.languageLavel(rowid)}
        </div>
        {del > 0 ? (
          <span onClick={() => this.delOption(rowid)} className="mt-5">
            <i className="fa fa-trash"></i>
          </span>
        ) : null}
      </div>
    );
  };

  delOption = async (rowid) => {
    if (document.getElementById("option_" + rowid)) {
      document.getElementById("option_" + rowid).remove();
      let newselectlanguage = this.state.selectedLanguage;
      newselectlanguage.splice(rowid, 1, undefined);
      let newselectlevel = this.state.selectedLevel;
      newselectlevel.splice(rowid, 1, undefined);
      let newoptiondata = this.state.optionData;
      newoptiondata.splice(rowid, 1, undefined);
      // this.setState({optionData : newoptiondata , selectedLevel: newselectlevel , selectedLanguage: newselectlanguage})
    }
  };

  addLangOption = (istrue) => {
    let html = "";
    if (istrue) {
      this.setState({ submitted: true });
      this.state.optionData.push(this.state.optionData.length + 1);
      optionRowId++;
    }
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
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "image/l3/png/userAvtar.webp";
                  }}
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
                  <div className="form-group">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Price per hour
                    </label>
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"
                          id="basic-addon1"
                          style={{ lineHeight: "initial" }}
                        >
                          £
                        </span>
                      </div>
                      <input
                        type="number"
                        className="form-control h-px-48"
                        id="price"
                        min="1"
                        step="0.1"
                        placeholder="Price per Hour"
                        value={this.state.per_hr_rate}
                        required
                        onChange={(e) =>
                          this.setState({ per_hr_rate: e.target.value })
                        }
                      />
                    </div>
                    {/* <div class="input-group-prepend">
                        
                      </div> */}
                  </div>
                </div>
              </div>
              <div className="row mb-8">
                <div className="row col-lg-6 no-gutters">
                  <div className="col-lg-12">
                    <label
                      htmlFor="namedash"
                      className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                    >
                      Language
                    </label>
                    {/* {this.showLanguageandLevel()} */}
                    {this.state.optionData.length > 0
                      ? this.state.optionData.map((res, index) => {
                          return (
                            <div key={index}>
                              {this.showLanguageandLevel(index, index)}
                            </div>
                          );
                        })
                      : null}
                    <div id="child_append"></div>
                    <span className="mb-5">
                      <a onClick={() => this.addLangOption(true)}>
                        <b>Add Another Language</b>
                      </a>
                    </span>
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
                        htmlFor="namedash"
                        className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                      >
                        Profile video url
                      </label>
                      <div class="input-group mb-3">
                        <input
                          type="text"
                          className="form-control h-px-48"
                          id="url"
                          placeholder="Video url"
                          value={this.state.video_url}
                          required
                          onChange={(e) =>
                            this.setState({ video_url: e.target.value })
                          }
                        />
                      </div>
                      <small>Vimeo or youtube url accepted</small>
                      {/* <div class="input-group-prepend">
                      
                    </div> */}
                    </div>
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
    tutorLanguages: state.tutorList.tutorLanguages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorProfile: (user_id) => dispatch(getTutorProfile(user_id)),
    UpdateTutorProfile: (params, user_id) =>
      dispatch(UpdateTutorProfile(params, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
