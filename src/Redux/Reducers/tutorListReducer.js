const initState = {
  tutorList: [],
  tutorCountiresList: [],
  tutorLanguages: [],
  tutorCourses: [],
  featured_instructors: [],
  tutorListError: null,
  tutorListLoader: true,
};

const TutorListReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_LIST_LOADER":
      return {
        ...state,
        tutorListLoader: action.payload,
        tutorListError: null,
      };
    case "TUTOR_LIST_ERROR":
      return {
        ...state,
        tutorListError: action.payload,
        tutorList: [],
        tutorCountiresList: [],
        tutorLanguages: [],
        tutorCourses: [],
        featured_instructors: [],
        tutorListLoader: false,
      };

    case "TUTOR_LIST_FETCH_SUCCESS":
      return {
        ...state,
        tutorListError: null,
        tutorList: action.payload,
        tutorCountiresList: action.countries,
        tutorLanguages: action.languages,
        tutorCourses: action.courses,
        featured_instructors: action.featured_instructors,
        tutorListLoader: false,
      };

    default:
      return state;
  }
};

export default TutorListReducer;
