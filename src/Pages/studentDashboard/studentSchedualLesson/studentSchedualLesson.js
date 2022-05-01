import React from "react";
import { Link, Redirect } from "react-router-dom";
import Booking_lesson from "./bookingLesson";
import TutorProfileCard from "./tutorProfile";
import { localRoutes } from "../../../utils/local_routes";
import { connect } from "react-redux";
import { getTutorDetail } from "../../../Redux/Actions/tutorDetailAction";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
class StudentSchedualLesson extends React.Component {
  state = { tutor_id: null, forceRedirect: false };

  async componentDidMount() {
    const queryString = new Buffer(window.location.search, "base64").toString(
      "ascii"
    );

    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("query");
    if (query !== null) {
      localStorage.setItem("detail_page__data_set", "set");
      localStorage.setItem("tutor_id", urlParams.get("tutor_id").trim());
    }
    if (localStorage.getItem("detail_page__data_set") !== "set") {
      this.setState({ forceRedirect: true });
    } else {
      const tutor_id = localStorage.getItem("tutor_id");

      await this.setState({
        tutor_id,
      });
      //get tutor detail

      this.props.getTutorDetail(this.state.tutor_id);
    }
  }

  render() {
    const { tutorDetail, tutorDetailError, tutorDetailLoader, AuthData , ParentChild} =
      this.props;
    const { forceRedirect } = this.state;
    if (forceRedirect) {
      return <Redirect to={localRoutes.tutor_list} />;
    }
    if (tutorDetailLoader) {
      return <DashboardLoader type={"student"} />;
    }
    if (tutorDetailError !== null) {
      return (
        <DashboardErrorMessage
          type={"student"}
          message="An unkown error accoured while fetching tutor data"
        />
      );
    }

    return (
      <div
        className="student-dashboard-container mt-31 mt-lg-31"
        id="dashboard-body"
      >
        <div className="student-dashboard-content">
          {/* <!-- back Button --> */}
          <div className="row justify-content-center no-gutters">
            <div className="col-12 dark-mode-texts">
              <div className="mb-9">
                <Link
                  className="d-flex align-items-center ml-4"
                  to={localRoutes.student_dashboard_available_tutors}
                >
                  <i className="icon icon-small-left bg-white circle-40 mr-5 font-size-7 text-black font-weight-bold shadow-8"></i>
                  <span className="text-uppercase font-size-3 font-weight-bold text-gray">
                    Back
                  </span>
                </Link>
              </div>
            </div>
          </div>
          {/* <!-- back Button End --> */}
          <div className="row">
            <TutorProfileCard tutorDetail={tutorDetail} />

            {/* Booking Lesson Calander */}
            <div className="col-12 col-xxl-9 col-lg-8 col-md-12 order-2 order-xl-1">
              <div className="bg-white rounded-4 shadow-9">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="tutor_overview"
                    role="tabpanel"
                    aria-labelledby="tutor_overview-tab"
                  >
                    <Booking_lesson
                      tutorDetail={tutorDetail}
                      AuthData={AuthData}
                      ParentChild={ParentChild}
                    />
                  </div>
                </div>
              </div>
            </div>
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
    tutorDetail: state.tutorDetail.tutorDetail,
    tutorDetailError: state.tutorDetail.tutorDetailError,
    tutorDetailLoader: state.tutorDetail.tutorDetailLoader,
    ParentChild: state.Auth.parentChild
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDetail: (tutor_id) => dispatch(getTutorDetail(tutor_id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentSchedualLesson);
