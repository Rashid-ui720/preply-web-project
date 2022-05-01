const initState = {
  studentProfile: [],
  studentProfileError: null,
  studentProfileLoader: true,
};

const StudentProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_PROFILE_LOADER":
      return {
        ...state,
        studentProfileLoader: action.payload,
        studentProfileError: null,
      };
    case "STUDENT_PROFILE_ERROR":
      return {
        ...state,
        studentProfileError: action.payload,
        studentProfile: {},
        studentProfileLoader: false,
      };

    case "STUDENT_PROFILE_FETCH_SUCCESS":
      return {
        ...state,
        studentProfileError: null,
        studentProfile: action.payload,
        studentProfileLoader: false,
      };

    default:
      return state;
  }
};

export default StudentProfileReducer;
