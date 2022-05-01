const initState = {
  tutorPaymentHistory: [],
  tutorPaymentHistoryError: null,
  tutorPaymentHistoryLoader: true,
};

const TutorPaymentHistoryReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_TUTOR_PAYMENT_HISTORY_LOADER":
      return {
        ...state,
        tutorPaymentHistoryLoader: action.payload,
        tutorPaymentHistoryError: null,
      };
    case "TUTOR_PAYMENT_HISTORY_ERROR":
      return {
        ...state,
        tutorPaymentHistoryError: action.payload,
        tutorPaymentHistory: [],
        tutorPaymentHistoryLoader: false,
      };

    case "TUTOR_PAYMENT_HISTORY_FETCH_SUCCESS":
      return {
        ...state,
        tutorPaymentHistoryError: null,
        tutorPaymentHistory: action.payload,
        tutorPaymentHistoryLoader: false,
      };

    default:
      return state;
  }
};

export default TutorPaymentHistoryReducer;
