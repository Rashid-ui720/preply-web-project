import React, { Component } from "react";
import Slider, { SliderTooltip } from "rc-slider";
import "rc-slider/assets/index.css";
const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

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

  handelper_hr_rate = (e) => {
    const { handleSearchFilter } = this.props;
    handleSearchFilter("per_hr_rate", e.target.value);
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
      currency,
      currency_date,
      curency_rate,
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
          <div className="filter-search-form-2 search-1-adjustment bg-white rounded-sm shadow-7 pr-6 py-6 pl-6 m-auto search_form_width">
            <div className="filter-inputs w-100">
              {/* I wanted to learn */}
              <div className="form-group position-relative w-lg-50 w-xl-50 w-xxl-50 mb-6 mb-lg-0 ">
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
              {/* <div className="form-group position-relative w-lg-25 w-xl-25 w-xxl-25 mb-6 mb-lg-0">
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
              </div> */}
              {/* <!-- ./select-city ends --> */}

              {/* <!-- .select-price starts --> */}
              {/* <div className="form-group position-relative w-lg-50 w-xl-50 w-xxl-50 mb-6 mb-lg-0 ">
                <li
                  className="nav-item dropdown  pl-10 w-100 "
                  style={{ listStyle: "none" }}
                >
                  <div class="form-group position-relative w-100 ">
                    <input
                      class="form-control focus-reset "
                      type="number"
                      min={0}
                      max={200}
                      id="keyword"
                      placeholder="Price"
                      value={this.props.per_hr_rate}
                      onChange={(e) => this.handelper_hr_rate(e)}
                    />
                  </div>
                </li>
                <span className="h-100  w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                  <i className="fas fa-dollar-sign text-primary font-weight-bold"></i>
                </span>
              </div> */}
              {/* <!-- ./select-price ends --> */}

              {/* <!-- .Select language starts --> */}
              <div className="form-group position-relative w-lg-50 w-xl-50 w-xxl-50 mb-6 mb-lg-0">
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
                      {this.props.per_hr_rate_from !== "" ||
                      this.props.per_hr_rate_to !== ""
                        ? currency == "GBP"
                          ? `${this.props.per_hr_rate_from}£-
                        ${this.props.per_hr_rate_to}£`
                          : `${parseInt(
                              curency_rate *
                                parseInt(this.props.per_hr_rate_from)
                            )}$-
                        ${parseInt(
                          curency_rate * parseInt(this.props.per_hr_rate_to)
                        )}$`
                        : "Price"}
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
                    <div className="w-100 mt-10 p-5 mb-0 pb-0">
                      <p className="mb-2">
                        {currency == "GBP"
                          ? ` ${this.props.per_hr_rate_from}£-
                        ${this.props.per_hr_rate_to}£`
                          : `${parseInt(
                              curency_rate *
                                parseInt(
                                  this.props.per_hr_rate_from == ""
                                    ? 0
                                    : this.props.per_hr_rate_from
                                )
                            )}$-
                        ${parseInt(
                          curency_rate *
                            parseInt(
                              this.props.per_hr_rate_to == ""
                                ? 0
                                : this.props.per_hr_rate_to
                            )
                        )}$`}
                      </p>
                      <Range
                        min={1}
                        max={100}
                        defaultValue={[
                          this.props.per_hr_rate_from,
                          this.props.per_hr_rate_to,
                        ]}
                        tipFormatter={(value) => `${value}£`}
                        onChange={(value) =>
                          this.props.handelper_hr_rate(value)
                        }
                      />
                    </div>
                  </ul>
                </li>
                <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
                  <i
                    className={`fas fa-${
                      currency == "GBP" ? "pound" : "dollar"
                    }-sign text-primary font-weight-bold`}
                  ></i>
                </span>
              </div>

              {/* <!-- ./select language ends --> */}
              {/* Levels start */}
              {/* <div className="form-group position-relative w-lg-25 w-xl-25 w-xxl-25 mb-6 mb-lg-0">
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
               */}
              {/* Language level end */}
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
