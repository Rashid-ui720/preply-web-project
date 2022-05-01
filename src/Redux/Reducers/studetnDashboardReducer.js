const initState = {
  studentDashboard: {},
  studentDashboardError: null,
  studentDashboardLoader: true,
};

const StudentDashboardReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_DASHBOARD_LOADER":
      return {
        ...state,
        studentDashboardLoader: action.payload,
        studentDashboardError: null,
      };
    case "STUDENT_DASHBOARD_ERROR":
      return {
        ...state,
        studentDashboardError: action.payload,
        studentDashboard: {},
        studentDashboardLoader: false,
      };

    case "STUDENT_DASHBOARD_FETCH_SUCCESS":
      return {
        ...state,
        studentDashboardError: null,
        studentDashboard: action.payload,
        studentDashboardLoader: false,
      };

    default:
      return state;
  }
};

export default StudentDashboardReducer;
