import React from "react";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../../utils/api_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import AddTutorExperience from "../tutorExperience/AddTutorExperience";
import "../../../cssmodule/chatStyles.css";
import { ToastContent } from "../../../components/Toast";
import { toast } from "react-toastify";

let tutorSubjects = [];
class GetExperience extends React.Component {
  state = {
    experiencedata: [],
    eventsLoader: true,
    selectedExperience: {
      id: "",
      title: "",
      tutor_user_id: "",
      description: "",
      start_date: "",
      end_date: "",
      created_at: "",
    },
    sidebarType: "",
    sidebar: false,
  };

  componentDidMount() {
    this.getExperience();
  }

  getExperience = () => {
    axios
      .get(api.getTutorExperience + "/" + this.props.AuthData.id)
      .then((res) => {
        if (res.data.error.status === 0) {
          this.setState({ eventsLoader: false });
          this.setState({ experiencedata: res.data.response.detail });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  changeExperienceListPage = (pageNo) => {
    this.setState({ pageno: pageNo });
  };

  editTutorExperience = (event) => {
    let experienceDetails = {
      id: event.id,
      tutor_user_id: event.tutor_user_id,
      title: event.title,
      description: event.description,
      start_date: event.start_date,
      end_date: event.end_date,
    };
    this.setState({ selectedExperience: experienceDetails });
    this.setState({ sidebar: !this.state.sidebar, sidebarType: "edit" });
  };

  deleteTutorExperience = (event) => {
    var del = window.confirm('Are you sure to delete this experience');
    if(del){
      this.setState({ eventsLoader: true });
      axios
      .get(api.deleteTutorExperiences + "/" + event.id + "/" + this.props.AuthData.id)
      .then((res) => {
        toast.dismiss();
        toast(() => ToastContent('Experience deleted successfully'), {
          toastId: "infoToast",
          hideProgressBar: false,
          autoClose: 2000,
          type: toast.TYPE.SUCCESS,
        });
        this.setState({ eventsLoader: false });
        this.setState({ experiencedata: res.data.response.detail });
      })
      .catch((err) => {
        toast.dismiss();
        toast(() => ToastContent("Experience not deleted"), {
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

  handleAddExperienceSidebar = (type) => {
    if (type == "add") {
      let EventDetails = {
        id: "",
        title: "",
        tutor_user_id: "",
        description: "",
        start_date: "",
        end_date: "",
        created_at: "",
        start_date: "",
        end_date: "",
      };
      this.setState({ selectedExperience: EventDetails });
    }
    this.setState({ sidebar: !this.state.sidebar, sidebarType: type });
    this.getExperience();
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
              onClick={() => this.handleAddExperienceSidebar("add")}
            >
              Add Experience
            </button>
          </div>
        </div>
        <div className="container">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              {!this.state.eventsLoader ? (
                <DataTableAdvance
                  type="Experience Details"
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
                      name: "Start date",
                      sortable: false,
                      minWidth: "20px",
                      selector: "start_date",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.start_date}
                          </div>
                        );
                      },
                    },
                    {
                      name: "End date",
                      sortable: false,
                      minWidth: "20px",
                      selector: "end_date",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.end_date === null ? 'Currently working' : row.end_date}
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
                            <a onClick={() => this.editTutorExperience(row)}>
                              <i className="fa fa-edit"></i>
                            </a>
                            <a onClick={() => this.deleteTutorExperience(row)}>
                              <i className="fa fa-trash ml-2" style={{color:"red"}}></i>
                            </a>
                          </div>
                        );
                      },
                    },
                  ]}
                  fileName={"getExperience"}
                  defaultSortAsc={false}
                  defaultSortField={"created_at"}
                  noDataMessage={"No Experience Data Found....!"}
                  data={this.state.experiencedata}
                  current_page={1}
                  totalPages={1}
                  per_page={40}
                  title={"Experience"}
                  searchValue={[]}
                  loader={this.state.eventsLoader}
                />
              ) : (
                <DataTableAdvance
                  type="Experience Details"
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
                            <a onClick={() => this.editTutorExperience(row)}>
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
                  noDataMessage={"No Experience Data Found....!"}
                  data={[]}
                  title={"Experience"}
                  searchValue={[]}
                />
              )}
            </div>
          </div>
        </div>
        {this.state.sidebar ? (
          <AddTutorExperience
            selectedExperience={this.state.selectedExperience}
            sidebarType={this.state.sidebarType}
            isOpen={this.state.sidebar}
            handleAddExperienceSidebar={this.handleAddExperienceSidebar}
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

export default connect(mapStateToProps)(GetExperience);
