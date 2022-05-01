const initState = {
  studentAvailableTutorList: [],
  studentAvailableTutorListError: null,
  studentAvailableTutorListLoader: true,
};

const StudentAvaiableTutorListReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_AVAILABLE_TUTOR_LOADER":
      return {
        ...state,
        studentAvailableTutorListLoader: action.payload,
        studentAvailableTutorListError: null,
      };
    case "STUDENT_AVAILABLE_TUTOR_ERROR":
      return {
        ...state,
        studentAvailableTutorListError: action.payload,
        studentAvailableTutorList: [],
        studentAvailableTutorListLoader: false,
      };

    case "STUDENT_AVAILABLE_TUTOR_FETCH_SUCCESS":
      return {
        ...state,
        studentAvailableTutorListError: null,
        studentAvailableTutorList: action.payload,
        studentAvailableTutorListLoader: false,
      };

    default:
      return state;
  }
};

export default StudentAvaiableTutorListReducer;
