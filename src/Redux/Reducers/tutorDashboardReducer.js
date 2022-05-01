const initState = {
  tutorDashboardData: {},
  tutorDashboardDataError: null,
  tutorDashboardDataLoader: true,
};

const TutorDashboardDataReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_DASHBOARD_LOADER":
      return {
        ...state,
        tutorDashboardDataLoader: action.payload,
        tutorDashboardDataError: null,
      };
    case "TUTOR_DASHBOARD_ERROR":
      return {
        ...state,
        tutorDashboardDataError: action.payload,
        tutorDashboardData: {},
        tutorDashboardDataLoader: false,
      };

    case "TUTOR_DASHBOARD_FETCH_SUCCESS":
      return {
        ...state,
        tutorDashboardDataError: null,
        tutorDashboardData: action.payload,
        tutorDashboardDataLoader: false,
      };

    default:
      return state;
  }
};

export default TutorDashboardDataReducer;
