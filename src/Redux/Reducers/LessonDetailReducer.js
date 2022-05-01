const initState = {
  lessonDetail: {},
  lessonDetailError: null,
  lessonDetailLoader: true,
};

const LessonDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_LESSON_DETAIL_LOADER":
      return {
        ...state,
        lessonDetailLoader: action.payload,
        lessonDetailError: null,
      };
    case "LESSON_DETAIL_ERROR":
      return {
        ...state,
        lessonDetailError: action.payload,

        lessonDetailLoader: false,
        lessonDetail: {},
      };

    case "LESSON_DETAIL_FETCH_SUCCESS":
      return {
        ...state,
        lessonDetailError: null,
        lessonDetail: action.payload,
        lessonDetailLoader: false,
      };

    default:
      return state;
  }
};

export default LessonDetailReducer;
