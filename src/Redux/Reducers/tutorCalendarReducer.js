const initState = {
  tutorCalendarData: {},
  tutorCalendarDataError: null,
  tutorCalendarDataLoader: true,
};

const TutorCalendarReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_CALENDER_LOADER":
      return {
        ...state,
        tutorCalendarDataLoader: action.payload,
        tutorCalendarDataError: null,
      };
    case "TUTOR_CALENDER_ERROR":
      return {
        ...state,
        tutorCalendarDataError: action.payload,
        tutorCalendarData: {},
        tutorCalendarDataLoader: false,
      };

    case "TUTOR_CALENDER_FETCH_SUCCESS":
      return {
        ...state,
        tutorCalendarDataError: null,
        tutorCalendarData: action.payload,
        tutorCalendarDataLoader: false,
      };

    default:
      return state;
  }
};

export default TutorCalendarReducer;
