import React, { Component } from "react";

class TutorSearchBar extends Component {
  state = {
    languagesLavel: [
      "Advanced ",
      "Upper intermediate ",
      "Intermediate ",
      "Basic",
      "Native",
      "Proficient",
    ],
  };

  selectCountry = (country) => {
    const { handleSearchFilter } = this.props;

    handleSearchFilter("country_id", country);
  };
  selectCourse = (course) => {
    const { handleSearchFilter } = this.props;
    handleSearchFilter("course_id", {
      course_id: course.id,
      title: course.title,
    });
  };
  selectLngugge = (language) => {
    const { handleSearchFilter } = this.props;
    handleSearchFilter("language_id", language);
  };

  selectLevel = (level) => {
    const { handleSearchFilter } = this.props;
    handleSearchFilter("language_level", level);
  };
  render() {
    const {
      handleSearchFilter,
      fname,
      country_id,
      SubmitFilter,
      tutorCountiresList,
      tutorLanguages,
      language_id,
      tutorCourses,
      course_id,
    } = this.props;
    return (
      <div className="w-100 pt-4  bp-10">
        <div className="d-flex align-items-center flex-column mb-5">
          <h4 className="text-uppercase">Find tutors</h4>
          <p className="font-size-3">
            Reach your personal learning goals faster with expert Quran teachers
            from around the World.
          </p>
        </div>

        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <div className="filter-search-form-2 search-1-adjustment bg-white rounded-sm shadow-7 pr-6 py-6 pl-6">
            <div className="filter-inputs w-100">
              {/* I wanted to learn */}
              <div className="form-group position-relative w-lg-25 w-xl-25 w-xxl-25 mb-6 mb-lg-0 ">
                <li
                  className="nav-item dropdown  pl-10"
                  style={{ listStyle: "none" }}
                >
                  {" "}
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ maxWidth: "95%" }}
                    id="navbarDropdown"
                    href="#features"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <a
                      className="nav-link dropdown-toggle gr-toggle-arrow filter-toogle countrySecectorHeader"
                      id="navbarDropdown"
                      href="#features"
                      role="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ overflow: "hidden", maxWidth: "90%" }}
                    >
                      {course_id.course_id == ""
                        ? "I wanted to learn"
                        : course_id.title}
                    </a>
                    <span>
                      <i
                        className="fa fa-caret-down font-size-3 text-primary"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <ul
                    className="gr-menu-dropdown dropdown-menu country-selector"
                    aria-labelledby="navbarDropdown"
                  >
                    {tutorCourses.map((course, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => this.selectCourse(course)}
                          className="drop-menu-item "
                        >
                          <a>{course.title}</a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                  <i className="fa fa-book text-primary font-weight-bold"></i>
                </span>
              </div>
              {/* I wanted to learn end */}
              {/* <!-- .select-city starts --> */}
              <div className="form-group position-relative w-lg-25 w-xl-25 w-xxl-25 mb-6 mb-lg-0">
                <li
                  className="nav-item dropdown  pl-10"
                  style={{ listStyle: "none" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ maxWidth: "95%" }}
                    id="navbarDropdown"
                    href="#features"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <a
                      className="nav-link dropdown-toggle filter-toogle gr-toggle-arrow countrySecectorHeader"
                      id="navbarDropdown"
                      href="#features"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      style={{ overflow: "hidden", maxWidth: "90%" }}
                    >
                      {country_id.country_id == ""
                        ? "country"
                        : country_id.nicename}
                    </a>
                    <span>
                      <i
                        className="fa fa-caret-down font-size-3 text-primary"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>

                  <ul
                    className="gr-menu-dropdown dropdown-menu country-selector"
                    aria-labelledby="navbarDropdown"
                  >
                    {tutorCountiresList.map((country, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => this.selectCountry(country)}
                          className="drop-menu-item "
                        >
                          <a>{country.nicename}</a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <span className="h-100  w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                  <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
                </span>
              </div>
              {/* <!-- ./select-city ends --> */}

              {/* <!-- .Select language starts --> */}
              <div className="form-group position-relative w-lg-25 w-xl-25 w-xxl-25 mb-6 mb-lg-0">
                <li
                  className="nav-item dropdown  pl-10"
                  style={{ listStyle: "none" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ maxWidth: "95%" }}
                    id="navbarDropdown"
                    href="#features"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <a
                      className="nav-link dropdown-toggle filter-toogle gr-toggle-arrow countrySecectorHeader"
                      id="navbarDropdown"
                      href="#features"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      style={{ overflow: "hidden", maxWidth: "90%" }}
                    >
                      {language_id.id == "" ? "Language" : language_id.name}
                    </a>
                    <span>
                      <i
                        className="fa fa-caret-down font-size-3 text-primary"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <ul
                    className="gr-menu-dropdown dropdown-menu country-selector"
                    aria-labelledby="navbarDropdown"
                  >
                    {tutorLanguages.map((language, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => this.selectLngugge(language)}
                          className="drop-menu-item "
                        >
                          <a>{language.name}</a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                  <i className="fa fa-language text-primary font-weight-bold"></i>
                </span>
              </div>
              {/* <!-- ./select language ends --> */}
              {/* Levels start */}
              <div className="form-group position-relative w-lg-25 w-xl-25 w-xxl-25 mb-6 mb-lg-0">
                <li
                  className="nav-item dropdown  pl-10"
                  style={{ listStyle: "none" }}
                >
                  <div
                    className="d-flex align-items-center justify-content-between"
                    style={{ maxWidth: "95%" }}
                    id="navbarDropdown"
                    href="#features"
                    role="button"
                    data-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <a
                      className="nav-link dropdown-toggle filter-toogle gr-toggle-arrow countrySecectorHeader"
                      id="navbarDropdown"
                      href="#features"
                      role="button"
                      data-toggle="dropdown"
                      aria-expanded="false"
                      style={{ overflow: "hidden", maxWidth: "90%" }}
                    >
                      {this.props.language_level == ""
                        ? "Language level"
                        : this.props.language_level}
                    </a>
                    <span>
                      <i
                        className="fa fa-caret-down font-size-3 text-primary"
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                  <ul
                    className="gr-menu-dropdown dropdown-menu country-selector"
                    aria-labelledby="navbarDropdown"
                  >
                    {this.state.languagesLavel.map((level, index) => {
                      return (
                        <li
                          key={index}
                          onClick={() => this.selectLevel(level)}
                          className="drop-menu-item "
                        >
                          <a>{level}</a>
                        </li>
                      );
                    })}
                  </ul>
                </li>
                <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                  <i className="fa fa-signal text-primary font-weight-bold"></i>
                </span>
              </div>
            </div>
            <div className="ml-auto">
              <button
                className="btn btn-primary line-height-reset h-100 btn-submit  text-uppercase"
                onClick={() => SubmitFilter()}
              >
                <i className="fa fa-search text-white font-weight-bold font-size-5"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default TutorSearchBar;
