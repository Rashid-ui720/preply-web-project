const initState = {
  tutorTimeSlots: [],
  tutorTimeSlotsError: null,
  tutorTimeSlotsLoader: true,
};

const TutorTimeSlotsReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_TIME_SLOTS_LOADER":
      return {
        ...state,
        tutorTimeSlotsLoader: action.payload,
        tutorTimeSlotsError: null,
      };
    case "TUTOR_TIME_SLOTS_ERROR":
      return {
        ...state,
        tutorTimeSlotsError: action.payload,
        tutorTimeSlots: [],
        tutorTimeSlotsLoader: false,
      };

    case "TUTOR_TIME_SLOTS_FETCH_SUCCESS":
      return {
        ...state,
        tutorTimeSlotsError: null,
        tutorTimeSlots: action.payload,
        tutorTimeSlotsLoader: false,
      };

    default:
      return state;
  }
};

export default TutorTimeSlotsReducer;
