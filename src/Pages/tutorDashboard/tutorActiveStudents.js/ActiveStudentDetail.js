import React from "react";
import StudentDetail from "../../../components/studentDetail";
import { Link } from "react-router-dom";
import CustomDataTable from "../../../components/dataTable";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorActiveStudentDetail } from "../../../Redux/Actions/tutorActiveStudentDetailAction";
import { BaseUrl } from "../../../utils/api_routes";
class ActiveStudentDetail extends React.Component {
  state = { student_id: null, forceRedirect: false };

  async componentDidMount() {
    const queryString = new Buffer(window.location.search, "base64").toString(
      "ascii"
    );
    const urlParams = new URLSearchParams(queryString);

    var query = urlParams.get("query");
    if (query !== null) {
      localStorage.setItem("tutor_active_student_detail_page__data_set", "set");
      localStorage.setItem("student_id", urlParams.get("student_id").trim());
    }
    if (
      localStorage.getItem("tutor_active_student_detail_page__data_set") !==
      "set"
    ) {
      this.setState({ forceRedirect: true });
    } else {
      const student_id = localStorage.getItem("student_id");

      await this.setState({
        student_id: student_id,
      });
      this.props.getTutorActiveStudentDetail(this.state.student_id);
    }
  }
  render() {
    const {
      tutorActiveStudentDetail,
      tutorActiveStudentDetailError,
      tutorActiveStudentDetailLoader,
    } = this.props;
    const { forceRedirect } = this.state;

    // if (forceRedirect) {
    //   return <Redirect to={localRoutes.tutor_dashboard_trail_lessons} />;
    // }

    // if (tutorActiveStudentDetailLoader) {
    //   return <DashboardLoader />;
    // }

    // if (tutorActiveStudentDetailError !== null) {
    //   return (
    //     <DashboardErrorMessage
    //       message={
    //         "Unknown error acccoured Please reload the page to try again"
    //       }
    //     />
    //   );
    // }
    // console.error(tutorActiveStudentDetail);
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container">
          <StudentDetail />

          <div className="bg-white shadow-8 pt-7 rounded  px-11 mb-10 mt-10">
            <div className="table-responsive ">
              <CustomDataTable
                type="My Lessons"
                columns={[
                  {
                    name: "Name",
                    selector: "name",
                    sortable: true,

                    minWidth: "130px",
                    cell: (row) => (
                      <a
                        href="#"
                        className="media min-width-px-235 align-items-center"
                      >
                        <div className="circle-36 mr-6">
                          <img
                            src="image/table-one-profile-image-5.png"
                            alt=""
                            className="w-100"
                          />
                        </div>
                        <h4 className="font-size-4 mb-0 font-weight-semibold text-black-2">
                          {row.name}
                        </h4>
                      </a>
                    ),
                  },
                  {
                    name: "Course Title",
                    selector: "course",
                    sortable: true,

                    minWidth: "250px",
                  },
                  {
                    name: "Date",
                    selector: "date",
                    sortable: true,
                    minWidth: "120px",
                  },
                  {
                    name: "",
                    cell: (row) => {
                      return (
                        <div className="">
                          <Link
                            to={localRoutes.tutor_dashboard_lesson_detail}
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                          >
                            View Detail
                          </Link>
                        </div>
                      );
                    },
                  },
                  {
                    name: "",
                    cell: (row) => {
                      return (
                        <div className="">
                          <a
                            href="#"
                            className="font-size-3 font-weight-bold text-green text-uppercase"
                          >
                            Message
                          </a>
                        </div>
                      );
                    },
                  },
                ]}
                fileName={"My Lessons"}
                defaultSortAsc={false}
                defaultSortField={"name"}
                data={[
                  {
                    name: "Suleman",
                    course: "Development",
                    date: "12/12/2021",
                  },
                  {
                    name: "Hamza",
                    course: "Development",
                    date: "12/12/2021",
                  },
                ]}
                title={"Lessons History"}
              />
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
    tutorActiveStudentDetail:
      state.tutorActiveStudentDetail.tutorActiveStudentDetail,
    tutorActiveStudentDetailError:
      state.tutorActiveStudentDetail.tutorActiveStudentDetailError,
    tutorActiveStudentDetailLoader:
      state.tutorActiveStudentDetail.tutorActiveStudentDetailLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorActiveStudentDetail: (id) =>
      dispatch(getTutorActiveStudentDetail(id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveStudentDetail);
