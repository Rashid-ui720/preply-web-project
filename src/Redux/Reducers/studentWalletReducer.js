const initState = {
  studentWalletDetail: {},
  studentWalletDetailError: null,
  studentWalletDetailLoader: true,
};

const StudentWalletReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_STUDENT_WALLET_LOADER":
      return {
        ...state,
        studentWalletDetailLoader: action.payload,
        studentWalletDetailError: null,
      };
    case "STUDENT_WALLET_ERROR":
      return {
        ...state,
        studentWalletDetailError: action.payload,
        studentWalletDetail: {},
        studentWalletDetailLoader: false,
      };

    case "STUDENT_WALLET_FETCH_SUCCESS":
      return {
        ...state,
        studentWalletDetailError: null,
        studentWalletDetail: action.payload,
        studentWalletDetailLoader: false,
      };

    default:
      return state;
  }
};

export default StudentWalletReducer;
