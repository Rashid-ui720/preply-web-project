import React from "react";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../../utils/api_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import AddTutorSubject from "../tutorSubject/AddTutorSubject";
import "../../../cssmodule/chatStyles.css";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";

let tutorSubjects = [];
class TutorSubjects extends React.Component {
  state = {
    subjectsdata: [],
    eventsLoader: true,
    selectedSubject: {
      created_at: "",
      date: "",
      status: "",
      id: "",
      title: "",
      tutor_user_id: "",
      description: "",
    },
    sidebarType: "",
    sidebar: false,
  };

  componentDidMount() {
    this.getSubjects();
  }

  getSubjects = () => {
    axios
      .get(api.getTutorSubjects + "/" + this.props.AuthData.id)
      .then((res) => {
        this.setState({ eventsLoader: false });
        this.setState({ subjectsdata: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  changeEventListPage = (pageNo) => {
    this.setState({ pageno: pageNo });
  };

  editTutorSubject = (event) => {
    let LessonDetails = {
      created_at: event.created_at,
      id: event.id,
      title: event.title,
      tutor_user_id: event.tutor_user_id,
      status: event.status,
      description: event.description,
    };
    this.setState({ selectedSubject: LessonDetails });
    this.setState({ sidebar: !this.state.sidebar, sidebarType: "edit" });
  };

  deleteTutorSubject = (event) => {
    var del = window.confirm('Are you sure to delete this subject');
    if(del){
      this.setState({ eventsLoader: true });
      axios
      .post(api.deleteTutorSubjects + "/" + event.id + "/" + this.props.AuthData.id)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent('Subject deleted successfully'), {
          toastId: "infoToast",
          hideProgressBar: false,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });
        this.setState({ eventsLoader: false });
        this.setState({ subjectsdata: res.data });
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("Subject not deleted"), {
          toastId: "error",
          hideProgressBar: false,
          autoClose: 2000,
          type: toast.TYPE.ERROR,
        });
        this.setState({ eventsLoader: false });
        console.error(err);
      });
    }
  }

  handleAddSubjectSidebar = (type) => {
    if (type == "add") {
      let EventDetails = {
        created_at: "",
        id: "",
        title: "",
        tutor_user_id: "",
        description: "",
      };
      this.setState({ selectedSubject: EventDetails });
    }
    this.setState({ sidebar: !this.state.sidebar, sidebarType: type });
    this.getSubjects();
  };

  render() {
    if (this.state.eventsLoader) {
      return <DashboardLoader />;
    }
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="row text-right mr-5">
          <div className="col-12 mb-2">
            <button
              type="button"
              className="btn btn-sm btn-primary rounded-pill"
              style={{ padding: "15px" }}
              onClick={() => this.handleAddSubjectSidebar("add")}
            >
              Add Subject
            </button>
          </div>
        </div>
        <div className="container">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              {!this.state.eventsLoader ? (
                <DataTableAdvance
                  type="Subject Details"
                  columns={[
                    {
                      name: "Title",
                      selector: "title",
                      sortable: true,
                      minWidth: "50px",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.title}
                          </div>
                        );
                      },
                    },
                    {
                      name: "Description",
                      selector: "description",
                      sortable: false,
                      minWidth: "50px",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.description}
                          </div>
                        );
                      },
                    },
                    {
                      name: "Status",
                      sortable: false,
                      minWidth: "20px",
                      selector: "status",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {parseInt(row.status) === 1
                              ? "Publish"
                              : "Inactive"}
                          </div>
                        );
                      },
                    },

                    {
                      name: "Action",
                      sortable: true,
                      minWidth: "20px",
                      selector: "action",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            <a onClick={() => this.editTutorSubject(row)}>
                              <i className="fa fa-edit"></i>
                            </a>
                            <a onClick={() => this.deleteTutorSubject(row)}>
                              <i className="fa fa-trash ml-2" style={{color:"red"}}></i>
                            </a>
                          </div>
                        );
                      },
                    },
                  ]}
                  fileName={"getSubjects"}
                  defaultSortAsc={false}
                  defaultSortField={"created_at"}
                  noDataMessage={"No Subject Data Found....!"}
                  data={this.state.subjectsdata}
                  current_page={1}
                  totalPages={1}
                  per_page={40}
                  title={"Subject"}
                  searchValue={[]}
                  loader={this.state.eventsLoader}
                />
              ) : (
                <DataTableAdvance
                  type="Event Details"
                  columns={[
                    {
                      name: "Title",
                      selector: "title",
                      sortable: true,

                      minWidth: "220px",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.reason}
                          </div>
                        );
                      },
                    },
                    {
                      name: "Description",
                      selector: "description",
                      sortable: true,
                      minWidth: "180px",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.description}
                          </div>
                        );
                      },
                    },
                    {
                      name: "Status",
                      sortable: true,
                      minWidth: "40px",
                      selector: "status",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.status === 1 ? "Publish" : "Inactive"}
                          </div>
                        );
                      },
                    },

                    {
                      name: "Action",
                      sortable: true,
                      minWidth: "40px",
                      selector: "action",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            <a onClick={() => this.editTutorSubject(row)}>
                              <i className="fa fa-edit"></i>
                            </a>
                          </div>
                        );
                      },
                    },
                  ]}
                  fileName={"getSubjects"}
                  defaultSortAsc={false}
                  defaultSortField={"created_at"}
                  noDataMessage={"No Subject Data Found....!"}
                  data={[]}
                  title={"Subject"}
                  searchValue={[]}
                />
              )}
            </div>
          </div>
        </div>
        {this.state.sidebar ? (
          <AddTutorSubject
            selectedSubject={this.state.selectedSubject}
            sidebarType={this.state.sidebarType}
            isOpen={this.state.sidebar}
            handleAddSubjectSidebar={this.handleAddSubjectSidebar}
            AuthData={this.props.AuthData}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
  };
};

export default connect(mapStateToProps)(TutorSubjects);
