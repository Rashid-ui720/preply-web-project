const initState = {
  tutorActiveStudentDetail: {},
  tutorActiveStudentDetailError: null,
  tutorActiveStudentDetailLoader: true,
};

const TutorActiveStudentDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_ACTIVE_STUDENT_DETAIL_LOADER":
      return {
        ...state,
        tutorActiveStudentDetailLoader: action.payload,
        tutorActiveStudentDetailError: null,
      };
    case "TUTOR_ACTIVE_STUDENT_DETAIL_ERROR":
      return {
        ...state,
        tutorActiveStudentDetailError: action.payload,
        tutorActiveStudentDetail: [],
        tutorActiveStudentDetailLoader: false,
      };

    case "TUTOR_ACTIVE_STUDENT_DETAIL_FETCH_SUCCESS":
      return {
        ...state,
        tutorActiveStudentDetailError: null,
        tutorActiveStudentDetail: action.payload,
        tutorActiveStudentDetailLoader: false,
      };

    default:
      return state;
  }
};

export default TutorActiveStudentDetailReducer;
