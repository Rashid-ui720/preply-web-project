import React, { Component } from "react";
import { connect } from "react-redux";
import { getTutorList } from "../Redux/Actions/tutorListActions";
class CoursesList extends Component {
  state = {};

  selectCourse = (course) => {
    const { handleCountry_or_language_select, course_id, removeSeletedCourse } =
      this.props;
    for (let i = 0; i < course_id.length; i++) {
      if (parseInt(course_id[i].course_id) == parseInt(course.id)) {
        removeSeletedCourse({
          course_id: course.id,
          title: course.title,
        });
        return;
      }
    }
    handleCountry_or_language_select("course_id", {
      course_id: course.id,
      title: course.title,
    });
  };

  async componentDidMount() {
    this.props.getTutorList(0, "", "", "", "", "");
  }
  checkForCourse = (SelectedCourse) => {
    const { course_id } = this.props;
    if (course_id.length == 0) {
      return false;
    } else {
      let check = false;
      for (let i = 0; i < course_id.length; i++) {
        if (course_id[i].course_id == SelectedCourse.id) {
          check = true;
        }
      }
      return check;
    }
  };
  render() {
    const { course_id, tutorListLoader, tutorCourses, tutorSignup } =
      this.props;

    return (
      <div className=" position-relative w-100">
        <li
          className={`nav-item dropdown  ${true ? "" : "pl-10"}`}
          style={{ listStyle: "none", zIndex: "unset" }}
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
            {course_id.length == 0
              ? "courses"
              : course_id.length + " selected "}
          </a>
          <ul
            className="gr-menu-dropdown dropdown-menu country-selector"
            style={{ maxHeight: tutorSignup ? "" : "9rem" , zIndex:"99" }}
            aria-labelledby="navbarDropdown"
          >
            {tutorListLoader ? (
              <li className="drop-menu-item ">
                <a>Loading...</a>
              </li>
            ) : (
              tutorCourses.map((course, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => this.selectCourse(course)}
                    className={`drop-menu-item d-flex  ${
                      this.checkForCourse(course) ? "selectedLanguage" : ""
                    }`}
                  >
                    <label
                      htmlFor="terms-check3  "
                      className="gr-check-input   mr-2 d-flex align-items-center mb-0 "
                    >
                      <input
                        className="d-none"
                        type="checkbox"
                        id="terms-check3"
                        checked={this.checkForCourse(course) ? true : false}
                      />
                      <span className="checkbox mr-2"></span>
                    </label>
                    <a>{course.title}</a>
                  </li>
                );
              })
            )}
          </ul>
        </li>
        {true ? null : (
          <span className="h-100 w-px-50 pos-abs-tl d-flex align-items-center justify-content-center font-size-6">
            <i className="icon icon-pin-3 text-primary font-weight-bold"></i>
          </span>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tutorListError: state.tutorList.tutorListError,
    tutorListLoader: state.tutorList.tutorListLoader,
    tutorCourses: state.tutorList.tutorCourses,
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
export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
