import React from "react";
import { Link, Redirect } from "react-router-dom";
import TutorAbout from "../../components/tutorAbout";
import Tutor_Booking_lesson from "../../components/tutorBooking";
import TutorProfileCard from "../../components/tutorProfileCard";
import TutorReviews from "../../components/tutorReviews";
import TutorSkills from "../../components/tutorSkills";
import { localRoutes } from "../../utils/local_routes";
import { connect } from "react-redux";
import { getTutorDetail } from "../../Redux/Actions/tutorDetailAction";
import Loader from "../../components/loader";
import ErrorMessage from "../../components/ErrorMessage";
import AddTutorReview from "../../components/addReview";
import FeaturedTutors from "../../components/featuredTutors";
import TutorWorkExperience from "../../components/tutorworkexperience";
import ReactPlayer from "react-player";

class TutorDetail extends React.Component {
  state = { tutor_id: null, forceRedirect: false };

  async componentDidMount() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
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
    const {
      tutorDetail,
      tutorDetailError,
      tutorDetailLoader,
      AuthData,
      featured_instructors,
      tutorCountiresList,
      currency,

      curency_rate,
    } = this.props;
    const { forceRedirect } = this.state;

    if (forceRedirect) {
      return <Redirect to={localRoutes.tutor_list} />;
    }
    if (tutorDetailLoader) {
      return (
        <div className="mt-35 mb-30">
          <Loader />
        </div>
      );
    }
    if (tutorDetailError !== null) {
      return (
        <div className="mt-35 mb-30">
          <ErrorMessage message="An unkown error accoured while fetching tutor data" />
        </div>
      );
    }

    return (
      <div className="bg-default-2 pt-0 pt-lg-10 pb-13 pb-xxl-32">
        <div className="container">
          {/* <!-- back Button --> */}
          <div className="row justify-content-center">
            <div className="col-12 dark-mode-texts">
              <div className="mb-9">
                <Link
                  className="d-flex align-items-center ml-4 mt-5"
                  to={localRoutes.tutor_list}
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
            <div className="col-12 col-xxl-3 col-lg-4 col-md-12 mb-11 mb-lg-0">
              <TutorProfileCard
                tutorDetail={tutorDetail}
                currency={currency}
                curency_rate={curency_rate}
                CountiresList={tutorCountiresList}
              />
              {/* Languages */}
              <TutorSkills languages={tutorDetail.languages} />
              {tutorDetail.popular_text != "" &&
              tutorDetail.popular_text != null ? (
                <div className="col-12 mt-5">
                  <div className="row bg-white rounded">
                    <div className="col-12 p-5">
                      <span className="pl-0">
                        <b>
                          <i className="fa fa-star"></i> Popular
                        </b>
                      </span>
                      <div className="col-sm-12 pl-0 mt-1">
                        {tutorDetail.popular_text}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* Detail */}
            <div className="col-12 col-xxl-8 col-lg-8 col-md-12 order-2 order-xl-1">
              <div className="rounded-4">
                <div className="tab-content">
                  <div
                    className="tab-pane fade show active"
                    id="tutor_overview"
                    role="tabpanel"
                    aria-labelledby="tutor_overview-tab"
                  >
                    {tutorDetail.video_url != "" &&
                    tutorDetail.video_url != null ? (
                      <div className="w-100 bg-white rounded">
                        <div className="player-wrapper" style={{}}>
                          <ReactPlayer
                            className="react-player"
                            url={tutorDetail.video_url}
                            light={true}
                            // width='100%'
                            // height='100%'
                          />
                        </div>
                      </div>
                    ) : null}
                    <TutorAbout detail={tutorDetail.detail} />
                    {/* <TutorSkills
                      languages={tutorDetail.languages}
                      courses={tutorDetail.courses}
                    /> */}
                    <Tutor_Booking_lesson
                      tutorDetail={tutorDetail}
                      AuthData={AuthData}
                    />
                    <TutorWorkExperience tutorDetail={tutorDetail} />
                    <TutorReviews
                      instructor_profile_reviews={
                        tutorDetail.instructor_profile_reviews
                      }
                      reviews={tutorDetail}
                    />
                    <AddTutorReview tutor_id={tutorDetail.id} />
                  </div>
                </div>
              </div>
              {/* Featured Tutore */}
              <div className="col-12 mt-8">
                <h5 className="font-size-18">Featured Tutors</h5>
                <div className="mt-4 w-100">
                  <FeaturedTutors
                    featured_instructors={featured_instructors}
                    CountiresList={tutorCountiresList}
                    currency={currency}
                    curency_rate={curency_rate}
                    currentTutor={this.state.tutor_id}
                  />
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
    featured_instructors: state.tutorList.featured_instructors,
    tutorCountiresList: state.tutorList.tutorCountiresList,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorDetail: (tutor_id) => dispatch(getTutorDetail(tutor_id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorDetail);
