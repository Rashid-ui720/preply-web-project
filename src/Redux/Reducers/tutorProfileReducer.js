const initState = {
  tutorProfile: [],
  tutorProfileError: null,
  tutorProfileLoader: true,
};

const TutorProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_PROFILE_LOADER":
      return {
        ...state,
        tutorProfileLoader: action.payload,
        tutorProfileError: null,
      };
    case "TUTOR_PROFILE_ERROR":
      return {
        ...state,
        tutorProfileError: action.payload,
        tutorProfile: {},
        tutorProfileLoader: false,
      };

    case "TUTOR_PROFILE_FETCH_SUCCESS":
      return {
        ...state,
        tutorProfileError: null,
        tutorProfile: action.payload,
        tutorProfileLoader: false,
      };

    default:
      return state;
  }
};

export default TutorProfileReducer;
