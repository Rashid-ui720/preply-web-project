import React from "react";
import TutorFilter from "../components/tutorListFilterSidebar";
// import TutorSearchBar from "../components/tutorListSearchbr";
import SeoSearchBar from "../components/seotutorSearchbar";
import TutorCard from "../components/tutorListCard";
import { connect } from "react-redux";
import { getTutorList } from "../Redux/Actions/tutorListActions";
import Loader from "../components/loader";
import ErrorMessage from "../components/ErrorMessage";
import NothingFound from "../components/nothingFound";
import ReactPaginate from "react-paginate";

let tempArray = [];
class seoTutorListCard extends React.Component {
  state = {
    fname: "",
    country_id: { country_id: "", nicename: "" },
    language_id: { id: "", name: "" },
    course_id: { course_id: "", title: "" },
    per_hr_rate: [10, 40],
    level: "",
    language_level: "",
    per_hr_rate_from: "",
    per_hr_rate_to: "",
  };

  // Handle Filter
  handleSearchFilter = (objName, value) => {
    this.setState({ [objName]: value });
  };
  // handle per hour rate change
  handelper_hr_rate = (value) => {
    this.setState({ per_hr_rate_from: value[0], per_hr_rate_to: value[1] });
  };

  //submit filter
  SubmitFilter = () => {
    this.props.getTutorList(
      1,
      this.state.country_id.country_id,
      this.state.language_id.id,
      this.state.fname,
      this.state.language_level,
      this.state.course_id,
      this.state.per_hr_rate_from,
      this.state.per_hr_rate_to
    );
  };

  async componentDidMount() {
    this.props.getTutorList(
      1,
      this.state.country_id.country_id,
      this.state.language_id.id,
      this.state.fname,
      this.state.language_level,
      this.state.course_id,
      this.state.per_hr_rate_from,
      this.state.per_hr_rate_to
    );
  }

  // ** Function to handle Pagination
  handlePagination = (page) => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    this.props.getTutorList(
      page.selected + 1,
      this.state.country_id.country_id,
      this.state.language_id.id,
      this.state.fname,
      this.state.language_level,
      this.state.course_id,
      this.state.per_hr_rate
    );
  };

  // ** Custom Pagination
  CustomPagination = () => (
    <ReactPaginate
      previousLabel=""
      nextLabel=""
      forcePage={this.props.tutorList.current_page - 1}
      onPageChange={(page) => this.handlePagination(page)}
      pageCount={this.props.tutorList.last_page}
      breakLabel="..."
      pageRangeDisplayed={2}
      marginPagesDisplayed={2}
      activeClassName="page-active"
      pageClassName="page-item"
      breakClassName="page-item"
      breakLinkClassName="page-link-pagination"
      nextLinkClassName="page-link-pagination fa fa-angle-right"
      nextClassName="page-item next"
      previousClassName="page-item prev"
      previousLinkClassName="page-link-pagination fa fa-angle-left"
      pageLinkClassName="page-link-pagination"
      breakClassName="page-item"
      breakLinkClassName="page-link-pagination"
      containerClassName="pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
    />
  );


  setloadVideos = (element) => {
    tempArray.forEach((row, index) => {
      tempArray[index] = false;
    });
    tempArray[element] = true;
    return tempArray;
  };

  //tutor list component
  TutorListComp = (
    tutorList,
    tutorListError,
    tutorListLoader,
    currency,

    curency_rate
  ) => {
    if (tutorListLoader && tutorList.length == 0) {
      return <Loader />;
    }
    if (tutorListError !== null) {
      return (
        <ErrorMessage
          message={
            "An unknwon error ecoured whil getting tutor list please try again"
          }
        />
      );
    }

    if (tutorList.length == 0) {
      return <NothingFound message={"No tutor found"} />;
    }
    return tutorList.map((tutor, index) => {
      return (
        <TutorCard
          tutor={tutor}
          key={index}
          CountiresList={this.props.tutorCountiresList}
          currency={currency}
          curency_rate={curency_rate}
          index={index}
          setloadVideos={(e) => this.setloadVideos(e)}
        />
      );
    });
  };
  render() {
    const {
      tutorList,
      tutorListError,
      tutorListLoader,
      tutorCountiresList,
      tutorLanguages,
      tutorCourses,
      currency,

      curency_rate,
    } = this.props;
    return (
      <div
        className="  pt-26 pt-lg-28  "
        style={{ backgroundColor: "#ede0da" }}
      >
        <div className="row p-0 m-0 no-gutters">
          <div className="row col-12 no-gutters d-flex justify-content-center mb-30">
            <div className="col-11 no-gutters">
              {/* <TutorSearchBar
                handleSearchFilter={this.handleSearchFilter}
                SubmitFilter={this.SubmitFilter}
                fname={this.state.fname}
                country_id={this.state.country_id}
                tutorCountiresList={tutorCountiresList}
                tutorLanguages={tutorLanguages}
                tutorCourses={tutorCourses}
                language_id={this.state.language_id}
                language_level={this.state.language_level}
                course_id={this.state.course_id}
                per_hr_rate={this.state.per_hr_rate}
                per_hr_rate_from={this.state.per_hr_rate_from}
                per_hr_rate_to={this.state.per_hr_rate_to}
                handelper_hr_rate={this.handelper_hr_rate}
                currency={currency}
                curency_rate={curency_rate}
              /> */}
              <SeoSearchBar
                handleSearchFilter={this.handleSearchFilter}
                SubmitFilter={this.SubmitFilter}
                fname={this.state.fname}
                country_id={this.state.country_id}
                tutorCountiresList={tutorCountiresList}
                tutorLanguages={tutorLanguages}
                tutorCourses={tutorCourses}
                language_id={this.state.language_id}
                language_level={this.state.language_level}
                course_id={this.state.course_id}
                per_hr_rate={this.state.per_hr_rate}
                per_hr_rate_from={this.state.per_hr_rate_from}
                per_hr_rate_to={this.state.per_hr_rate_to}
                handelper_hr_rate={this.handelper_hr_rate}
                currency={currency}
                curency_rate={curency_rate}
                city_data={this.props.city_data}
              />
            </div>
          </div>

          <div className="row no-gutters p-0 m-0 bg-default-1 col-12 d-flex justify-content-center pb-13 pb-lg-25">
            <div className="row pt-15 col-10 m-0 no-gutters">
              {/* <!-- Main Body --> */}
              <div className="col-12 col-xl-12 col-lg-12 no-gutters">
                <div className="pt-0">
                  {this.TutorListComp(
                    tutorList.data == undefined ? tutorList : tutorList.data,
                    tutorListError,
                    tutorListLoader,
                    currency,

                    curency_rate
                  )}
                  {tutorListLoader
                    ? null
                    : tutorListError == null
                    ? this.CustomPagination()
                    : null}
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
    tutorList: state.tutorList.tutorList,
    tutorListError: state.tutorList.tutorListError,
    tutorListLoader: state.tutorList.tutorListLoader,
    tutorCountiresList: state.tutorList.tutorCountiresList,
    tutorLanguages: state.tutorList.tutorLanguages,
    tutorCourses: state.tutorList.tutorCourses,
    currency: state.currency.currency,

    curency_rate: state.currency.curency_rate,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorList: (
      pageNumber,
      country_id,
      language_id,
      name,
      level,
      course_id,
      per_hr_rate_from,
      per_hr_rate_to
    ) =>
      dispatch(
        getTutorList(
          pageNumber,
          country_id,
          language_id,
          name,
          level,
          course_id,
          per_hr_rate_from,
          per_hr_rate_to
        )
      ),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(seoTutorListCard);
