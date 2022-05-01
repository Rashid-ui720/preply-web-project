const initState = {
  tutorPayout: {},
  tutorPayoutError: null,
  tutorPayoutLoader: true,
};

const TutorPayoutReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_PAYOUT_LOADER":
      return {
        ...state,
        tutorPayoutLoader: action.payload,
        tutorPayoutError: null,
      };
    case "TUTOR_PAYOUT_ERROR":
      return {
        ...state,
        tutorPayoutError: action.payload,
        tutorPayout: {},
        tutorPayoutLoader: false,
      };

    case "TUTOR_PAYOUT_FETCH_SUCCESS":
      return {
        ...state,
        tutorPayoutError: null,
        tutorPayout: action.payload,
        tutorPayoutLoader: false,
      };

    default:
      return state;
  }
};

export default TutorPayoutReducer;
