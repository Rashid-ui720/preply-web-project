const initState = {
  payload: null,
  packagesPayload: null,
};

const CheckOutReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_PAYLOAD_DATA":
      return {
        ...state,
        payload: action.payload,
      };
    case "REMOVE_PAYLOAD_DATA":
      return {
        ...state,
        payload: null,
      };
    case "SET_PACKAGES_PAYLOAD_DATA":
      return {
        ...state,
        packagesPayload: action.payload,
      };
    case "REMOVE_PACKAGES_PAYLOAD_DATA":
      return {
        ...state,
        packagesPayload: null,
      };

    default:
      return state;
  }
};

export default CheckOutReducer;
