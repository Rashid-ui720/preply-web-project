const initState = {
  availability: [],
  availabilityError: null,
  availabilityLoader: true,
  breakLoader: true,
  breakError: null,
  break: [],
};

const tutorAvailabilityReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_AVAILABILITY_LOADER":
      return {
        ...state,
        availabilityLoader: action.payload,
        availabilityError: null,
      };
    case "AVAILABILITY_ERROR":
      return {
        ...state,
        availabilityError: action.payload,
        availability: [],
        availabilityLoader: false,
      };

    case "AVAILABILITY_FETCH_SUCCESS":
      return {
        ...state,
        availabilityError: null,
        availability: action.payload,
        availabilityLoader: false,
      };
    // Break handling redux
    case "START_BREAK_LOADER":
      return {
        ...state,
        breakLoader: action.payload,
        breakError: null,
      };
    case "BREAK_FETCH_SUCCESS":
      return {
        ...state,
        breakError: null,
        break: action.payload,
        breakLoader: false,
      };
    case "BREAK_ERROR":
      return {
        ...state,
        breakError: action.payload,
        break: [],
        breakLoader: false,
      };
    default:
      return state;
  }
};

export default tutorAvailabilityReducer;
