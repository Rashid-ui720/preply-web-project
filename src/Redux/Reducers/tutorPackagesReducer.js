const initState = {
  tutorPackages: [],
  tutorPackagesError: null,
  tutorPackagesLoader: true,
};

const TutorPackagesReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_PACKAGES_LOADER":
      return {
        ...state,
        tutorPackagesLoader: action.payload,
        tutorPackagesError: null,
      };
    case "TUTOR_PACKAGES_ERROR":
      return {
        ...state,
        tutorPackagesError: action.payload,
        tutorPackages: [],
        tutorPackagesLoader: false,
      };

    case "TUTOR_PACKAGES_FETCH_SUCCESS":
      return {
        ...state,
        tutorPackagesError: null,
        tutorPackages: action.payload,
        tutorPackagesLoader: false,
      };

    default:
      return state;
  }
};

export default TutorPackagesReducer;
