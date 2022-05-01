const initState = {
  studentReports: [],
  studentReportsError: null,
  studentReportsLoader: true,
};

const StudentReportReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_REPORT_LOADER":
      return {
        ...state,
        studentReportsLoader: action.payload,
        studentReportsError: null,
      };
    case "STUDENT_REPORT_ERROR":
      return {
        ...state,
        studentReportsError: action.payload,
        studentReports: [],
        studentReportsLoader: false,
      };

    case "STUDENT_REPORT_FETCH_SUCCESS":
      return {
        ...state,
        studentReportsError: null,
        studentReports: action.payload,
        studentReportsLoader: false,
      };

    default:
      return state;
  }
};

export default StudentReportReducer;
