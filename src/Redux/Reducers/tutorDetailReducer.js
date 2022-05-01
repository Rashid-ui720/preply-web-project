const initState = {
  tutorDetail: {},
  tutorDetailError: null,
  tutorDetailLoader: true,
};

const TutorDetailReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_DETAIL_LOADER":
      return {
        ...state,
        tutorDetailLoader: action.payload,
        tutorDetailError: null,
      };
    case "TUTOR_DETAIL_ERROR":
      return {
        ...state,
        tutorDetailError: action.payload,
        tutorDetail: {},
        tutorDetailLoader: false,
      };

    case "TUTOR_DETAIL_FETCH_SUCCESS":
      return {
        ...state,
        tutorDetailError: null,
        tutorDetail: action.payload,
        tutorDetailLoader: false,
      };

    default:
      return state;
  }
};

export default TutorDetailReducer;
