const initState = {
  tutorLessons: [],
  tutorLessonsError: null,
  tutorLessonsLoader: true,
};

const TutorLessonsReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_LESSONS_LOADER":
      return {
        ...state,
        tutorLessonsLoader: action.payload,
        tutorLessonsError: null,
      };
    case "TUTOR_LESSONS_ERROR":
      return {
        ...state,
        tutorLessonsError: action.payload,
        tutorLessons: [],
        tutorLessonsLoader: false,
      };

    case "TUTOR_LESSONS_FETCH_SUCCESS":
      return {
        ...state,
        tutorLessonsError: null,
        tutorLessons: action.payload,
        tutorLessonsLoader: false,
      };

    default:
      return state;
  }
};

export default TutorLessonsReducer;
