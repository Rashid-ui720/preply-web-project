const initState = {
  AuthData: localStorage.getItem("authData"),
  studetnWizard: localStorage.getItem("Studentwizard"),
  parentChild : localStorage.getItem("parentChild"),
  AuthError: null,
  FreeAppoinment: 0,
};

const AuthReducer = (state = initState, action) => {
  switch (action.type) {
    case "AUTH_ERROR":
      return {
        ...state,
        AuthError: action.payload,
        AuthData: null,
      };
    case "USER_LOGGED_IN":
      return {
        ...state,
        AuthData: action.payload,
        AuthError: null,
      };
    case "USER_WIZARD":
      return {
        ...state,
        studetnWizard: action.payload,
        AuthError: null,
      };

    case "USER_LOOGED_OUT":
      return {
        ...state,
        AuthData: null,
        AuthError: null,
      };
    case "PARENT_CHILD":
      return {
        ...state,
        parentChild: action.payload,
        AuthError: null,
      };
    case "FREE_APPOINTMENT":
      return {
        ...state,
        FreeAppoinment: action.payload,
        AuthError: null,
      };  
    default:
      return state;
  }
};

export default AuthReducer;
