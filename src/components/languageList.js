import React, { Component } from "react";
import { connect } from "react-redux";
import { getTutorList } from "../Redux/Actions/tutorListActions";
import { ToastContent } from "./Toast";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
class LanguageList extends Component {
  state = {
    languagesLavel: [
      "Advanced ",
      "Upper intermediate ",
      "Intermediate ",
      "Basic",
      "Native",
      "Proficient",
    ],
    selectedLavel: null,
    selectedLanguage: null,
    languageModal: false,
  };

  handleModal = () => {
    this.setState({ languageModal: !this.state.languageModal });
  };

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
          if (languages[i].id === this.state.selectedLanguage.id) {
            toast.dismiss();
            toast(() => ToastContent("This language is already added"), {
              toastId: "ErrorToast",
              hideProgressBar: true,
              autoClose: true,
              type: toast.TYPE.ERROR,
            });
            return;
          }
        }
      }
    }
    if (
      this.state.selectedLavel == null ||
      this.state.selectedLanguage == null
    ) {
      toast.dismiss();
      toast(() => ToastContent("Please Select a language level"), {
        toastId: "ErrorToast",
        hideProgressBar: true,
        autoClose: true,
        type: toast.TYPE.ERROR,
      });
      return;
    }
    handleCountry_or_language_select(
      "language_id",
      this.state.selectedLanguage,
      this.state.selectedLavel
    );
  };

  async componentDidMount() {
    this.props.getTutorList(0, "", "", "", "", "");
  }
  checkForLanguage = (Selectedlanguage) => {
    const { languages } = this.props;
    if (languages.length == 0) {
      return false;
    } else {
      let check = false;
      for (let i = 0; i < languages.length; i++) {
        if (languages[i].id == Selectedlanguage.id) {
          check = true;
        }
      }
      return check;
    }
  };

  languageLavel = () => {
    const {
      language_id,
      tutorListLoader,
      tutorLanguages,
      languages,
      tutorSignup,
    } = this.props;
    return (
      <div className="position-relative w-100 form-group conutry_langugae_select">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none" }}
        >
          <a
            className="nav-link dropdown-toggle gr-toggle-arrow countrySecectorHeader"
            id="navbarDropdown"
            href="#features"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.selectedLavel == null
              ? "Level"
              : this.state.selectedLavel}
          </a>
          <ul
            className="gr-menu-dropdown dropdown-menu country-selector "
            style={{ maxHeight: tutorSignup ? "" : "9rem" }}
            aria-labelledby="navbarDropdown"
          >
            {this.state.languagesLavel.map((level, index) => {
              return (
                <li
                  key={index}
                  className={`drop-menu-item  ${
                    tutorSignup
                      ? level == this.state.selectedLavel
                        ? "selectedLanguage"
                        : ""
                      : ""
                  }`}
                  onClick={() => this.setState({ selectedLavel: level })}
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

  languageSelector = () => {
    const {
      language_id,
      tutorListLoader,
      tutorLanguages,
      languages,
      tutorSignup,
    } = this.props;
    return (
      <div className="position-relative w-100 form-group conutry_langugae_select">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none" }}
        >
          <a
            className="nav-link dropdown-toggle gr-toggle-arrow countrySecectorHeader"
            id="navbarDropdown"
            href="#features"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            {this.state.selectedLanguage == null
              ? "Language"
              : this.state.selectedLanguage.name}
          </a>
          <ul
            className="gr-menu-dropdown dropdown-menu country-selector "
            style={{ maxHeight: tutorSignup ? "" : "9rem" }}
            aria-labelledby="navbarDropdown"
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
                    onClick={() =>
                      this.setState({ selectedLanguage: language })
                    }
                    className={`drop-menu-item  ${
                      tutorSignup
                        ? this.state.selectedLanguage !== null
                          ? language.id == this.state.selectedLanguage?.id
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
  render() {
    const {
      language_id,
      tutorListLoader,
      tutorLanguages,
      languages,
      tutorSignup,
    } = this.props;
    return (
      <div className="position-relative w-100 ">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none" }}
        >
          <a
            className="nav-link dropdown-toggle gr-toggle-arrow countrySecectorHeader"
            onClick={() => this.handleModal()}
          >
            {tutorSignup
              ? languages.length == 0
                ? "Language"
                : languages?.length + " Selected"
              : language_id?.id == ""
              ? "Language"
              : language_id?.name}
          </a>
        </li>
        {true ? null : (
          <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
            <i className="fa fa-language text-primary font-weight-bold"></i>
          </span>
        )}

        <Modal
          center
          open={this.state.languageModal}
          showCloseIcon={false}
          onClose={this.handleModal}
        >
          <div
            className="Main-selector wizard-width p-md-10 p-2"
            style={{ display: "block" }}
          >
            <button
              onClick={() => this.handleModal()}
              type="button"
              className="circle-32 btn-reset bg-white pos-abs-tr mt-1 mr-3  focus-reset z-index-supper"
              data-dismiss="modal"
            >
              <i className="fas fa-times"></i>
            </button>
            <div className="d-flex justify-content-center">
              <p className="text-align-center">Please add languages</p>
            </div>
            <div className="d-flex flex-column">
              <div className="row p-0 m-0">
                {tutorSignup
                  ? languages.length == 0
                    ? "no language selected"
                    : languages.map((lang, index) => {
                        return (
                          <div className=" p-0 m-0" key={lang.id}>
                            <span
                              className={`badge pt-1 pb-1 pl-3 pr-3  ml-4
                                     badge-primary
                                    `}
                              style={{
                                borderTopRightRadius: "0",
                                borderBottomRightRadius: "0",
                              }}
                            >
                              {lang?.name}
                            </span>
                            <span
                              className={`badge pt-1 pb-1 pl-3 pr-3 
                                     badge-info
                                    `}
                              style={{
                                borderRadius: "0",
                              }}
                            >
                              {this.props.languages_lavels.length > 0
                                ? this.props.languages_lavels.map(
                                    (level, index) => {
                                      if (level.id == lang.id) {
                                        let MYlevel;
                                        level.level == ""
                                          ? (MYlevel = "none")
                                          : (MYlevel = level.level);
                                        return MYlevel;
                                      }
                                    }
                                  )
                                : "none"}
                            </span>
                            <span
                              className={`badge pt-1 pb-1 pl-2 pr-2 
                                     badge-danger
                                    `}
                              style={{
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                this.props.removeSeletedLanguage(lang)
                              }
                            >
                              X
                            </span>
                          </div>
                        );
                      })
                  : null}
              </div>
              <div className="w-100 mt-10 row p-0">
                <div className="col-md-6 col-lg-6 col-sm-12">
                  {this.languageSelector()}
                </div>
                <div className="col-lg-6 col-md-6 col-sm-12">
                  {this.languageLavel()}
                </div>
                <div className="col-12 d-flex justify-content-center mt-10">
                  <a
                    className=" btn-primary btn rounded-5 "
                    onClick={() => this.selectLanguage()}
                  >
                    Add +
                  </a>
                  <a
                    className=" btn-secondary btn rounded-5 ml-3"
                    onClick={() => this.handleModal()}
                  >
                    Done
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tutorListError: state.tutorList.tutorListError,
    tutorListLoader: state.tutorList.tutorListLoader,
    tutorLanguages: state.tutorList.tutorLanguages,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorList: (pageNumber, country_id, language_id, name, level, course) =>
      dispatch(
        getTutorList(pageNumber, country_id, language_id, name, level, course)
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(LanguageList);
