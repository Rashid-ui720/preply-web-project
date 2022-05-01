const initState = {
  studentPackagesHistory: [],
  studentPackagesHistoryError: null,
  studentPackagesHistoryLoader: true,
};

const StudentPackagesHistoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_PACKAGES_HISTORY_LOADER":
      return {
        ...state,
        studentPackagesHistoryLoader: action.payload,
        studentPackagesHistoryError: null,
      };
    case "STUDENT_PACKAGES_HISTORY_ERROR":
      return {
        ...state,
        studentPackagesHistoryError: action.payload,
        studentPackagesHistory: [],
        studentPackagesHistoryLoader: false,
      };

    case "STUDENT_PACKAGES_HISTORY_FETCH_SUCCESS":
      return {
        ...state,
        studentPackagesHistoryError: null,
        studentPackagesHistory: action.payload,
        studentPackagesHistoryLoader: false,
      };

    default:
      return state;
  }
};

export default StudentPackagesHistoryReducer;
