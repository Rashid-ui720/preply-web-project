import '../../../cssmodule/app-calendar.css';
import React from "react";
// ** Full Calendar & it's Plugins
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import LessonDetailModal from "../../../components/lessonDetailModal";
import NewAppointmentModal from "../../../components/NewAppointmentModal";
import DashboardLoader from "../../../components/DashboardLoader";
import DashboardErrorMessage from "../../../components/DashboardErrorMessage";
import { connect } from "react-redux";
import { getTutorCalendarData } from "../../../Redux/Actions/tutorCalendarActions";
class TutorCalendar extends React.Component {
  state = { DetailModal: false, selectedLesson: null  , openNewAppointmentModal: false , newAppointmentData: null};

  // ** CalendarColors
  calendarsColor = {
    Business: "primary",
    Holiday: "successEvent",
    Personal: "danger",
    Family: "warning",
    ETC: "infoEvent",
  };

  opneDetailModal = (selectedLesson) => {
    this.setState({ DetailModal: true, selectedLesson: selectedLesson });
  };

  onCloseDetailModal = () => {
    this.setState({ DetailModal: false });
  };

  // New appointment function
  addNewAppointmentModal = (info) => {
    this.setState({openNewAppointmentModal: true , newAppointmentData: info})
  }

  // New appointment close function
  closeNewAppointmentModal = () => {
    this.setState({openNewAppointmentModal: false })
  }

  // ** calendarOptions(Props)
  calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "sidebarToggle, prev,next, title",
      end: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    
    /*
      Enable dragging and resizing event
      ? Docs: https://fullcalendar.io/docs/editable
    */
    editable: false,

    /*
      Enable resizing event from start
      ? Docs: https://fullcalendar.io/docs/eventResizableFromStart
    */
    eventResizableFromStart: false,

    /*
      Automatically scroll the scroll-containers during event drag-and-drop and date selecting
      ? Docs: https://fullcalendar.io/docs/dragScroll
    */
    dragScroll: false,

    /*
      Max number of events within a given day
      ? Docs: https://fullcalendar.io/docs/dayMaxEvents
    */
    dayMaxEvents: 2,

    /*
      Determines if day names and week names are clickable
      ? Docs: https://fullcalendar.io/docs/navLinks
    */
    navLinks: true,

    eventClassNames: ({ event: calendarEvent }) => {
      // eslint-disable-next-line no-underscore-dangle
      const colorName = this.calendarsColor.Holiday;

      return [
        // Background Color
        `bg-light-${colorName}`,
      ];
    },

    eventClick: async ({ event: clickedEvent }) => {
      // var EventDetail = {
      //   created_at: clickedEvent._def.extendedProps.created_at,
      //   date: clickedEvent._def.extendedProps.dates,
      //   end_time: clickedEvent._def.extendedProps.end_time,
      //   id: clickedEvent._def.publicId,
      //   show_position: clickedEvent._def.extendedProps.show_position,
      //   start_time: clickedEvent._def.extendedProps.start_time,
      //   title: clickedEvent._def.title,
      //   user_id: clickedEvent._def.extendedProps.user_id,
      // };

      this.opneDetailModal(clickedEvent._def.extendedProps);
    },

    dateClick: (info) => {
        if(info.view.type === 'timeGridWeek'){
          this.addNewAppointmentModal(info);
        }
    },
    datesSet: (dateInfo) => {
      let Month = 0;
      if (
        dateInfo.view.type !== "timeGridDay" &&
        dateInfo.view.type !== "timeGridWeek"
      ) {
        Month =
          new Date(dateInfo.startStr).getDate() == 1
            ? new Date(dateInfo.startStr).getMonth() + 1
            : new Date(dateInfo.startStr).getMonth() == 11
            ? 1
            : new Date(dateInfo.startStr).getMonth() + 2;
      } else {
        Month =
          new Date(dateInfo.startStr).getMonth() == 11
            ? 1
            : new Date(dateInfo.startStr).getMonth() + 1;
      }

      let year =
        Month == 1
          ? new Date(dateInfo.endStr).getFullYear()
          : new Date(dateInfo.startStr).getFullYear();
      let params = {
        instructor_id: this.props.AuthData.id
          ? this.props.AuthData.id
          : this.props.AuthData.user_id,
        month: Month,
        year: year,
      };
      this.props.getTutorCalendarData(params);
    },

    eventDrop: ({ event: droppedEvent }) => {
    },

    /*
      Handle event resize
      ? Docs: https://fullcalendar.io/docs/eventResize
    */
    eventResize({ event: resizedEvent }) {
    },

    eventAdd : function (){
    },

    eventRender: function (event, element, view) {
      var currentMon = new Date(event.start);
      var currentMonth = currentMon.getMonth();

      var currentMonViewStart = new Date(view.start);
      var currentMonthViewStart = currentMon.getMonth();

      var currentMonViewEnd = new Date(view.end);
      var currentMonthViewEnd = currentMonViewEnd.getMonth();

      if (
        currentMonth == currentMonthViewStart &&
        currentMonth == currentMonthViewEnd
      ) {
        return false;
      }
    },
  };
  render() {
    const {
      tutorCalendarData,
      tutorCalendarDataError,
      tutorCalendarDataLoader,
    } = this.props;

    if (tutorCalendarDataError !== null) {
      return (
        <DashboardErrorMessage
          message={
            "Unknown error acccoured Please reload the page to try again"
          }
        />
      );
    }
    return (
      <div
        className="dashboard-main-container mt-25 mt-lg-31"
        id="dashboard-body"
      >
        <div className="container mb-10">
          <div className="bg-white shadow-8 pt-7 rounded pb-9 px-11 calander-container position-relative">
            <FullCalendar
              {...this.calendarOptions}
              events={tutorCalendarData}
            />

            {tutorCalendarDataLoader ? (
              <div className="calendarLoader rounded">
                <div className="text-center w-100">
                  <div
                    className="spinner-border"
                    style={{
                      width: "3rem",
                      height: "3rem",
                      color: "#00b074",
                    }}
                    role="status"
                  ></div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* Add package form Modal */}
        <Modal
          center
          open={this.state.DetailModal}
          showCloseIcon={false}
          onClose={this.onCloseDetailModal}
          classNames={{ modal: "min-width-60" }}
        >
          <LessonDetailModal
            SelectedLessonDetail={this.state.selectedLesson}
            onCloseDetailModal={this.onCloseDetailModal}
          />
        </Modal>
        {/* New appointment modal */}
        <Modal
          center
          open={this.state.openNewAppointmentModal}
          showCloseIcon={false}
          onClose={this.closeNewAppointmentModal}
          classNames={{ modal: "min-width-50" }}
        >
          <NewAppointmentModal
            newAppointmentData={this.state.newAppointmentData}
            closeNewAppointmentModal={this.closeNewAppointmentModal}
          />
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    AuthError: state.Auth.AuthError,
    AuthData: state.Auth.AuthData,
    tutorCalendarData: state.tutorCalendarData.tutorCalendarData,
    tutorCalendarDataError: state.tutorCalendarData.tutorCalendarDataError,
    tutorCalendarDataLoader: state.tutorCalendarData.tutorCalendarDataLoader,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTutorCalendarData: (params) => dispatch(getTutorCalendarData(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TutorCalendar);
