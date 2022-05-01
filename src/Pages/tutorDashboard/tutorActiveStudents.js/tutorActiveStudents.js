import React from "react";
import { Link } from "react-router-dom";
import CustomDataTable from "../../../components/dataTable";
import { localRoutes } from "../../../utils/local_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorActiveStudents } from "../../../Redux/Actions/tutorActiveStudentsAction";
import { BaseUrl } from "../../../utils/api_routes";
class TutorActiveStudents extends React.Component {
  state = { searchValue: "", filteredData: [] };
  componentDidMount() {
    this.props.getTutorActiveStudents(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      1
    );
  }
  // ** Function to handle filter
  handleFilter = (e) => {};

  ChnageActiveStudentListPage = (pageNo) => {
    this.props.getTutorTrailLessons(
      this.props.AuthData.id
        ? this.props.AuthData.id
        : this.props.AuthData.user_id,
      pageNo
    );
  };

  render() {
    const {
      tutorActiveStudents,
      tutorActiveStudentsError,
      tutorActiveStudentsLoader,
    } = this.props;
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              <CustomDataTable
                type="Active Students"
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
                            to={localRoutes.tutor_dashboard_student_detail}
                            className="font-size-3 font-weight-bold text-black-2 text-uppercase"
                          >
                            View Profile
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
                fileName={"My Students"}
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
                title={"Active Students"}
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
    tutorActiveStudents: state.tutorActiveStudents.tutorActiveStudents,
    tutorActiveStudentsError:
      state.tutorActiveStudents.tutorActiveStudentsError,
    tutorActiveStudentsLoader:
      state.tutorActiveStudents.tutorActiveStudentsLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorActiveStudents: (user_id, pageNumber) =>
      dispatch(getTutorActiveStudents(user_id, pageNumber)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TutorActiveStudents);
