const initState = {
  notifications: [],
  notificationsError: null,
  notificationsLoader: true,
};

const NotificationsReducer = (state = initState, action) => {
  switch (action.type) {
    case "START_NOTIFICATION_LOADER":
      return {
        ...state,
        notificationsLoader: action.payload,
        notificationsError: null,
      };
    case "NOTIFICATION_ERROR":
      return {
        ...state,
        notificationsError: action.payload,

        notificationsLoader: false,
        notifications: {},
      };

    case "NOTIFICATION_FETCH_SUCCESS":
      return {
        ...state,
        notificationsError: null,
        notifications: action.payload,
        notificationsLoader: false,
      };

    default:
      return state;
  }
};

export default NotificationsReducer;
