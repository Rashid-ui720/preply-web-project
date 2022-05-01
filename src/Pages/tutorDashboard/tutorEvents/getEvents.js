import React from "react";
import DataTableAdvance from "../../../components/dataTableAdvance";
import { connect } from "react-redux";
import axios from "axios";
import { api } from "../../../utils/api_routes";
import DashboardLoader from "../../../components/DashboardLoader";
import AddTutorEvents from "../tutorEvents/AddTutorEvents";

class TutorEvents extends React.Component {
  state = {
    eventsdata: { data: [] },
    pageno: 1,
    eventsLoader: true,
    selectedEvent: {
      created_at: "",
      date: "",
      end_time: "",
      id: "",
      show_position: "",
      start_time: "",
      title: "",
      user_id: "",
    },
    sidebarType: "",
    sidebar: false,
  };

  componentDidMount() {
    this.getEvents();
  }

  getEvents = () => {
    axios
      .get(
        api.getEvents +
          "/" +
          this.props.AuthData.id +
          "?page=" +
          this.state.pageno
      )
      .then((res) => {
        this.setState({ eventsdata: res.data, eventsLoader: false });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  changeEventListPage = (pageNo) => {
    this.setState({ pageno: pageNo });
  };

  editTutorEvent = (event) => {
    let EventDetails = {
      created_at: event.created_at,
      date: event.date,
      end_time: event.end_time,
      id: event.id,
      show_position: event.is_off,
      start_time: event.start_time,
      title: event.reason,
      user_id: event.tutor_id,
    };
    this.setState({ selectedEvent: EventDetails });
    this.setState({ sidebar: !this.state.sidebar, sidebarType: "edit" });
  };

  handleAddEventSidebar = (type) => {
    if (type == "add") {
      let EventDetails = {
        created_at: "",
        dates: "",
        end_time: "",
        id: "",
        show_position: "",
        start_time: "",
        title: "",
        user_id: "",
      };
      this.setState({ selectedEvent: EventDetails });
    }
    this.setState({ sidebar: !this.state.sidebar, sidebarType: type });
    this.getEvents();
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
        <div className="container">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11">
            <div className="table-responsive ">
              {this.state.eventsdata.data.length > 0 ? (
                <DataTableAdvance
                  type="Event Details"
                  columns={[
                    {
                      name: "Title",
                      selector: "reason",
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
                      name: "Event Date",
                      selector: "date",
                      sortable: true,
                      minWidth: "180px",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.date}
                          </div>
                        );
                      },
                    },
                    {
                      name: "Start Time",
                      sortable: true,
                      minWidth: "40px",
                      selector: "start_time",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.start_time}
                          </div>
                        );
                      },
                    },

                    {
                      name: "End Time",
                      sortable: true,
                      minWidth: "40px",
                      selector: "end_time",
                      cell: (row) => {
                        return (
                          <div className="text-truncate  overflow-hidden">
                            {row.end_time}
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
                            <a onClick={() => this.editTutorEvent(row)}>
                              <i className="fa fa-edit"></i>
                            </a>
                          </div>
                        );
                      },
                    },
                  ]}
                  fileName={"getEvents"}
                  defaultSortAsc={false}
                  defaultSortField={"created_at"}
                  noDataMessage={"No Events Data Found....!"}
                  data={this.state.eventsdata.data}
                  current_page={this.state.eventsdata.current_page}
                  totalPages={this.state.eventsdata.last_page}
                  per_page={this.state.eventsdata.per_page}
                  changePage={this.changeEventListPage}
                  title={"Events"}
                  searchValue={[]}
                  loader={this.state.eventsLoader}
                />
              ) : null}
            </div>
          </div>
        </div>
        {this.state.sidebar ? (
          <AddTutorEvents
            selectedEvent={this.state.selectedEvent}
            sidebarType={this.state.sidebarType}
            isOpen={this.state.sidebar}
            handleAddEventSidebar={this.handleAddEventSidebar}
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

export default connect(mapStateToProps)(TutorEvents);
