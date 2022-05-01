import React from "react";
import LessonDetail from "../../../components/lessonDetail";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getLessonDetail } from "../../../Redux/Actions/LessonsDetailAction";
import { localRoutes } from "../../../utils/local_routes";
import { Link, Redirect } from "react-router-dom";
class StudentDashboardLessonDetail extends React.Component {
  state = { lesson_id: null, forceRedirect: false };

  async componentDidMount() {
    const queryString = new Buffer(window.location.search, "base64").toString(
      "ascii"
    );
    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("query");
    if (query !== null) {
      localStorage.setItem("lesson_detail_page__data_set", "set");
      localStorage.setItem("lesson_id", urlParams.get("lesson_id").trim());
    }
    if (localStorage.getItem("lesson_detail_page__data_set") !== "set") {
      this.setState({ forceRedirect: true });
    } else {
      const lesson_id = localStorage.getItem("lesson_id");

      await this.setState({
        lesson_id: lesson_id,
      });
      this.props.getLessonDetail(this.state.lesson_id, true);
    }
  }
  render() {
    const { lessonDetail, lessonDetailError, lessonDetailLoader } = this.props;
    const { forceRedirect } = this.state;

    if (forceRedirect) {
      return <Redirect to={localRoutes.student_dashboard_lessons} />;
    }

    if (lessonDetailLoader) {
      return <DashboardLoader type={"student"} />;
    }

    if (lessonDetailError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
          type={"student"}
        />
      );
    }

    return (
      <div
        className="student-dashboard-container mt-31 mt-lg-31"
        id="dashboard-body"
      >
        <div className="student-dashboard-content">
          {/* <!-- back Button End --> */}
          <div className="row justify-content-center">
            <div className=" col-lg-12 mt-4  dark-mode-texts">
              <div className="mb-9">
                <a
                  className="d-flex align-items-center ml-4 nav-back-btn"
                  onClick={() => window.history.back()}
                >
                  {" "}
                  <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                  <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                    Back
                  </span>
                </a>
              </div>
            </div>
          </div>
          <LessonDetail lessonDetail={lessonDetail} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    lessonDetail: state.lessonDetail.lessonDetail,
    lessonDetailError: state.lessonDetail.lessonDetailError,
    lessonDetailLoader: state.lessonDetail.lessonDetailLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getLessonDetail: (id, is_student) =>
      dispatch(getLessonDetail(id, is_student)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentDashboardLessonDetail);
