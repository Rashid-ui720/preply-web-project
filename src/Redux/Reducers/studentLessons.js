const initState = {
  studentLessons: [],
  studentLessonsError: null,
  studentLessonsLoader: true,
};

const StudentLessonsReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_LESSONS_LOADER":
      return {
        ...state,
        studentLessonsLoader: action.payload,
        studentLessonsError: null,
      };
    case "STUDENT_LESSONS_ERROR":
      return {
        ...state,
        studentLessonsError: action.payload,
        studentLessons: [],
        studentLessonsLoader: false,
      };

    case "STUDENT_LESSONS_FETCH_SUCCESS":
      return {
        ...state,
        studentLessonsError: null,
        studentLessons: action.payload,
        studentLessonsLoader: false,
      };

    default:
      return state;
  }
};

export default StudentLessonsReducer;
