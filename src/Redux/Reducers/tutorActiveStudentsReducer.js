const initState = {
  tutorActiveStudents: [],
  tutorActiveStudentsError: null,
  tutorActiveStudentsLoader: true,
};

const TutorActiveStudentReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_ACTIVE_STUDENTS_LOADER":
      return {
        ...state,
        tutorActiveStudentsLoader: action.payload,
        tutorActiveStudentsError: null,
      };
    case "TUTOR_ACTIVE_STUDENTS_ERROR":
      return {
        ...state,
        tutorActiveStudentsError: action.payload,
        tutorActiveStudents: [],
        tutorActiveStudentsLoader: false,
      };

    case "TUTOR_ACTIVE_STUDENTS_FETCH_SUCCESS":
      return {
        ...state,
        tutorActiveStudentsError: null,
        tutorActiveStudents: action.payload,
        tutorActiveStudentsLoader: false,
      };

    default:
      return state;
  }
};

export default TutorActiveStudentReducer;
